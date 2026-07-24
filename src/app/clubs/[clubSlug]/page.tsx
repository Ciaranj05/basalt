import Link from "next/link";
import { ArrowRight, Download, MapPinned } from "lucide-react";
import { CourseMap } from "@/components/portal/CourseMap";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import {
  getCourseAreas,
  getFindingsForReport,
  getLatestPublishedReport,
  getMapLayers,
  getPrimaryCourse,
  getRecentActivity,
  getRecommendationsForReport,
} from "@/lib/portal/data";

export const dynamic = "force-dynamic";

export default async function ClubOverviewPage({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;
  const { supabase, club } = await requireClubMembership(clubSlug);

  const [course, latestReport, courseAreas, activity] = await Promise.all([
    getPrimaryCourse(supabase, club.id),
    getLatestPublishedReport(supabase, club.id),
    getCourseAreas(supabase, club.id),
    getRecentActivity(supabase, club.id),
  ]);

  const [mapLayers, findings, recommendations] = await Promise.all([
    course ? getMapLayers(supabase, club.id, course.id, latestReport?.id) : Promise.resolve([]),
    latestReport ? getFindingsForReport(supabase, club.id, latestReport.id) : Promise.resolve([]),
    latestReport ? getRecommendationsForReport(supabase, club.id, latestReport.id) : Promise.resolve([]),
  ]);

  const highPriorityFindings = findings.filter(
    (finding) => finding.severity === "high" || finding.severity === "critical",
  );
  const openRecommendations = recommendations.filter(
    (recommendation) => recommendation.status !== "completed",
  );

  return (
    <PortalShell club={club} active="Overview">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
              Customer Portal
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              {club.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
              {latestReport?.summary ?? "Your published course intelligence will appear here once Basalt releases the first report."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {latestReport ? (
              <Link
                href={`/clubs/${club.slug}/reports/${latestReport.slug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
              >
                Open latest report <ArrowRight className="size-4" />
              </Link>
            ) : null}
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70"
            >
              Download PDF <Download className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Latest survey", latestReport?.surveyDate ?? "Pending"],
            ["Package", club.packageName],
            ["High-priority findings", String(highPriorityFindings.length)],
            ["Open recommendations", String(openRecommendations.length)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/42">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <CourseMap areas={courseAreas} layers={mapLayers} />
          <div className="grid gap-4">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <MapPinned className="size-4 text-[#a6d8bd]" />
                Key areas requiring attention
              </div>
              <div className="mt-4 grid gap-3">
                {courseAreas.slice(0, 3).map((area) => (
                  <Link
                    key={area.id}
                    href={`/clubs/${club.slug}/course-areas/${area.id}`}
                    className="rounded-[6px] border border-white/10 bg-black/16 p-3 transition hover:bg-white/[0.06]"
                  >
                    <p className="text-sm font-semibold text-white">{area.name}</p>
                    <p className="mt-1 text-xs leading-5 text-white/48">{area.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">Recently completed actions</p>
              <div className="mt-4 grid gap-3">
                {activity.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-white/62">{item.action}</span>
                    <span className="font-mono text-xs text-white/36">{item.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">Course setup</p>
              <p className="mt-2 text-sm leading-6 text-white/56">
                {course ? `${course.name}, ${course.holeCount} holes.` : "Course setup is pending."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
