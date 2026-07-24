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
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">Course Areas</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Course asset register.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
              A maintained record of course areas, condition signals and linked report evidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/56">
              Latest survey: {latestReport?.surveyDate || "Pending"}
            </div>
            {approvedMapConfig ? (
              <Link
                href={`/clubs/${club.slug}/map`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white"
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
                className="group rounded-[8px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#a6d8bd]/28 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                      {titleCase(area.areaType)} · {area.referenceNumber}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">{area.name}</h2>
                  </div>
                  <span className="rounded-full border border-[#a6d8bd]/20 bg-[#a6d8bd]/10 px-3 py-1 text-xs font-semibold text-[#dff4e8]">
                    {condition}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/56">{area.summary}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    [<ShieldCheck key="condition" className="size-4 text-[#a6d8bd]" />, "Condition", condition],
                    [<MapPinned key="findings" className="size-4 text-[#a6d8bd]" />, "Open findings", String(areaFindings.length)],
                    [<CheckCircle2 key="recommendations" className="size-4 text-[#a6d8bd]" />, "Recommendations", String(areaRecommendations.length)],
                    [<Camera key="photos" className="size-4 text-[#a6d8bd]" />, "Photos", String(areaMedia.length)],
                  ].map(([icon, label, value]) => (
                    <div key={String(label)} className="rounded-[6px] border border-white/10 bg-black/18 p-3">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/38">
                        {icon}
                        {label}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
                  <span className="text-white/42">Latest survey {latestReport?.surveyDate || "Pending"}</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-[#a6d8bd]">
                    Open area <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
          {!courseAreas.length ? (
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 text-sm text-white/58">
              Course areas will appear once the asset register is prepared.
            </div>
          ) : null}
        </div>
      </section>
    </PortalShell>
  );
}
