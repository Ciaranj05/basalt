import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Basalt Sports Grounds | Sports Pitch Mapping and Terrain Insight",
  description:
    "Accurate aerial mapping, terrain analysis and practical reporting for sports clubs planning drainage, maintenance and facility development across Ireland and Northern Ireland.",
  keywords: [
    "sports ground drone survey Ireland",
    "GAA pitch drainage survey",
    "football pitch aerial survey",
    "sports pitch terrain mapping",
    "rugby ground drone mapping",
    "cricket ground aerial survey",
    "sports facility development mapping",
    "pitch drainage mapping Northern Ireland",
  ],
};

const sports = [
  "GAA",
  "Football",
  "Rugby",
  "Cricket",
  "Hockey",
  "Community Sport",
  "Multi-Sport Facilities",
];

const problems = [
  "Recurring waterlogging",
  "Unclear surface-water movement",
  "Drainage spend without a complete site view",
  "Outdated grounds plans",
  "Difficult committee explanations",
  "Weak funding visuals",
  "Inconsistent contractor information",
  "Limited progress records",
];

const deliverables = [
  "High-resolution aerial mapping",
  "Accurate site and pitch measurements",
  "Boundaries and infrastructure mapping",
  "Contours and elevation",
  "Low-point identification",
  "Indicative surface-water flow routes",
  "Drainage-risk visualisation",
  "Proposed-development overlays",
  "Annotated PDF reports",
  "Committee presentation material",
  "Contractor briefing files",
  "Optional repeat surveys",
  "Photography and video where required",
];

const process = [
  {
    title: "Capture",
    copy: "We survey the grounds and collect accurate aerial and spatial data.",
  },
  {
    title: "Analyse",
    copy:
      "We convert the survey into maps, measurements, terrain models and practical visual layers.",
  },
  {
    title: "Explain",
    copy:
      "Your club receives a clear report showing the site, key observations and areas requiring further investigation.",
  },
  {
    title: "Act",
    copy:
      "Use the information for committee decisions, funding applications and qualified contractor discussions.",
  },
];

const outputs = [
  "Full grounds orthomosaic",
  "Pitch dimensions",
  "Boundary plan",
  "Contour map",
  "Low-point map",
  "Indicative water-flow map",
  "Development concept",
  "Progress comparison",
  "Committee-ready PDF page",
];

const packages = [
  {
    name: "Grounds Survey",
    copy: "For clubs needing an accurate record of their site.",
  },
  {
    name: "Terrain and Drainage Insight",
    copy: "For clubs experiencing waterlogging or planning drainage investment.",
  },
  {
    name: "Development Evidence Pack",
    copy:
      "For clubs planning pitches, floodlights, walking routes, buildings or capital works.",
  },
  {
    name: "Progress Monitoring",
    copy: "For construction or long-term improvement projects.",
  },
];

export default function SportsGroundsPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(184,242,210,0.13),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_46%)]" />
        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link href="/" aria-label="Basalt home">
            <BasaltLogo variant="horizontal" theme="dark" />
          </Link>
          <a
            href="#enquiry"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/16"
          >
            Discuss your grounds <ArrowRight className="size-4" />
          </a>
        </nav>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-28 lg:pt-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Basalt Sports Grounds
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
              Understand your grounds before you invest.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              Accurate aerial mapping, terrain analysis and practical reporting
              for sports clubs planning drainage, maintenance and facility
              development.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#enquiry"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
              >
                Discuss your grounds <ArrowRight className="size-4" />
              </a>
              <a
                href="#outputs"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                See what you receive
              </a>
            </div>
          </div>

          <div className="relative min-h-[500px] overflow-hidden rounded-[8px] border border-white/12 bg-[#0a100d] shadow-[0_40px_140px_rgba(0,0,0,0.42)]">
            <div className="sports-ground-map grounds-development">
              <span className="sports-pitch pitch-main" />
              <span className="sports-pitch pitch-training" />
              <span className="sports-pitch pitch-community" />
              <span className="clubhouse" />
              <span className="walking-route" />
              <span className="floodlight floodlight-one" />
              <span className="floodlight floodlight-two" />
              <span className="grounds-measure measure-one" />
              <span className="grounds-measure measure-two" />
              <span className="grounds-water water-one" />
              <span className="grounds-water water-two" />
              <span className="development-zone" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/12 bg-black/42 p-5 backdrop-blur-2xl sm:left-auto sm:w-[360px]">
              <p className="text-xs uppercase tracking-[0.24em] text-white/46">
                Illustrative Output
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Grounds mapping, measured pitches and development overlays
                prepared for committee and contractor conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Problems Clubs Face
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Better information before major grounds decisions.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {problems.map((problem) => (
              <div
                key={problem}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-sm text-white/66"
              >
                {problem}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              What Basalt Delivers
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Practical maps, measurements and reports your club can use.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/68"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#060907] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          {process.map((step, index) => (
            <div key={step.title} className="border-l border-white/10 pl-5">
              <p className="font-mono text-xs text-white/36">0{index + 1}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/60">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="outputs" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Example Outputs
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Clear material for committees, funders and contractors.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/60">
              Sample outputs are illustrative. Final reports are based on your
              site, survey scope and intended use.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {outputs.map((output) => (
              <div
                key={output}
                className="rounded-[8px] border border-white/10 bg-black/20 p-5 text-sm text-white/66"
              >
                {output}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#080d0b] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Suitable Facilities
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                Built for outdoor sports clubs and multi-pitch sites.
              </h2>
            </div>
            <div className="flex max-w-2xl flex-wrap gap-2">
              {sports.map((sport) => (
                <span
                  key={sport}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/58"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Service Packages
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Choose the evidence pack that matches the decision.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((item, index) => (
              <div
                key={item.name}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="font-mono text-xs text-white/36">0{index + 1}</p>
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  {item.copy}
                </p>
                <a
                  href="#enquiry"
                  className="mt-6 inline-flex text-sm font-semibold text-[#a6d8bd]"
                >
                  Request a quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#060907] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-5 text-[#a6d8bd]" />
            <div>
              <h2 className="text-xl font-semibold text-white">
                Professional limitations
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-white/62">
                Basalt provides aerial surveying, terrain analysis and visual
                decision-support information. Findings may identify areas
                requiring further investigation but do not replace geotechnical
                assessment, civil engineering design, drainage design, planning
                advice or other regulated professional services. Final design
                and construction recommendations should be completed by suitably
                qualified professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[8px] border border-white/12 bg-white/[0.055] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <BasaltLogo variant="horizontal" theme="grey" size="compact" />
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              See the full picture before committing to works.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="mailto:hello@basalt.co?subject=Basalt%20Sports%20Grounds%20enquiry"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Discuss your grounds <ArrowRight className="size-4" />
            </a>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/14"
            >
              Back to Basalt Golf
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="transition hover:text-white">
              Basalt Golf
            </Link>
            <span>Basalt Sports Grounds</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
