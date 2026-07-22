"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const solutions = [
  {
    title: "Golf Course Intelligence",
    copy:
      "Digital mapping, terrain analysis, turf health insight and management reporting for golf clubs.",
    cta: "Explore Golf Solutions",
    href: "/golf",
    scene: "scene-golf",
    labels: ["Course baseline", "Turf health", "Drainage planning"],
  },
  {
    title: "Farms & Estates",
    copy:
      "Accurate land mapping, vegetation analysis and practical intelligence for agricultural and estate management.",
    cta: "Explore Land Solutions",
    href: "/farms-estates",
    scene: "scene-estates",
    labels: ["Field mapping", "Vegetation insight", "Asset records"],
  },
];

const capabilities = [
  "High-resolution aerial mapping",
  "Digital terrain and surface models",
  "LiDAR surveying where appropriate",
  "RTK and GNSS survey control",
  "Multispectral imagery",
  "Vegetation and turf health analysis",
  "Drainage and water-flow analysis",
  "Asset and infrastructure mapping",
  "Historical comparison",
  "Annual monitoring",
  "Professional management reports",
];

const processSteps = [
  {
    title: "Understand",
    copy:
      "We discuss the site, current challenges and decisions the client needs to make.",
  },
  {
    title: "Survey",
    copy:
      "We select the appropriate combination of aerial imagery, RTK, LiDAR, multispectral and ground data.",
  },
  {
    title: "Analyse",
    copy:
      "We process the data into accurate mapping, terrain models, health indicators and management information.",
  },
  {
    title: "Report",
    copy:
      "We deliver clear digital outputs and reports designed for practical use, planning and future comparison.",
  },
];

const deliverables = [
  {
    title: "Turf vigour map",
    decision: "Supports targeted greenkeeping inspections and treatment planning.",
    variant: "golf",
    legend: "Relative turf vigour",
  },
  {
    title: "Crop vegetation map",
    decision: "Highlights field variation for more focused scouting and management.",
    variant: "estates",
    legend: "Relative vegetation vigour",
  },
  {
    title: "Drainage flow map",
    decision: "Shows likely water movement and low points before drainage work begins.",
    variant: "estates",
    legend: "Surface-water flow",
  },
  {
    title: "Digital terrain model",
    decision: "Provides levels and landform information for planning and measurement.",
    variant: "golf",
    legend: "Terrain and contours",
  },
  {
    title: "Tree and canopy inventory",
    decision: "Helps plan shade, access, maintenance and long-term landscape change.",
    variant: "estates",
    legend: "Canopy coverage",
  },
  {
    title: "Field asset map",
    decision: "Creates a structured record of gates, tracks, troughs and infrastructure.",
    variant: "estates",
    legend: "Mapped assets",
  },
  {
    title: "Course baseline report",
    decision: "Gives committees and course teams a clear reference for future decisions.",
    variant: "golf",
    legend: "Baseline layers",
  },
  {
    title: "Annual change report",
    decision: "Compares repeat surveys to show condition, growth and project progress.",
    variant: "estates",
    legend: "Change over time",
  },
];

function SceneVisual({ scene, label }: { scene: string; label: string }) {
  return (
    <div className={`landscape-scene ${scene}`} aria-label={label} role="img">
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

function ReportCard({
  title,
  decision,
  variant,
  legend,
}: {
  title: string;
  decision: string;
  variant: string;
  legend: string;
}) {
  return (
    <article className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <div className={`report-map report-${variant} min-h-52`}>
        <span className="report-grid" />
        <span className="report-route report-route-one" />
        <span className="report-zone report-zone-one" />
        <span className="report-marker report-marker-one" />
        <div className="absolute bottom-3 left-3 rounded-[6px] border border-white/12 bg-black/54 px-3 py-2 backdrop-blur-xl">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/48">
            {legend}
          </p>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/58">{decision}</p>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0">
          <SceneVisual
            scene="scene-estates"
            label="Aerial landscape with Basalt intelligence overlays"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(245,221,170,0.13),transparent_28%),linear-gradient(180deg,rgba(3,7,6,0.16)_0%,rgba(3,7,6,0.42)_42%,rgba(3,7,6,0.9)_86%,#050807_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050807] to-transparent" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link className="flex items-center" href="/" aria-label="Basalt home">
            <BasaltLogo variant="horizontal" theme="dark" />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/68 md:flex">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <Link href="/our-process" className="transition hover:text-white">Process</Link>
            <Link href="/about" className="transition hover:text-white">About</Link>
          </div>
          <Link
            href="/contact"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 text-sm font-medium text-white shadow-2xl shadow-black/20 backdrop-blur transition hover:bg-white/16 sm:inline-flex"
          >
            Request a Proposal <ArrowRight className="size-4" />
          </Link>
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-5 pb-12 sm:px-8 lg:items-center lg:px-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Premium Land Intelligence
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.94] tracking-normal text-white sm:text-balance sm:text-7xl lg:text-8xl">
              Understand your land. Plan with confidence.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/74 sm:text-xl">
              We help golf clubs, farms and estates make better decisions
              through accurate surveying, digital mapping, terrain analysis and
              intelligent reporting.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#solutions"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
              >
                Explore Our Solutions <ArrowRight className="size-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
              >
                Request a Proposal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="solutions" className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-10 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Solutions
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Two sectors. One land intelligence standard.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Basalt is not a generic drone service. We select the right
              survey tools, analyse the outputs and turn them into practical
              reports for the decisions each site needs to make.
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            {solutions.map((solution, index) => (
              <motion.article
                key={solution.title}
                className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04]"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="chapter-visual min-h-[360px] border-0 shadow-none">
                  <SceneVisual
                    scene={solution.scene}
                    label={`${solution.title} aerial mapping preview`}
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-3xl font-semibold tracking-normal text-white">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white/62">
                    {solution.copy}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {solution.labels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-white/10 bg-black/16 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/50"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={solution.href}
                    className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
                  >
                    {solution.cta} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="technology-section relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="technology-contours absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Shared Capabilities
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                The intelligence behind better land management
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              The appropriate technology is selected based on the site,
              objectives and required level of accuracy. Not every project
              needs every sensor or analysis layer.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability}
                className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/66"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: index * 0.025 }}
              >
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#a6d8bd]" />
                {capability}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Example Deliverables
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Clear outputs for practical decisions.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {deliverables.map((deliverable) => (
              <ReportCard key={deliverable.title} {...deliverable} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Our Process
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                From site challenge to management report.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Every site is different. Proposals are tailored to the area being
              surveyed, the level of accuracy required, the sensors used and the
              analysis and reporting needed.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="survey-step"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <p className="font-mono text-xs text-white/36">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {step.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.055] p-8 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <BasaltLogo variant="horizontal" theme="grey" size="compact" className="text-sm" />
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Request a tailored proposal.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                Tell us about your course, farm or estate and the decisions you
                need to make. We will recommend the right survey and reporting
                approach.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Request a Proposal <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/8 pt-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/golf" className="transition hover:text-white">Golf Course Intelligence</Link>
            <Link href="/farms-estates" className="transition hover:text-white">Farms & Estates</Link>
            <Link href="/our-process" className="transition hover:text-white">Our Process</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
