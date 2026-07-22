import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Farms & Estates | Basalt",
  description:
    "Accurate land intelligence for farms and estates, including land mapping, vegetation analysis, infrastructure planning and environmental monitoring.",
};

const solutions = [
  {
    eyebrow: "Farm solution 1",
    title: "Land Baseline",
    copy:
      "Create a clear digital record of fields, access, infrastructure, terrain and core land assets.",
    items: [
      "High-resolution farm map",
      "Field and parcel mapping",
      "Boundary measurements",
      "Terrain and contour mapping",
      "Watercourse mapping",
      "Drainage features",
      "Fencing, gateways and trough locations",
      "Tracks and access routes",
      "Buildings and infrastructure",
      "Digital land record",
      "Professional report",
    ],
  },
  {
    eyebrow: "Farm solution 2",
    title: "Identify variation across fields and vegetation",
    copy:
      "Multispectral imagery helps reveal differences in crop and vegetation vigour that may not be obvious from ground level, supporting more targeted inspection and management.",
    items: [
      "Multispectral field imagery",
      "Vegetation index mapping",
      "Crop vigour analysis",
      "Stress-zone identification",
      "Field variability maps",
      "Drainage-related stress indicators",
      "Poor establishment areas",
      "Grazing and grassland comparison",
      "Targeted scouting zones",
      "Repeat seasonal comparison",
    ],
    note:
      "Multispectral analysis identifies relative variation and should be interpreted alongside field inspection, agronomic advice, weather, soil conditions and farm records.",
  },
  {
    eyebrow: "Farm solution 3",
    title: "Infrastructure and Water Management",
    copy:
      "Support practical improvement work with mapping and measurements for drainage, access, water and infrastructure.",
    items: [
      "Drainage mapping",
      "Surface-water flow analysis",
      "Waterlogging risk areas",
      "Trough and pipeline mapping",
      "Fencing plans",
      "Gateway and access planning",
      "Track condition mapping",
      "Building and yard mapping",
      "Earthwork and volume calculations",
      "Project planning maps",
    ],
  },
  {
    eyebrow: "Farm solution 4",
    title: "Environmental and Scheme Evidence",
    copy:
      "Create evidence-ready maps and records for environmental management, habitat work and before-and-after project review.",
    items: [
      "Habitat mapping",
      "Hedgerow and tree mapping",
      "Riparian buffer mapping",
      "Watercourse records",
      "Wetland and rough-ground mapping",
      "Before-and-after project evidence",
      "Repeat monitoring",
      "Area measurements",
      "Management maps",
      "Evidence-ready reports",
    ],
    note:
      "Basalt provides mapping and evidence outputs for decision support. Acceptance by any funding body or authority depends on the relevant scheme rules and review process.",
  },
  {
    eyebrow: "Farm solution 5",
    title: "Annual Land Monitoring",
    copy:
      "Track land condition, infrastructure and vegetation over time with scheduled repeat surveys.",
    items: [
      "Repeat aerial surveys",
      "Seasonal vegetation comparison",
      "Boundary and infrastructure updates",
      "Drainage comparison",
      "Tree and hedgerow monitoring",
      "Erosion and land-condition monitoring",
      "Historical archive",
      "Annual land report",
    ],
  },
];

function EstateScene() {
  return (
    <div className="landscape-scene scene-estates" role="img" aria-label="Farm and estate aerial with Basalt overlays">
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

export default function FarmsEstatesPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" product="Estates" theme="dark" />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/62 md:flex">
          <Link href="/golf" className="transition hover:text-white">Golf Course Intelligence</Link>
          <Link href="/our-process" className="transition hover:text-white">Process</Link>
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
            Farms & Estates
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Accurate land intelligence for farms and estates
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            We provide digital mapping and land analysis that helps owners and
            managers understand field conditions, infrastructure, vegetation
            performance and long-term changes across their land.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Request a Proposal <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="chapter-visual">
          <EstateScene />
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
