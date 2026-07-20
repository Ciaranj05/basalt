"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BasaltLogo } from "@/components/BasaltLogo";
import {
  ArrowRight,
  ChevronRight,
  Droplets,
  FileText,
  Flag,
  Layers3,
  Map,
  Ruler,
  ShieldCheck,
  Trees,
  Waves,
} from "lucide-react";

const heroImage = "/images/basalt-golf-coastal-course.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const courseMoments = [
  {
    label: "Coastline",
    note: "Golden light reveals the full shape of the course.",
    x: "18%",
    y: "31%",
  },
  {
    label: "Fairway 7",
    note: "Subtle contours begin to show how water moves.",
    x: "49%",
    y: "45%",
  },
  {
    label: "Green 12",
    note: "Shade, wear and approach pressure become visible.",
    x: "66%",
    y: "56%",
  },
  {
    label: "Maintenance Zone",
    note: "Daily work connects to long-term investment.",
    x: "78%",
    y: "38%",
  },
];

const revealLayers = [
  "Contours",
  "Drainage",
  "Canopy",
  "Greens",
  "Bunkers",
  "Irrigation",
  "Priority",
];

const processSteps = [
  {
    label: "Capture",
    copy:
      "Aerial imagery, LiDAR and existing course records create one accurate view.",
    marks: ["raw", "survey", "record"],
  },
  {
    label: "Understand",
    copy:
      "Terrain, drainage, canopy, infrastructure and change organise into course signals.",
    marks: ["terrain", "water", "canopy"],
  },
  {
    label: "Act",
    copy:
      "Basalt turns those signals into risks, priorities and practical recommendations.",
    marks: ["risk", "priority", "action"],
  },
];

const intelligenceLayers = [
  {
    label: "Drainage",
    icon: Droplets,
    title: "Drainage Risk",
    area: "Fairway 7",
    copy: "Water is gathering where traffic and low ground overlap.",
    action: "Improve capacity before the winter programme.",
    tone: "cyan",
  },
  {
    label: "Contours",
    icon: Layers3,
    title: "Terrain Movement",
    area: "Approach 12",
    copy: "Subtle fall lines explain persistent soft areas.",
    action: "Use contour evidence before approving works.",
    tone: "slate",
  },
  {
    label: "Canopy",
    icon: Trees,
    title: "Shade Impact",
    area: "North Boundary",
    copy: "Tree spread is reducing light and airflow near turf.",
    action: "Model selective work before committee review.",
    tone: "emerald",
  },
  {
    label: "Water",
    icon: Waves,
    title: "Flood Exposure",
    area: "Stream Corridor",
    copy: "Runoff is concentrating along the low channel.",
    action: "Monitor during autumn rainfall and plan resilience.",
    tone: "blue",
  },
  {
    label: "Greens",
    icon: Flag,
    title: "Greens Performance",
    area: "Green 12",
    copy: "The approach is moving outside the preferred condition range.",
    action: "Adjust aeration timing around high-play windows.",
    tone: "emerald",
  },
  {
    label: "Measure",
    icon: Ruler,
    title: "Capital Area",
    area: "Practice Ground",
    copy: "Measured zones are ready for cost planning and tender detail.",
    action: "Export the area pack for the next meeting.",
    tone: "amber",
  },
];

const proofTabs = [
  {
    label: "Course Team",
    icon: ShieldCheck,
    title: "Know what needs attention first.",
    copy:
      "Daily pressure becomes a clear maintenance order, backed by evidence the whole club can understand.",
    items: ["Drainage", "Wear", "Canopy"],
  },
  {
    label: "Committee",
    icon: FileText,
    title: "Make capital decisions visible.",
    copy:
      "Reports connect what is happening on the course with the cost, timing and reason for action.",
    items: ["Risks", "Priorities", "Recommendations"],
  },
  {
    label: "Course Future",
    icon: Map,
    title: "Protect the course over time.",
    copy:
      "Basalt gives clubs a living record of change, so investment follows the real story of the land.",
    items: ["History", "Trend", "Plan"],
  },
];

