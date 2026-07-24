import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, Printer } from "lucide-react";
import { CourseMap } from "@/components/portal/CourseMap";
import { PortalShell } from "@/components/portal/PortalShell";
import {
  demoCourseAreas,
  demoFindings,
  demoMapLayers,
  demoRecommendations,
  getDemoClubBySlug,
  getDemoReportById,
} from "@/lib/portal/demo-data";

const reportNav = [
  "Overview",
  "Greens",
  "Fairways",
  "Tees",
  "Bunkers",
  "Rough",
  "Trees and Canopy",
  "Paths and Infrastructure",
  "Water and Drainage",
  "Turf Health",
  "Terrain and Contours",
  "Recommendations",
  "Downloads",
];

export default async function ReportReaderPage({
  params,
}: {
  params: Promise<{ clubSlug: string; reportId: string }>;
}) {
  const { clubSlug, reportId } = await params;
  const club = getDemoClubBySlug(clubSlug);
  const report = getDemoReportById(reportId);
  if (!club || !report || report.clubId !== club.id) notFound();

  const visibleNav = reportNav.filter((item) =>
    report.sections.some((section) =>
      item === "Overview"
        ? section.title === "Overview"
        : section.title.toLowerCase().includes(item.toLowerCase().split(" ")[0]),
    ) || item === "Downloads",
  );

  return (
    <PortalShell club={club} active="Reports">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={`/clubs/${club.slug}/reports`} className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white">
          <ArrowLeft className="size-4" />
          Reports
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
              {report.reportType} · {report.surveyDate}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              {report.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <button className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70">
              Print view <Printer className="size-4" />
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d]">
              Download PDF <Download className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                Report progress
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-1/3 rounded-full bg-[#a6d8bd]" />
              </div>
              <nav className="mt-5 grid gap-1">
                {visibleNav.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="rounded-[6px] px-3 py-2 text-sm text-white/56 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="grid gap-5">
            <section id="overview" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold text-white">Executive summary</h2>
              <p className="mt-4 text-sm leading-6 text-white/62">{report.summary}</p>
            </section>

            <CourseMap areas={demoCourseAreas} layers={demoMapLayers} mode="report" />

            {report.sections.slice(1).map((section) => (
              <section
                key={section.id}
                id={section.title.toLowerCase().replaceAll(" ", "-")}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                  {section.moduleType}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{section.title}</h2>
                <p className="mt-4 text-sm leading-6 text-white/62">{section.summary}</p>
              </section>
            ))}

            <section id="recommendations" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold text-white">Findings and recommendations</h2>
              <div className="mt-5 grid gap-3">
                {demoFindings.map((finding) => {
                  const recommendation = demoRecommendations.find(
                    (item) => item.findingId === finding.id,
                  );
                  return (
                    <div key={finding.id} className="rounded-[6px] border border-white/10 bg-black/16 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                        {finding.severity} · {finding.confidence} confidence
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{finding.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/58">{finding.description}</p>
                      {recommendation ? (
                        <p className="mt-3 text-sm leading-6 text-[#a6d8bd]">
                          Recommended: {recommendation.title}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="flex items-center justify-between gap-3">
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70">
                Previous section
              </button>
              <button className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d]">
                Next section <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
