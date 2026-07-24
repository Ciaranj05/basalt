import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, FileText, MapPinned, Target } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import { getApprovedArcgisMapConfig } from "@/lib/portal/arcgis";
import {
  getCourseAreas,
  getFindingsForReport,
  getLatestPublishedReport,
  getPrimaryCourse,
  getRecommendationsForReport,
  getReportsForClub,
} from "@/lib/portal/data";
import type { Finding } from "@/lib/portal/types";

export const dynamic = "force-dynamic";

const severityOrder: Record<Finding["severity"], number> = {
  critical: 5,
  high: 4,
  moderate: 3,
  low: 2,
  information: 1,
};

function titleCase(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function ClubOverviewPage({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;
  const { supabase, club, isBasaltStaff } = await requireClubMembership(clubSlug);

  const [course, latestReport, courseAreas, reports] = await Promise.all([
    getPrimaryCourse(supabase, club.id),
    getLatestPublishedReport(supabase, club.id),
    getCourseAreas(supabase, club.id),
    getReportsForClub({ supabase, clubId: club.id, includeInternal: isBasaltStaff }),
  ]);

  const [findings, recommendations] = await Promise.all([
    latestReport ? getFindingsForReport(supabase, club.id, latestReport.id) : Promise.resolve([]),
    latestReport ? getRecommendationsForReport(supabase, club.id, latestReport.id) : Promise.resolve([]),
  ]);

  const { config: approvedMapConfig } = await getApprovedArcgisMapConfig({
    supabase,
    clubId: club.id,
    clubSlug,
    course,
    latestReport,
  });

  const sortedFindings = [...findings].sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
  const highRecommendations = recommendations.filter(
    (recommendation) => recommendation.status !== "completed" && recommendation.priority.toLowerCase().includes("high"),
  );
  const openRecommendations = recommendations.filter((recommendation) => recommendation.status !== "completed");
  const areaById = new Map(courseAreas.map((area) => [area.id, area]));
  const attentionAreaIds = new Set([
    ...sortedFindings.slice(0, 4).map((finding) => finding.courseAreaId).filter(Boolean),
    ...highRecommendations.slice(0, 4).map((recommendation) => recommendation.courseAreaId).filter(Boolean),
  ]);
  const attentionAreas = courseAreas
    .filter((area) => attentionAreaIds.has(area.id))
    .slice(0, 4);
  const snapshotItems = [
    latestReport ? ["Latest survey", latestReport.surveyDate] : null,
    courseAreas.length ? ["Course areas", String(courseAreas.length)] : null,
    findings.length ? ["Survey findings", String(findings.length)] : null,
    openRecommendations.length ? ["Open recommendations", String(openRecommendations.length)] : null,
    reports.length ? ["Reports", String(reports.length)] : null,
  ].filter(Boolean) as Array<[string, string]>;

  return (
    <PortalShell club={club} active="Overview" showMapNavigation={Boolean(approvedMapConfig)}>
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[12px] border border-[#d9dfd7] bg-white shadow-[0_24px_80px_rgba(45,62,53,0.12)]">
          <div className="grid min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#51745f]">Course intelligence</p>
                <h1 className="mt-4 text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[0.96] tracking-normal text-[#102019]">
                  {club.name}
                </h1>
                {latestReport ? (
                  <div className="mt-6">
                    <p className="text-lg font-semibold text-[#22342a]">{latestReport.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#65736a]">
                      Completed {latestReport.surveyDate || "after the latest survey"}
                    </p>
                  </div>
                ) : (
                  <p className="mt-6 text-sm leading-6 text-[#65736a]">
                    Published course intelligence will appear here once the first report is ready.
                  </p>
                )}
                <div className="mt-7 flex flex-wrap gap-3">
                  {approvedMapConfig ? (
                    <Link
                      href={`/clubs/${club.slug}/map`}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#153d2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f563e]"
                    >
                      Open Interactive Map <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex h-12 items-center justify-center rounded-full border border-[#d9dfd7] bg-[#f7f5ee] px-5 text-sm font-semibold text-[#65736a]">
                      Interactive map coming soon
                    </span>
                  )}
                  {latestReport ? (
                    <Link
                      href={`/clubs/${club.slug}/reports/${latestReport.slug}`}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d9dfd7] bg-white px-5 text-sm font-semibold text-[#22342a] shadow-sm transition hover:border-[#b9c8be]"
                    >
                      View Latest Report
                    </Link>
                  ) : null}
                </div>
              </div>

              {snapshotItems.length ? (
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {snapshotItems.slice(0, 4).map(([label, value]) => (
                    <div key={label} className="rounded-[10px] border border-[#d9dfd7] bg-[#fbfaf5] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#7a877f]">{label}</p>
                      <p className="mt-2 text-2xl font-semibold text-[#14211a]">{value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-[#dfe8dc]">
              <div className="report-map report-golf absolute inset-0 min-h-0 rounded-none border-0">
                <span className="report-grid" />
                <span className="report-route report-route-one" />
                <span className="report-route report-route-two" />
                <span className="report-zone report-zone-one" />
                <span className="report-zone report-zone-two" />
                <span className="report-marker report-marker-one" />
                <span className="report-marker report-marker-two" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#102019]/58 via-transparent to-white/10" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[10px] border border-white/45 bg-white/86 p-4 shadow-xl backdrop-blur-md sm:left-auto sm:w-[360px]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#51745f]">Latest picture</p>
                <h2 className="mt-2 text-xl font-semibold text-[#102019]">What needs attention, mapped to the course.</h2>
                <p className="mt-2 text-sm leading-6 text-[#5d6b62]">
                  Open the interactive map to explore survey evidence by location.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[12px] border border-[#d9dfd7] bg-white shadow-[0_16px_60px_rgba(45,62,53,0.08)]">
            {approvedMapConfig ? (
              <Link href={`/clubs/${club.slug}/map`} className="group block">
                <div className="report-map report-golf min-h-[360px] rounded-none border-0">
                  <span className="report-grid" />
                  <span className="report-route report-route-one" />
                  <span className="report-route report-route-two" />
                  <span className="report-zone report-zone-one" />
                  <span className="report-zone report-zone-two" />
                  <span className="report-marker report-marker-one" />
                  <span className="report-marker report-marker-two" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102019]/72 via-[#102019]/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#dff4e8]">Interactive Course Map</p>
                      <h2 className="mt-2 text-3xl font-semibold text-white">Explore the evidence on the course.</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/78">
                        Explore survey evidence, findings, recommendations and mapped course information.
                      </p>
                    </div>
                    <span className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#102019] shadow-sm transition group-hover:bg-[#e8f3ec]">
                      Open Map <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-[#51745f]">Interactive Map</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#102019]">Interactive map coming soon</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#65736a]">
                  Your course map is being prepared and will appear here once it is ready.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/clubs/${club.slug}/course-areas`} className="inline-flex h-11 items-center rounded-full border border-[#d9dfd7] bg-white px-5 text-sm font-semibold text-[#22342a] shadow-sm">
                    View Course Areas
                  </Link>
                  <Link href={`/clubs/${club.slug}/reports`} className="inline-flex h-11 items-center rounded-full border border-[#d9dfd7] bg-white px-5 text-sm font-semibold text-[#22342a] shadow-sm">
                    View Reports
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6">
            <section className="rounded-[12px] border border-[#d9dfd7] bg-white p-5 shadow-[0_16px_60px_rgba(45,62,53,0.08)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
                <Target className="size-4 text-[#51745f]" />
                Findings requiring attention
              </div>
              <div className="mt-4 grid gap-3">
                {sortedFindings.slice(0, 3).map((finding) => {
                  const area = finding.courseAreaId ? areaById.get(finding.courseAreaId) : null;
                  return (
                    <Link
                      key={finding.id}
                      href={area ? `/clubs/${club.slug}/course-areas/${area.id}` : `/clubs/${club.slug}/reports/${latestReport?.slug}`}
                      className="rounded-[10px] border border-[#e1e5df] bg-[#fbfaf5] p-4 transition hover:border-[#b9c8be] hover:bg-white"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-[#7a877f]">{titleCase(finding.severity)}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#14211a]">{finding.title}</p>
                      {area ? <p className="mt-1 text-xs text-[#65736a]">{area.name}</p> : null}
                    </Link>
                  );
                })}
                {!sortedFindings.length ? <p className="text-sm text-[#65736a]">No survey findings are visible in the latest report.</p> : null}
              </div>
            </section>

            <section className="rounded-[12px] border border-[#d9dfd7] bg-white p-5 shadow-[0_16px_60px_rgba(45,62,53,0.08)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
                <CheckCircle2 className="size-4 text-[#51745f]" />
                Recommendations
              </div>
              <div className="mt-4 grid gap-3">
                {(highRecommendations.length ? highRecommendations : openRecommendations).slice(0, 3).map((recommendation) => {
                  const area = recommendation.courseAreaId ? areaById.get(recommendation.courseAreaId) : null;
                  return (
                    <Link
                      key={recommendation.id}
                      href={area ? `/clubs/${club.slug}/course-areas/${area.id}` : `/clubs/${club.slug}/reports/${latestReport?.slug}`}
                      className="rounded-[10px] border border-[#e1e5df] bg-[#fbfaf5] p-4 transition hover:border-[#b9c8be] hover:bg-white"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-[#7a877f]">
                        {titleCase(recommendation.priority)} · {recommendation.recommendedTimeframe}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#14211a]">{recommendation.title}</p>
                      {area ? <p className="mt-1 text-xs text-[#65736a]">{area.name}</p> : null}
                    </Link>
                  );
                })}
                {!openRecommendations.length ? <p className="text-sm text-[#65736a]">No open recommendations are visible in the latest report.</p> : null}
              </div>
            </section>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-[12px] border border-[#d9dfd7] bg-white p-5 shadow-[0_16px_60px_rgba(45,62,53,0.08)]">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
              <MapPinned className="size-4 text-[#51745f]" />
              Course Areas
            </div>
            <div className="mt-4 grid gap-3">
              {(attentionAreas.length ? attentionAreas : courseAreas.slice(0, 3)).map((area) => (
                <Link
                  key={area.id}
                  href={`/clubs/${club.slug}/course-areas/${area.id}`}
                  className="rounded-[10px] border border-[#e1e5df] bg-[#fbfaf5] p-4 transition hover:border-[#b9c8be] hover:bg-white"
                >
                  <p className="text-sm font-semibold text-[#14211a]">{area.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[#65736a]">{titleCase(area.areaType)} · {area.referenceNumber}</p>
                </Link>
              ))}
            </div>
            <Link href={`/clubs/${club.slug}/course-areas`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1f563e]">
              View All Course Areas <ArrowRight className="size-4" />
            </Link>
          </section>

          <section className="rounded-[12px] border border-[#d9dfd7] bg-white p-5 shadow-[0_16px_60px_rgba(45,62,53,0.08)] lg:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
              <FileText className="size-4 text-[#51745f]" />
              Latest reports
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {reports.slice(0, 4).map((report) => (
                <Link key={report.id} href={`/clubs/${club.slug}/reports/${report.slug}`} className="rounded-[10px] border border-[#e1e5df] bg-[#fbfaf5] p-4 transition hover:border-[#b9c8be] hover:bg-white">
                  <div className="flex flex-wrap gap-2 text-xs text-[#7a877f]">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" />{report.surveyDate || "Pending"}</span>
                    <span>{titleCase(report.reportType)}</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#14211a]">{report.title}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f563e]">
                    View Report <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
              {!reports.length ? <p className="text-sm text-[#65736a]">Reports will appear here once they are published.</p> : null}
            </div>
          </section>
        </section>
      </section>
    </PortalShell>
  );
}
