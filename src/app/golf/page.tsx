import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Golf Course Intelligence | Basalt",
  description:
    "Course intelligence for golf maintenance, turf health, drainage planning, capital investment and long-term course development.",
};

const solutions = [
  {
    eyebrow: "Golf solution 1",
    title: "Course Baseline",
    copy:
      "Create an accurate digital reference for the course, assets and core playing surfaces.",
    items: [
      "High-resolution aerial course map",
      "Orthomosaic imagery",
      "Accurate measurements",
      "Digital terrain model",
      "Contour mapping",
      "Greens, tees, bunkers and fairway mapping",
      "Tree and major asset locations",
      "3D course visualisation",
      "Interactive digital viewer",
      "Professional baseline report",
    ],
  },
  {
    eyebrow: "Golf solution 2",
    title: "See turf stress before it becomes visually obvious",
    copy:
      "Multispectral surveys help identify differences in turf vigour, moisture stress and vegetation performance across greens, tees, fairways and rough. This gives greenkeeping teams an additional layer of evidence when prioritising inspections, treatment and maintenance.",
    items: [
      "Multispectral aerial imagery",
      "Turf vigour mapping",
      "Vegetation index analysis",
      "Stress-area identification",
      "Comparison of greens, tees and fairways",
      "Moisture and drainage stress indicators",
      "Treatment-zone mapping",
      "Targeted inspection areas",
      "Repeat survey comparison",
      "Management-ready health maps",
    ],
    note:
      "Multispectral imagery indicates relative differences in vegetation condition and should support, not replace, on-site agronomic assessment, soil testing or specialist turf advice.",
    cta: "Discuss Turf Health Mapping",
  },
  {
    eyebrow: "Golf solution 3",
    title: "Course Intelligence",
    copy:
      "Turn survey data into practical management layers for daily maintenance and medium-term planning.",
    items: [
      "Green slope analysis",
      "Surface-water flow modelling",
      "Drainage risk areas",
      "Tree inventory",
      "Canopy coverage",
      "Shade analysis",
      "Bunker measurements",
      "Fairway and rough area calculations",
      "Maintenance priority mapping",
      "Turf health analysis where required",
      "Management recommendations",
    ],
  },
  {
    eyebrow: "Golf solution 4",
    title: "Strategic Course Management",
    copy:
      "Support capital works, infrastructure planning and committee-level decisions with detailed spatial evidence.",
    items: [
      "LiDAR surveying where appropriate",
      "Detailed ground modelling",
      "Volumetric calculations",
      "Cut-and-fill analysis",
      "Irrigation planning support",
      "Drainage planning support",
      "Irrigation and course infrastructure mapping",
      "Estate and boundary mapping",
      "Capital project planning support",
      "Committee and board-level reports",
      "Digital course archive",
    ],
  },
  {
    eyebrow: "Golf solution 5",
    title: "Annual Monitoring",
    copy:
      "Keep the digital course record alive with repeat surveys and year-on-year comparison.",
    items: [
      "Scheduled repeat surveys",
      "Updated course mapping",
      "Historical comparison",
      "Change detection",
      "Tree and canopy growth monitoring",
      "Drainage comparison",
      "Turf health trend monitoring",
      "Erosion and terrain change monitoring",
      "Updated asset records",
      "Annual management report",
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
            Course intelligence for better maintenance, planning and investment
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            We create accurate digital records of golf courses and turn survey
            data into practical information that supports turf management,
            drainage planning, tree management, capital investment and long-term
            course development.
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
