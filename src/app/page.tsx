"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDot,
  Droplets,
  FileText,
  Layers3,
  Map,
  Milestone,
  ScanLine,
  Trees,
} from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const problems = [
  {
    icon: Droplets,
    quote: "I know there's a drainage problem but can't prove where.",
  },
  {
    icon: Milestone,
    quote: "We're planning a bunker renovation.",
  },
  {
    icon: FileText,
    quote: "The committee wants evidence before approving investment.",
  },
  {
    icon: Map,
    quote: "We have no accurate digital record of the course.",
  },
  {
    icon: CircleDot,
    quote: "Our knowledge exists only in the greenkeeper's head.",
  },
];

const solutions = [
  {
    icon: Map,
    title: "Course Baseline",
    copy: "A complete digital record of the golf course.",
    items: [
      "Orthomosaic",
      "Terrain model",
      "Contours",
      "Asset mapping",
      "Infrastructure",
      "Measurements",
    ],
  },
  {
    icon: Droplets,
    title: "Drainage Intelligence",
    copy: "Evidence for wet areas, low points and drainage planning.",
    items: [
      "Low area identification",
      "Surface water flow",
      "Potential ponding",
      "Drainage planning support",
    ],
  },
  {
    icon: BarChart3,
    title: "Turf Performance",
    copy:
      "Multispectral insight that highlights areas requiring further inspection and comparison over time.",
    items: [
      "Turf vigour mapping",
      "Stress-area indicators",
      "Targeted inspection zones",
      "Repeat comparison",
    ],
  },
  {
    icon: Layers3,
    title: "Course Redevelopment",
    copy: "Measured support for course projects before work begins.",
    items: [
      "Bunker redesign",
      "New tees",
      "Green extensions",
      "Earthworks",
      "Irrigation planning",
    ],
  },
  {
    icon: Trees,
    title: "Tree & Woodland Management",
    copy: "Structured records for trees, canopy, woodland and planning.",
    items: [
      "Tree inventory",
      "Canopy change",
      "Woodland monitoring",
      "Planning support",
    ],
  },
  {
    icon: FileText,
    title: "Annual Course Monitoring",
    copy: "The flagship recurring product for long-term course intelligence.",
    items: [
      "Annual comparison",
      "Historical change",
      "Committee reporting",
      "Capital planning",
    ],
  },
];

const processSteps = [
  {
    title: "Survey",
    copy: "Capture accurate course data.",
  },
  {
    title: "Analyse",
    copy: "Convert imagery into practical course intelligence.",
  },
  {
    title: "Report",
    copy: "Deliver committee-ready reports.",
  },
  {
    title: "Monitor",
    copy: "Track change year after year.",
  },
];

const reportCards = [
  {
    title: "Orthomosaic",
    copy: "A high-resolution visual record of the entire course.",
    layer: "Course image",
  },
  {
    title: "Contour plan",
    copy: "Levels and contours that make the course easier to understand.",
    layer: "Contours",
  },
  {
    title: "Slope analysis",
    copy: "Gradients that influence playability, maintenance and project design.",
    layer: "Slope",
  },
  {
    title: "Drainage map",
    copy: "Likely flow routes, low points and areas that need closer review.",
    layer: "Water flow",
  },
  {
    title: "Turf health",
    copy: "Relative vegetation variation that supports targeted inspection.",
    layer: "Turf vigour",
  },
  {
    title: "Management recommendations",
    copy: "Clear priorities for managers, committees and future planning.",
    layer: "Actions",
  },
];

const reasons = [
  "Justify investment with clear evidence",
  "Monitor change across the course",
  "Improve maintenance planning",
  "Preserve institutional knowledge",
  "Build a long-term digital course record",
];

const technology = [
  {
    title: "RGB",
    copy: "High-resolution visual course records.",
  },
  {
    title: "RTK",
    copy: "Accurate positioning for reliable mapping.",
  },
  {
    title: "Photogrammetry",
    copy: "Measured surface models from overlapping imagery.",
  },
  {
    title: "LiDAR",
    copy: "Used where appropriate for detailed ground information.",
  },
  {
    title: "Multispectral",
    copy: "Relative turf vigour and vegetation variation.",
  },
  {
    title: "GIS",
    copy: "Organised layers for course records and reporting.",
  },
];

