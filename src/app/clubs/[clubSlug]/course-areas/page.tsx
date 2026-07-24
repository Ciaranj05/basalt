import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import { getCourseAreas } from "@/lib/portal/data";

export const dynamic = "force-dynamic";

export default async function CourseAreasPage({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;
  const { supabase, club } = await requireClubMembership(clubSlug);
  const courseAreas = await getCourseAreas(supabase, club.id);

  return (
    <PortalShell club={club} active="Course Areas">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
          Course Areas
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Course asset record.
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courseAreas.map((area) => (
            <Link
              key={area.id}
              href={`/clubs/${club.slug}/course-areas/${area.id}`}
              className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                {area.areaType} · {area.referenceNumber}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{area.name}</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">{area.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a6d8bd]">
                Open area <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
