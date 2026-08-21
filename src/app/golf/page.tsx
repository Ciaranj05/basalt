import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Golf Course Intelligence | Basalt",
  description:
    "Golf course intelligence for turf health, drainage and moisture analysis, repeat aerial surveys, monthly monitoring and clear visual reporting.",
};

const solutions = [
  {
    eyebrow: "Golf solution 1",
    title: "Golf Course Drone Surveys",
    copy:
      "Create a consistent aerial view of key course areas so greenkeeping teams can see condition clearly.",
    items: [
      "Repeatable drone surveys",
      "Whole course coverage",
      "Greens, tees and fairways",
      "Consistent aerial imagery",
      "Visual course record",
      "Clear survey outputs",
    ],
  },
  {
    eyebrow: "Golf solution 2",
    title: "Turf Health Monitoring",
    copy:
      "Multispectral surveys help identify differences in turf condition across greens, tees, fairways and rough, giving teams an additional layer of evidence when prioritising inspections and maintenance.",
    items: [
      "Multispectral aerial imagery",
      "Turf health indicators",
      "Growth variation",
      "Stress-area indicators",
      "Comparison of greens, tees and fairways",
      "Targeted inspection areas",
      "Repeat survey comparison",
      "Management-ready visual maps",
    ],
    note:
      "Multispectral imagery indicates relative differences in vegetation condition and should support, not replace, on-site agronomic assessment, soil testing or specialist turf advice.",
    cta: "Discuss Turf Health Mapping",
  },
  {
    eyebrow: "Golf solution 3",
    title: "Drainage & Moisture Analysis",
    copy:
      "Reveal waterlogging, moisture patterns and drainage issues so maintenance can be focused where it is needed most.",
    items: [
      "Wet area review",
      "Moisture pattern insight",
      "Drainage issue evidence",
      "Irrigation change monitoring",
      "Targeted maintenance areas",
      "Clear visual reporting",
    ],
  },
  {
    eyebrow: "Golf solution 4",
    title: "Course Condition Reporting",
    copy:
      "Turn course survey outputs into practical reports that greenkeepers, course managers and committees can understand.",
    items: [
      "Key areas of concern",
      "Course condition maps",
      "Turf health visuals",
      "Drainage and moisture visuals",
      "Maintenance priorities",
      "Committee and board-level reports",
    ],
  },
  {
    eyebrow: "Golf solution 5",
    title: "Monthly Monitoring Plans",
    copy:
      "Repeat surveys throughout the season help clubs monitor change and measure whether maintenance programmes are working.",
    items: [
      "Monthly repeat surveys",
      "Consistent flight plans",
      "Historical comparison",
      "Seasonal change tracking",
      "Drainage and turf comparison",
      "Maintenance impact review",
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
    <article className="grid gap-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-7 lg:grid-cols-[0.72fr_1.28fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
          {solution.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white">
          {solution.title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-white/62">{solution.copy}</p>
        {"note" in solution ? (
          <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-white/10 bg-black/18 p-4">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-[#a6d8bd]" />
            <p className="text-sm leading-6 text-white/58">{solution.note}</p>
          </div>
        ) : null}
        {"cta" in solution ? (
          <a
            href="mailto:hello@basalt.co?subject=Turf%20Health%20Mapping"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            {solution.cta} <ArrowRight className="size-4" />
          </a>
        ) : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {solution.items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-black/16 p-3 text-sm leading-5 text-white/64"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function GolfPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" product="Golf" theme="dark" />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/62 md:flex">
          <Link href="/#solutions" className="transition hover:text-white">Solutions</Link>
          <Link href="/#reports" className="transition hover:text-white">Reports</Link>
          <Link href="/#technology" className="transition hover:text-white">Technology</Link>
          <Link href="/about" className="transition hover:text-white">About</Link>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/16"
        >
          Request a Proposal <ArrowRight className="size-4" />
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Golf Course Intelligence
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Course intelligence for better maintenance decisions
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            Basalt helps golf clubs understand course condition through
            repeatable aerial surveys, turf health monitoring, drainage and
            moisture analysis, and clear visual reports.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Request a Proposal <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="chapter-visual">
          <CourseScene />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-4 px-5 pb-20 sm:px-8 lg:px-10">
        {solutions.map((solution) => (
          <SolutionSection key={solution.title} solution={solution} />
        ))}
      </section>
    </main>
  );
}
