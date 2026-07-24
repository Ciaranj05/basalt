import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, MapPinned, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import { getApprovedArcgisMapConfig } from "@/lib/portal/arcgis";
import {
  getCourseAreas,
  getFindingsForReport,
  getLatestPublishedReport,
  getPrimaryCourse,
  getRecommendationsForReport,
  getReportMedia,
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

function conditionFor(findings: Finding[]) {
  if (findings.some((finding) => finding.severity === "critical")) return "Intervention required";
  if (findings.some((finding) => finding.severity === "high")) return "Needs attention";
  if (findings.some((finding) => finding.severity === "moderate")) return "Monitor";
  return "Stable";
}

export default async function CourseAreasPage({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;
  const { supabase, club } = await requireClubMembership(clubSlug);
  const [courseAreas, latestReport, course] = await Promise.all([
    getCourseAreas(supabase, club.id),
    getLatestPublishedReport(supabase, club.id),
    getPrimaryCourse(supabase, club.id),
  ]);
  const { config: approvedMapConfig } = await getApprovedArcgisMapConfig({
    supabase,
    clubId: club.id,
    clubSlug,
    course,
    latestReport,
  });

  const [findings, recommendations, media] = latestReport
    ? await Promise.all([
        getFindingsForReport(supabase, club.id, latestReport.id),
        getRecommendationsForReport(supabase, club.id, latestReport.id),
        getReportMedia(supabase, club.id, latestReport.id),
      ])
    : [[], [], []];

  return (
    <PortalShell club={club} active="Course Areas" showMapNavigation={Boolean(approvedMapConfig)}>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#51745f]">Course Areas</p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-tight tracking-normal text-[#102019]">
              Course asset register.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#65736a]">
              A maintained record of course areas, condition signals and linked report evidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-[10px] border border-[#d9dfd7] bg-white px-4 py-3 text-sm text-[#65736a] shadow-sm">
              Latest survey: {latestReport?.surveyDate || "Pending"}
            </div>
            {approvedMapConfig ? (
              <Link
                href={`/clubs/${club.slug}/map`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#153d2b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f563e]"
              >
                View mapped areas <MapPinned className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courseAreas.map((area) => {
            const areaFindings = findings
              .filter((finding) => finding.courseAreaId === area.id)
              .sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
            const areaRecommendations = recommendations.filter(
              (recommendation) => recommendation.courseAreaId === area.id && recommendation.status !== "completed",
            );
            const areaMedia = media.filter((item) => item.courseAreaId === area.id);
            const condition = conditionFor(areaFindings);

            return (
              <Link
                key={area.id}
                href={`/clubs/${club.slug}/course-areas/${area.id}`}
                className="group rounded-[12px] border border-[#d9dfd7] bg-white p-5 shadow-[0_16px_60px_rgba(45,62,53,0.08)] transition hover:border-[#b9c8be]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#7a877f]">
                      {titleCase(area.areaType)} · {area.referenceNumber}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-normal text-[#102019]">{area.name}</h2>
                  </div>
                  <span className="rounded-full border border-[#c7d5ca] bg-[#eef5ef] px-3 py-1 text-xs font-semibold text-[#1f563e]">
                    {condition}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#65736a]">{area.summary}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    [<ShieldCheck key="condition" className="size-4 text-[#51745f]" />, "Condition", condition],
                    [<MapPinned key="findings" className="size-4 text-[#51745f]" />, "Open findings", String(areaFindings.length)],
                    [<CheckCircle2 key="recommendations" className="size-4 text-[#51745f]" />, "Recommendations", String(areaRecommendations.length)],
                    [<Camera key="photos" className="size-4 text-[#51745f]" />, "Photos", String(areaMedia.length)],
                  ].map(([icon, label, value]) => (
                    <div key={String(label)} className="rounded-[8px] border border-[#e1e5df] bg-[#fbfaf5] p-3">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#7a877f]">
                        {icon}
                        {label}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#14211a]">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e1e5df] pt-4 text-sm">
                  <span className="text-[#65736a]">Latest survey {latestReport?.surveyDate || "Pending"}</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-[#1f563e]">
                    Open area <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
          {!courseAreas.length ? (
            <div className="rounded-[12px] border border-[#d9dfd7] bg-white p-6 text-sm text-[#65736a] shadow-sm">
              Course areas will appear once the asset register is prepared.
            </div>
          ) : null}
        </div>
      </section>
    </PortalShell>
  );
}