export default function Home() {
  const journeyRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState(intelligenceLayers[0]);
  const [activeProof, setActiveProof] = useState(proofTabs[0]);

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.24]);
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-4%", "-7%"]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-2%", "-5%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.08, 0.42, 0.78], [0, 0.42, 0.72]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const revealOpacity = useTransform(scrollYProgress, [0.16, 0.36, 0.78], [0, 1, 1]);
  const insightOpacity = useTransform(scrollYProgress, [0.34, 0.56], [0, 1]);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#050807] text-white">
      <section
        ref={journeyRef}
        className="relative min-h-[100svh] bg-[#050807] md:h-[430vh]"
      >
        <div className="relative h-[100svh] overflow-hidden md:sticky md:top-0 md:h-screen">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage})`,
              scale: imageScale,
              x: imageX,
              y: imageY,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,6,0.12)_0%,rgba(3,7,6,0.18)_35%,rgba(3,7,6,0.78)_100%)]" />
          <div className="morning-mist absolute inset-0" />
          <div className="grass-shadow absolute inset-0" />
          <motion.div
            className="course-data absolute inset-0 mix-blend-screen"
            style={{ opacity: overlayOpacity }}
          />
          <motion.div className="course-contours absolute inset-0" style={{ opacity: revealOpacity }} />

          <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
            <a className="flex items-center" href="#" aria-label="Basalt home">
              <BasaltLogo variant="horizontal" product="Golf" theme="dark" />
            </a>
            <div className="hidden items-center gap-8 text-sm text-white/72 md:flex">
              <a href="#how">How it works</a>
              <a href="#explore">Explore</a>
              <a href="#proof">Reports</a>
            </div>
            <a
              href="#contact"
              className="hidden h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white shadow-2xl shadow-black/20 backdrop-blur transition hover:bg-white/16 sm:inline-flex"
            >
              Book a demo <ArrowRight className="size-4" />
            </a>
          </nav>

          <motion.div
            className="pointer-events-none relative z-10 mx-auto flex h-[calc(100svh-6rem)] max-w-7xl items-end px-5 pb-16 sm:px-8 md:h-[calc(100vh-6rem)] lg:px-10"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="max-w-3xl"
              initial={false}
              animate="visible"
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.p
                variants={fadeUp}
                className="mb-5 text-sm font-medium uppercase tracking-[0.32em] text-white/66"
              >
                Basalt Golf
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-5xl font-semibold leading-[0.93] tracking-normal text-white sm:text-7xl lg:text-8xl"
              >
                See Your Course Differently.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/74 sm:text-xl"
              >
                Basalt Golf helps clubs understand every acre through intelligent
                mapping, terrain analysis and actionable insight.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto hidden max-w-7xl px-10 lg:block"
            style={{ opacity: revealOpacity }}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/48">
              {revealLayers.map((layer, index) => (
                <motion.span
                  key={layer}
                  className="rounded-full border border-white/12 bg-black/18 px-3 py-2 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {layer}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ opacity: insightOpacity }}
          >
            {courseMoments.map((moment, index) => (
              <motion.div
                key={moment.label}
                className="absolute max-w-[15rem]"
                style={{ left: moment.x, top: moment.y }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
              >
                <div className="quiet-pin" />
                <p className="mt-3 text-sm font-semibold text-white">
                  {moment.label}
                </p>
                <p className="mt-1 hidden text-xs leading-5 text-white/58 sm:block">
                  {moment.note}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="how"
        className="relative -mt-px border-y border-white/8 bg-[#050807] px-5 py-14 sm:px-8 lg:px-10 lg:py-18"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid gap-7 lg:grid-cols-[0.38fr_0.62fr] lg:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                How Basalt Works
              </p>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                From course data to confident decisions.
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-5 top-8 hidden h-px w-[calc(100%-2.5rem)] bg-white/12 lg:block" />
              <motion.div
                className="absolute left-5 top-8 hidden h-px bg-white/68 lg:block"
                initial={{ width: 0 }}
                whileInView={{ width: "calc(100% - 2.5rem)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.05, ease: "easeOut" }}
              />
              <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
                {processSteps.map((step, index) => (
                  <motion.article
                    key={step.label}
                    className="relative grid grid-cols-[2.5rem_1fr] gap-3 border-l border-white/10 pl-5 lg:block lg:border-l-0 lg:pl-0"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: index * 0.12, duration: 0.45 }}
                  >
                    <div className="relative z-10 grid size-10 place-items-center rounded-[6px] border border-white/14 bg-[#050807]">
                      <div className={`process-glyph process-glyph-${index + 1}`}>
                        {step.marks.map((mark) => (
                          <span key={mark} />
                        ))}
                      </div>
                    </div>
                    <div className="min-w-0 lg:mt-6">
                      <p className="font-mono text-xs text-white/38">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {step.label}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/58 lg:mt-3">
                        {step.copy}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="explore" className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Explore
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Let the course explain itself.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/58">
              Choose a layer. The landscape stays in view.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[0.31fr_0.69fr]">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {intelligenceLayers.map((layer) => (
                <button
                  key={layer.label}
                  onClick={() => setActiveLayer(layer)}
                  className={`flex min-h-12 items-center justify-between rounded-[8px] border px-4 py-3 text-left transition ${
                    activeLayer.label === layer.label
                      ? "border-[#b8f2d2]/42 bg-[#b8f2d2]/12 text-white"
                      : "border-white/10 bg-white/[0.035] text-white/62 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <layer.icon className="size-4" />
                    {layer.label}
                  </span>
                  <ChevronRight className="hidden size-4 opacity-50 sm:block" />
                </button>
              ))}
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-white/12 bg-[#07100d] sm:min-h-[640px]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-58"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className={`layer-glow layer-${activeLayer.tone}`} />
              <div className="course-lines absolute inset-0" />
              <motion.div
                key={activeLayer.label}
                className="absolute left-[18%] top-[28%] h-28 w-40 rounded-[8px] border border-[#b8f2d2]/34 bg-[#b8f2d2]/12 sm:h-32 sm:w-48"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.42 }}
              />
              <motion.div
                key={`${activeLayer.label}-annotation`}
                className="absolute bottom-5 left-5 right-5 max-w-[25rem] rounded-[8px] border border-white/14 bg-black/42 p-5 backdrop-blur-2xl sm:left-auto"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38 }}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-white/46">
                  {activeLayer.area}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {activeLayer.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  {activeLayer.copy}
                </p>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-white">
                  {activeLayer.action}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="proof"
        className="relative border-y border-white/8 bg-[#060a08] px-5 py-18 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Trust
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Evidence for the people who care for the course.
            </h2>
          </div>
          <div>
            <div className="mb-4 grid grid-cols-3 gap-2 rounded-[8px] border border-white/10 bg-white/[0.035] p-1.5">
              {proofTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveProof(tab)}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-[6px] text-sm font-medium transition ${
                    activeProof.label === tab.label
                      ? "bg-white text-[#07110d]"
                      : "text-white/58 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <tab.icon className="size-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
            <motion.div
              key={activeProof.label}
              className="min-h-[280px] rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-3xl font-semibold tracking-normal text-white">
                {activeProof.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                {activeProof.copy}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {activeProof.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[6px] border border-white/10 bg-black/18 p-4 text-sm text-white/66"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 border-b border-white/8 pb-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <BasaltLogo
              variant="horizontal"
              product="Golf"
              theme="grey"
              size="compact"
              className="text-sm"
            />
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              See what your course has been trying to tell you.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Book a Demo <ArrowRight className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/14"
            >
              Request Example Report
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-white/48 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-white/72">Built on the Basalt Platform.</p>
            <p className="mt-2 max-w-2xl leading-6">
              Basalt Golf is the first product built on a wider spatial
              intelligence platform for understanding complex landscapes.
            </p>
          </div>
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
        </div>
      </section>
    </main>
  );
}
