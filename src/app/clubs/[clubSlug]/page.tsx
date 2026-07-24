import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, FileText, MapPinned, Target, TrendingUp } from "lucide-react";
import { CourseMap } from "@/components/portal/CourseMap";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import {
  getCourseAreas,
  getFindingsForReport,
  getLatestPublishedReport,
  getMapLayers,
  getPrimaryCourse,
  getRecommendationsForReport,
  getReportsForClub,
} from "@/lib/portal/data";
import type { Finding, Recommendation } from "@/lib/portal/types";

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

function nextSurveyDate(surveyDate?: string) {
  if (!surveyDate) return "To be scheduled";
  const date = new Date(`${surveyDate}T00:00:00`);
  date.setFullYear(date.getFullYear() + 1);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function highestPriority(findings: Finding[], recommendations: Recommendation[]) {
  if (findings.some((finding) => finding.severity === "critical")) return "Critical";
  if (findings.some((finding) => finding.severity === "high")) return "High";
  if (recommendations.some((recommendation) => recommendation.priority.toLowerCase().includes("high"))) return "High";
  if (findings.some((finding) => finding.severity === "moderate")) return "Medium";
  return "Stable";
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

  const [mapLayers, findings, recommendations] = await Promise.all([
    course ? getMapLayers(supabase, club.id, course.id, latestReport?.id) : Promise.resolve([]),
    latestReport ? getFindingsForReport(supabase, club.id, latestReport.id) : Promise.resolve([]),
    latestReport ? getRecommendationsForReport(supabase, club.id, latestReport.id) : Promise.resolve([]),
  ]);

  const sortedFindings = [...findings].sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
  const criticalFindings = sortedFindings.filter((finding) => finding.severity === "critical");
  const highRecommendations = recommendations.filter(
    (recommendation) => recommendation.status !== "completed" && recommendation.priority.toLowerCase().includes("high"),
  );
  const openRecommendations = recommendations.filter((recommendation) => recommendation.status !== "completed");
  const attentionAreaIds = new Set([
    ...sortedFindings.slice(0, 4).map((finding) => finding.courseAreaId).filter(Boolean),
    ...highRecommendations.slice(0, 4).map((recommendation) => recommendation.courseAreaId).filter(Boolean),
  ]);
  const attentionAreas = courseAreas
    .filter((area) => attentionAreaIds.has(area.id))
    .slice(0, 4);
  const priorityLevel = highestPriority(findings, recommendations);

  return (
    <PortalShell club={club} active="Overview">
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(360px,2fr)] xl:items-stretch">
          <section data-testid="overview-briefing-panel" className="min-w-0 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">Today</p>
            <h1
              data-testid="overview-heading"
              className="mt-3 max-w-4xl text-[clamp(2.25rem,3vw,3.25rem)] font-semibold leading-[1.06] tracking-normal text-white"
            >
              What {club.name} needs to know now.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
              A concise view of the latest course intelligence, priority work and survey record.
            </p>
            <div data-testid="overview-metrics-grid" className="mt-7 grid min-w-0 gap-3 sm:grid-cols-2 min-[1180px]:grid-cols-4">
              {[
                ["Priority level", priorityLevel],
                ["Critical findings", String(criticalFindings.length)],
                ["Open recommendations", String(openRecommendations.length)],
                ["Last survey", latestReport?.surveyDate || "Pending"],
              ].map(([label, value]) => (
                <div key={label} data-testid={`overview-metric-${label.toLowerCase().replaceAll(" ", "-")}`} className="min-w-0 rounded-[8px] border border-white/10 bg-black/18 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/38">{label}</p>
                  <p
                    data-testid={label === "Last survey" ? "overview-last-survey-value" : undefined}
                    className={`mt-3 text-[clamp(1.35rem,1.6vw,1.5rem)] font-semibold leading-tight text-white ${label === "Last survey" ? "whitespace-nowrap" : ""}`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="min-w-0 rounded-[8px] border border-[#a6d8bd]/18 bg-[#a6d8bd]/8 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="size-4 text-[#a6d8bd]" />
              Latest report
            </div>
            {latestReport ? (
              <>
                <h2 className="mt-4 text-2xl font-semibold tracking-normal text-white">{latestReport.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">{latestReport.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/48">
                  <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1">{latestReport.surveyDate}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">{titleCase(latestReport.reportType)}</span>
                  <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1">Version {latestReport.version}</span>
                </div>
                <Link
                  href={`/clubs/${club.slug}/reports/${latestReport.slug}`}
                  className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
                >
                  Open latest report <ArrowRight className="size-4" />
                </Link>
              </>
            ) : (
              <p className="mt-4 text-sm leading-6 text-white/58">No published report is available yet.</p>
            )}
          </section>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <CourseMap areas={courseAreas} layers={mapLayers} />
          <div className="grid gap-5">
            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Target className="size-4 text-[#a6d8bd]" />
                Priority work
              </div>
              <div className="mt-4 grid gap-3">
                {(sortedFindings.length ? sortedFindings.slice(0, 3) : []).map((finding) => (
                  <div key={finding.id} className="rounded-[6px] border border-white/10 bg-black/18 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/38">{titleCase(finding.severity)}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white">{finding.title}</p>
                  </div>
                ))}
                {!sortedFindings.length ? <p className="text-sm text-white/50">No priority findings are visible in the latest report.</p> : null}
              </div>
            </section>

            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <CheckCircle2 className="size-4 text-[#a6d8bd]" />
                High-priority recommendations
              </div>
              <div className="mt-4 grid gap-3">
                {(highRecommendations.length ? highRecommendations : openRecommendations).slice(0, 3).map((recommendation) => (
                  <div key={recommendation.id} className="rounded-[6px] border border-white/10 bg-black/18 p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                      {titleCase(recommendation.priority)} · {recommendation.recommendedTimeframe}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white">{recommendation.title}</p>
                  </div>
                ))}
                {!openRecommendations.length ? <p className="text-sm text-white/50">No open recommendations are visible in the latest report.</p> : null}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <MapPinned className="size-4 text-[#a6d8bd]" />
              Areas requiring attention
            </div>
            <div className="mt-4 grid gap-3">
              {(attentionAreas.length ? attentionAreas : courseAreas.slice(0, 3)).map((area) => (
                <Link
                  key={area.id}
                  href={`/clubs/${club.slug}/course-areas/${area.id}`}
                  className="rounded-[6px] border border-white/10 bg-black/18 p-3 transition hover:bg-white/[0.06]"
                >
                  <p className="text-sm font-semibold text-white">{area.name}</p>
                  <p className="mt-1 text-xs leading-5 text-white/46">{titleCase(area.areaType)} · {area.referenceNumber}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarDays className="size-4 text-[#a6d8bd]" />
              Survey history
            </div>
            <div className="mt-4 grid gap-3">
              {reports.slice(0, 3).map((report) => (
                <Link key={report.id} href={`/clubs/${club.slug}/reports/${report.slug}`} className="rounded-[6px] border border-white/10 bg-black/18 p-3 transition hover:bg-white/[0.06]">
                  <p className="text-sm font-semibold text-white">{report.surveyDate || "Pending"}</p>
                  <p className="mt-1 text-xs leading-5 text-white/46">{report.title}</p>
                </Link>
              ))}
              {!reports.length ? <p className="text-sm text-white/50">Survey history will appear when reports are published.</p> : null}
            </div>
          </section>

          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <TrendingUp className="size-4 text-[#a6d8bd]" />
              Next recommended survey
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-normal text-white">
              {nextSurveyDate(latestReport?.surveyDate)}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/52">
              Annual monitoring keeps committee decisions tied to a consistent course record.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/clubs/${club.slug}/reports`} className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white">
                View reports
              </Link>
              <Link href={`/clubs/${club.slug}/course-areas`} className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white">
                View assets
              </Link>
            </div>
          </section>
        </div>
      </section>
    </PortalShell>
  );
}
