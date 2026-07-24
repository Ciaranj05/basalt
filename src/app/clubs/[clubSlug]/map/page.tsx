import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Layers3, MapPinned } from "lucide-react";
import { ArcgisCourseMap } from "@/components/portal/ArcgisCourseMap";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import { getApprovedArcgisMapConfig } from "@/lib/portal/arcgis";
import { getCourseAreas, getCourses, getFindingsForReport, getRecommendationsForReport, getReportsForClub } from "@/lib/portal/data";
import type { Finding } from "@/lib/portal/types";

export const dynamic = "force-dynamic";

function emptyStateCopy(reason: string | null) {
  if (reason === "no_course") {
    return {
      title: "Your course workspace is being prepared.",
      body: "Course details will appear here once Basalt has completed the initial workspace setup.",
    };
  }

  if (reason === "invalid_webmap_item_id") {
    return {
      title: "We couldn't load the course map at the moment.",
      body: "Please try again or open the latest report.",
    };
  }

  return {
    title: "Your interactive course map is currently being prepared.",
    body: "You can still access your published reports while Basalt prepares the approved customer map.",
  };
}

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

export default async function ClubMapPage({
  params,
  searchParams,
}: {
  params: Promise<{ clubSlug: string }>;
  searchParams?: Promise<{ course?: string }>;
}) {
  const { clubSlug } = await params;
  const query = await searchParams;
  const { supabase, club, isBasaltStaff } = await requireClubMembership(clubSlug);

  const [courses, reports] = await Promise.all([
    getCourses(supabase, club.id),
    getReportsForClub({ supabase, clubId: club.id, includeInternal: isBasaltStaff }),
  ]);

  const selectedCourse = query?.course
    ? courses.find((course) => course.id === query.course) ?? null
    : courses[0] ?? null;

  if (query?.course && !selectedCourse) notFound();

  const latestPublishedReport = reports.find(
    (report) => report.status === "published" && (!selectedCourse || report.courseId === selectedCourse.id),
  ) ?? null;

  const [courseAreas, findings, recommendations] = latestPublishedReport
    ? await Promise.all([
        getCourseAreas(supabase, club.id),
        getFindingsForReport(supabase, club.id, latestPublishedReport.id),
        getRecommendationsForReport(supabase, club.id, latestPublishedReport.id),
      ])
    : [[], [], []];

  const sortedFindings = [...findings].sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
  const openRecommendations = recommendations.filter((recommendation) => recommendation.status !== "completed");

  const { config, reason } = await getApprovedArcgisMapConfig({
    supabase,
    clubId: club.id,
    clubSlug,
    course: selectedCourse,
    latestReport: latestPublishedReport,
  });

  const emptyState = emptyStateCopy(reason);

  return (
    <PortalShell club={club} active="Course Map">
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">Course Map</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Explore the evidence behind the report.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
              Move between published survey layers, course areas, findings and recommended actions without leaving the Basalt portal.
            </p>
          </div>
          <Link
            href={`/clubs/${club.slug}/reports`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white"
          >
            Open reports <ArrowRight className="size-4" />
          </Link>
        </div>

        {courses.length > 1 ? (
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Course selector">
            {courses.map((course) => {
              const active = selectedCourse?.id === course.id;
              return (
                <Link
                  key={course.id}
                  href={`/clubs/${club.slug}/map?course=${course.id}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-white text-[#07110d]"
                      : "border border-white/12 bg-white/[0.04] text-white/62 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {course.name}
                </Link>
              );
            })}
          </nav>
        ) : null}

        <div className="mt-8">
          {config && selectedCourse ? (
            <ArcgisCourseMap
              config={config}
              courseName={selectedCourse.name}
              reportHref={latestPublishedReport ? `/clubs/${club.slug}/reports/${latestPublishedReport.slug}` : undefined}
              areaCount={courseAreas.length}
              findings={sortedFindings.slice(0, 3).map((finding) => ({
                id: finding.id,
                title: finding.title,
                meta: `${titleCase(finding.severity)} finding`,
              }))}
              recommendations={openRecommendations.slice(0, 2).map((recommendation) => ({
                id: recommendation.id,
                title: recommendation.title,
                meta: `${titleCase(recommendation.priority)} · ${recommendation.recommendedTimeframe}`,
              }))}
            />
          ) : (
            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-[#a6d8bd]/20 bg-[#a6d8bd]/10">
                  <MapPinned className="size-5 text-[#a6d8bd]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/38">Map status</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">
                    {emptyState.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{emptyState.body}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/clubs/${club.slug}/reports`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
                    >
                      View published reports <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href={`/clubs/${club.slug}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      Return to overview
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            ["Survey context", latestPublishedReport ? `${latestPublishedReport.title} · ${latestPublishedReport.surveyDate}` : "Published survey context will appear here once available."],
            ["Course intelligence", `${sortedFindings.length} findings and ${openRecommendations.length} open recommendations connected to this view.`],
            ["Published map only", "Only the approved customer Web Map reference is passed into the browser."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Layers3 className="size-4 text-[#a6d8bd]" />
                {title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/52">{copy}</p>
            </div>
          ))}
        </section>
      </section>
    </PortalShell>
  );
}
