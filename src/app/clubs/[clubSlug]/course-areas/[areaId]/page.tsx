import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CourseMap } from "@/components/portal/CourseMap";
import { PortalShell } from "@/components/portal/PortalShell";
import {
  demoCourseAreas,
  demoFindings,
  demoMapLayers,
  demoRecommendations,
  getDemoAreaById,
  getDemoClubBySlug,
} from "@/lib/portal/demo-data";

export default async function CourseAreaDetailPage({
  params,
}: {
  params: Promise<{ clubSlug: string; areaId: string }>;
}) {
  const { clubSlug, areaId } = await params;
  const club = getDemoClubBySlug(clubSlug);
  const area = getDemoAreaById(areaId);
  if (!club || !area || area.clubId !== club.id) notFound();

  const index = demoCourseAreas.findIndex((item) => item.id === area.id);
  const previous = demoCourseAreas[index - 1];
  const next = demoCourseAreas[index + 1];
  const findings = demoFindings.filter((finding) => finding.courseAreaId === area.id);
  const recommendations = demoRecommendations.filter(
    (recommendation) => recommendation.courseAreaId === area.id,
  );

  return (
    <PortalShell club={club} active="Course Areas">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={`/clubs/${club.slug}/course-areas`} className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white">
          <ArrowLeft className="size-4" />
          Course areas
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
              {area.areaType} · {area.referenceNumber}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              {area.name}
            </h1>
            <p className="mt-4 text-sm leading-6 text-white/58">{area.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {previous ? (
              <Link href={`/clubs/${club.slug}/course-areas/${previous.id}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70">
                <ArrowLeft className="size-4" />
                {previous.name}
              </Link>
            ) : null}
            {next ? (
              <Link href={`/clubs/${club.slug}/course-areas/${next.id}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d]">
                {next.name}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <CourseMap
            areas={demoCourseAreas}
            layers={demoMapLayers}
            selectedAreaId={area.id}
            mode="area"
          />
          <div className="grid gap-4">
            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">Current condition summary</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Basalt analyst commentary will combine relevant aerial imagery,
                turf-health findings, drainage observations, terrain notes and
                supporting photographs for this asset.
              </p>
            </section>
            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">Historical comparison</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Development placeholder for comparison against previous surveys
                when repeat monitoring data exists.
              </p>
            </section>
            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">Linked findings</h2>
              <div className="mt-4 grid gap-3">
                {findings.length ? (
                  findings.map((finding) => (
                    <div key={finding.id} className="rounded-[6px] border border-white/10 bg-black/16 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                        {finding.severity}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{finding.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/48">No linked findings in the demo report.</p>
                )}
              </div>
            </section>
            <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-semibold text-white">Recommended actions</h2>
              <div className="mt-4 grid gap-3">
                {recommendations.length ? (
                  recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="rounded-[6px] border border-white/10 bg-black/16 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                        {recommendation.priority} · {recommendation.recommendedTimeframe}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{recommendation.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/48">No recommendations linked to this area.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
