import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, Gauge, Layers3 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import { getApprovedArcgisMapConfig } from "@/lib/portal/arcgis";
import { getCourses, getFindingsForReport, getRecommendationsForReport, getReportsForClub } from "@/lib/portal/data";
import type { Finding, Report } from "@/lib/portal/types";

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

function priorityLabel(findings: Finding[]) {
  if (findings.some((finding) => finding.severity === "critical")) return "Critical";
  if (findings.some((finding) => finding.severity === "high")) return "High";
  if (findings.some((finding) => finding.severity === "moderate")) return "Medium";
  return "Stable";
}

function statusLabel(report: Report, isBasaltStaff: boolean) {
  if (isBasaltStaff) return titleCase(report.status);
  return report.status === "published" ? "Published" : "Internal";
}

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;
  const { supabase, club, isBasaltStaff } = await requireClubMembership(clubSlug);
  const reports = await getReportsForClub({
    supabase,
    clubId: club.id,
    includeInternal: isBasaltStaff,
  });
  const courses = await getCourses(supabase, club.id);

  const reportCards = await Promise.all(
    reports.map(async (report) => {
      const reportCourse = courses.find((course) => course.id === report.courseId) ?? null;
      const [findings, recommendations, mapResult] = await Promise.all([
        getFindingsForReport(supabase, club.id, report.id),
        getRecommendationsForReport(supabase, club.id, report.id),
        getApprovedArcgisMapConfig({ supabase, clubId: club.id, clubSlug, course: reportCourse, latestReport: report }),
      ]);
      const sortedFindings = [...findings].sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
      const openRecommendations = recommendations.filter((recommendation) => recommendation.status !== "completed");
      return { report, findings: sortedFindings, openRecommendations, hasApprovedMap: Boolean(mapResult.config) };
    }),
  );

  const hasAnyApprovedMap = reportCards.some((card) => card.hasApprovedMap);

  return (
    <PortalShell club={club} active="Reports" showMapNavigation={hasAnyApprovedMap}>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#51745f]">Reports</p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-tight tracking-normal text-[#102019]">
              Course intelligence library.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#65736a]">
              Published reports, survey history and committee-ready outputs in one place.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#d9dfd7] bg-white px-4 py-3 text-sm text-[#65736a] shadow-sm">
            {reports.length} {reports.length === 1 ? "report" : "reports"} visible
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {reportCards.map(({ report, findings, openRecommendations, hasApprovedMap }, index) => {
            const priority = priorityLabel(findings);
            return (
              <article
                key={report.id}
                className="group overflow-hidden rounded-[12px] border border-[#d9dfd7] bg-white shadow-[0_16px_60px_rgba(45,62,53,0.08)] transition hover:border-[#b9c8be]"
              >
                <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
                  <div className="report-map report-golf min-h-[260px] rounded-none border-0 lg:min-h-full">
                    <span className="report-grid" />
                    <span className="report-route report-route-one" />
                    <span className="report-zone report-zone-one" />
                    <span className="report-marker report-marker-one" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102019]/78 via-[#102019]/22 to-white/5" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/35 bg-white/82 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#334238] shadow-sm backdrop-blur-md">
                        Report {index + 1}
                      </span>
                      <span className="rounded-full border border-[#d9dfd7] bg-white/88 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#1f563e] shadow-sm backdrop-blur-md">
                        {priority}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 lg:p-7">
                    <div className="flex flex-wrap gap-2 text-xs text-[#65736a]">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dfd7] bg-[#fbfaf5] px-3 py-1">
                        <CalendarDays className="size-3.5" />
                        {report.surveyDate || "Pending"}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dfd7] bg-[#fbfaf5] px-3 py-1">
                        <Layers3 className="size-3.5" />
                        {titleCase(report.reportType)}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dfd7] bg-[#fbfaf5] px-3 py-1">
                        <FileText className="size-3.5" />
                        {statusLabel(report, isBasaltStaff)}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-normal text-[#102019]">{report.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#65736a]">{report.summary}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Key findings", String(findings.length)],
                        ["Priority level", priority],
                        ["Open actions", String(openRecommendations.length)],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-[10px] border border-[#e1e5df] bg-[#fbfaf5] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#7a877f]">{label}</p>
                          <p className="mt-2 text-xl font-semibold text-[#14211a]">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <div className="inline-flex items-center gap-2 text-sm text-[#65736a]">
                        <Gauge className="size-4 text-[#51745f]" />
                        {findings[0]?.title ?? "No priority findings recorded"}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {hasApprovedMap ? (
                          <Link
                            href={`/clubs/${club.slug}/map`}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#d9dfd7] bg-white px-5 text-sm font-semibold text-[#22342a] shadow-sm transition hover:border-[#b9c8be]"
                          >
                            View map <Layers3 className="size-4" />
                          </Link>
                        ) : null}
                        <Link
                          href={`/clubs/${club.slug}/reports/${report.slug}`}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#153d2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f563e]"
                        >
                          Open report <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          {!reportCards.length ? (
            <div className="rounded-[12px] border border-[#d9dfd7] bg-white p-6 text-sm text-[#65736a] shadow-sm">
              No reports are currently visible for this workspace.
            </div>
          ) : null}
        </div>
      </section>
    </PortalShell>
  );
}
