import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";
import { MoistureAndDrainagePreviews } from "@/components/OutputExamples";

export const metadata: Metadata = {
  title: "Golf Course Intelligence | Basalt",
  description:
    "Course intelligence and monitoring designed specifically for golf clubs, combining drone-based monitoring, GIS, turf insight, moisture observations and clear visual reporting.",
};

const solutions = [
  {
    eyebrow: "Golf solution 1",
    title: "Course Baseline",
    copy:
      "Establish a clear visual record of current course condition across the areas your team manages every day.",
    items: [
      "Whole course coverage",
      "Greens, tees and fairways",
      "Current imagery",
      "Areas warranting attention",
      "Visual course record",
      "Clear reporting",
    ],
  },
  {
    eyebrow: "Golf solution 2",
    title: "Turf Insight",
    copy:
      "Repeat imagery and multispectral analysis help identify meaningful changes in turf condition for closer inspection.",
    items: [
      "Repeat imagery",
      "Multispectral analysis",
      "Growth variation",
      "Turf condition indicators",
      "Targeted inspection areas",
      "Survey comparison",
      "Management-ready maps",
    ],
    note:
      "Multispectral imagery indicates relative differences in vegetation condition and should support, not replace, on-site agronomic assessment, soil testing or specialist turf advice.",
    cta: "Discuss Turf Health Mapping",
  },
  {
    eyebrow: "Golf solution 3",
    title: "Water & Moisture Patterns",
    copy:
      "Highlight areas where moisture behaviour or surface condition suggests further investigation.",
    items: [
      "Persistent wet areas",
      "Moisture observations",
      "Drainage concerns",
      "Irrigation context",
      "Areas to inspect",
      "Visual evidence",
    ],
  },
  {
    eyebrow: "Golf solution 4",
    title: "Change Tracking",
    copy:
      "Compare surveys over time and understand what has improved, deteriorated or remained persistent.",
    items: [
      "Previous survey comparison",
      "Seasonal changes",
      "Areas improving",
      "Areas deteriorating",
      "Maintenance impact",
      "Persistent concerns",
    ],
  },
  {
    eyebrow: "Golf solution 5",
    title: "Course Intelligence Reports",
    copy:
      "Turn survey information into clear visual evidence for greenkeepers, managers and committees.",
    items: [
      "Current imagery",
      "Previous surveys",
      "Areas of concern",
      "Moisture observations",
      "Turf condition",
      "Updated visual reports",
    ],
  },
];

function CourseScene() {
  return (
    <div className="landscape-scene scene-golf" role="img" aria-label="Golf course aerial with Basalt overlays">
      <span className="terrain-grid" />
      <span className="contour contour-one" />
      <span className="contour contour-two" />
      <span className="route-line route-one" />
      <span className="route-line route-two" />
      <span className="asset-pin pin-one" />
      <span className="asset-pin pin-two" />
      <span className="zone zone-one" />
      <span className="zone zone-two" />
    </div>
  );
}

function SolutionSection({ solution }: { solution: (typeof solutions)[number] }) {
  return (
    <article className="grid gap-4 rounded-[8px] border border-[#d8d1c1] bg-white p-5 shadow-[0_24px_70px_rgba(20,28,22,0.06)] sm:p-7 lg:grid-cols-[0.72fr_1.28fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#486754]">
          {solution.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#07110d]">
          {solution.title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-[#314138]/70">{solution.copy}</p>
        {"note" in solution ? (
          <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-[#d8d1c1] bg-[#f4f1e8] p-4">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-[#486754]" />
            <p className="text-sm leading-6 text-[#314138]/68">{solution.note}</p>
          </div>
        ) : null}
        {"cta" in solution ? (
          <a
            href="mailto:hello@basalt.co?subject=Turf%20Health%20Mapping"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#07110d] px-5 text-sm font-semibold text-white transition hover:bg-[#1b2b22]"
          >
            {solution.cta} <ArrowRight className="size-4" />
          </a>
        ) : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {solution.items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-[6px] border border-[#d8d1c1] bg-[#fbfaf6] p-3 text-sm leading-5 text-[#314138]/72"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#486754]" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function GolfPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#07110d]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" product="Golf" theme="light" />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-[#314138]/64 md:flex">
          <Link href="/#solutions" className="transition hover:text-[#07110d]">Solutions</Link>
          <Link href="/#reports" className="transition hover:text-[#07110d]">Reports</Link>
          <Link href="/#technology" className="transition hover:text-[#07110d]">Technology</Link>
          <Link href="/about" className="transition hover:text-[#07110d]">About</Link>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[#d8d1c1] bg-white px-4 text-sm font-medium text-[#07110d] transition hover:border-[#486754]/30 hover:bg-[#f4f1e8]"
        >
          Request a Proposal <ArrowRight className="size-4" />
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
            Golf Course Intelligence
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Your course. Better understood.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#314138]/72">
            Course intelligence and monitoring designed specifically for golf
            clubs, combining drone-based monitoring, GIS and clear visual
            reporting so your team can understand course condition and how it
            changes over time.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#07110d] px-5 text-sm font-semibold text-white transition hover:bg-[#1b2b22]"
          >
            Request a Proposal <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="chapter-visual">
          <CourseScene />
        </div>
      </section>

      <section className="bg-[#f4f1e8] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
            Monitor. Compare. Understand.
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
            Build a clearer record of your course over time.
          </h2>
        </div>
        <div className="rounded-[8px] border border-[#d8d1c1] bg-white p-6 shadow-[0_24px_70px_rgba(20,28,22,0.06)] sm:p-8">
          <p className="text-base leading-7 text-[#314138]/76">
            The value is not simply in flying the course. It is in
            understanding what has changed since the last survey.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#314138]/64">
            Regular monitoring can help clubs identify areas improving, areas
            deteriorating, persistent moisture patterns, seasonal changes,
            shifts in turf condition and the impact of maintenance work.
          </p>
        </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:px-10 lg:py-20">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
            Example Outputs
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
            Understand moisture patterns.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#314138]/70">
            Visualise how conditions vary across the course and identify areas
            that may warrant closer investigation. Drainage views bring course
            observations and spatial information together to help show low
            areas, recurring patterns and places worth reviewing further.
          </p>
        </div>
        <MoistureAndDrainagePreviews />
      </section>

      <section className="bg-[#f4f1e8] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-4">
        {solutions.map((solution) => (
          <SolutionSection key={solution.title} solution={solution} />
        ))}
        </div>
      </section>
    </main>
  );
}