function CourseScene({ label }: { label: string }) {
  return (
    <div className="landscape-scene scene-golf" aria-label={label} role="img">
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

export default function Home() {
  const [activeReport, setActiveReport] = useState(reportCards[0]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0">
          <CourseScene label="Championship golf course aerial with subtle Basalt course intelligence overlays" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[#050807]" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link href="/" aria-label="Basalt home">
            <BasaltLogo variant="horizontal" theme="dark" />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#reports" className="transition hover:text-white">Reports</a>
            <a href="#technology" className="transition hover:text-white">Technology</a>
            <Link href="/about" className="transition hover:text-white">About</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
          <Link
            href="/contact"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/16 sm:inline-flex"
          >
            Book a Discovery Call <ArrowRight className="size-4" />
          </Link>
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-5 pb-12 sm:px-8 lg:items-center lg:px-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Golf Course Intelligence
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.94] tracking-normal text-white sm:text-balance sm:text-7xl lg:text-8xl">
              Understand Your Course. Plan With Confidence.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/76 sm:text-xl">
              Helping golf clubs make better decisions through accurate course
              intelligence, mapping and long-term monitoring.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
              >
                Book a Discovery Call <ArrowRight className="size-4" />
              </Link>
              <a
                href="#reports"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
              >
                View Sample Report
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-10 max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              The Problems We Solve
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Course decisions need evidence.
            </h2>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.article
                  key={problem.quote}
                  className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <Icon className="size-5 text-[#a6d8bd]" />
                  <p className="mt-5 text-lg font-medium leading-7 text-white">
                    {problem.quote}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solutions" className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Solutions
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Intelligence for every major course decision.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Basalt gives course teams, managers and committees the record
              they need before committing to drainage, renovation, maintenance
              or capital works.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.article
                  key={solution.title}
                  className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <Icon className="size-5 text-[#a6d8bd]" />
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {solution.copy}
                  </p>
                  <div className="mt-5 grid gap-2">
                    {solution.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-5 text-white/62">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              How It Works
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              From course survey to annual evidence.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="survey-step">
                <p className="font-mono text-xs text-white/36">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reports" className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Sample Report
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Committee-ready course intelligence.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Sample report cards show the kind of evidence Basalt can provide
              for maintenance planning, investment discussions and annual
              course records.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              key={activeReport.title}
              className="report-map report-golf min-h-[520px]"
              initial={{ opacity: 0.88 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className="report-grid" />
              <span className="report-route report-route-one" />
              <span className="report-route report-route-two" />
              <span className="report-zone report-zone-one" />
              <span className="report-zone report-zone-two" />
              <span className="report-marker report-marker-one" />
              <span className="report-marker report-marker-two" />
              <div className="absolute inset-x-4 bottom-4 rounded-[6px] border border-white/12 bg-black/64 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                  {activeReport.layer}
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">
                  {activeReport.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/64">
                  {activeReport.copy}
                </p>
              </div>
            </motion.div>

            <div className="grid content-start gap-2">
              {reportCards.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveReport(card)}
                  className={`rounded-[8px] border p-4 text-left transition ${
                    activeReport.title === card.title
                      ? "border-white/24 bg-white/10 text-white"
                      : "border-white/10 bg-white/[0.035] text-white/58 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="text-base font-semibold">{card.title}</span>
                  <span className="mt-2 block text-sm leading-6 opacity-70">
                    {card.copy}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Why Basalt
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Better decisions, not more data.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/62">
              Golf clubs speak to Basalt before major works because course
              decisions need a reliable record, clear evidence and a report
              that can be understood beyond the maintenance team.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/66"
              >
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#a6d8bd]" />
                {reason}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Technology
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              The tools behind course intelligence.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/62">
              Technology is selected for the course, the decision and the level
              of accuracy required.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technology.map((item) => (
              <article
                key={item.title}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5"
              >
                <ScanLine className="size-5 text-[#a6d8bd]" />
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.055] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.38)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <BasaltLogo variant="horizontal" theme="grey" size="compact" className="text-sm" />
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Planning a course investment?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                Speak to Basalt before committing to drainage, bunker work,
                irrigation changes or long-term course improvements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Book a Discovery Call <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/8 pt-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#reports" className="transition hover:text-white">Reports</a>
            <a href="#technology" className="transition hover:text-white">Technology</a>
            <Link href="/about" className="transition hover:text-white">About</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
