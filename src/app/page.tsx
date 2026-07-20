"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FileText,
  Flag,
  Map,
  Radar,
  Route,
  ShieldCheck,
  Trees,
  Waves,
} from "lucide-react";

const heroImage = "/images/basalt-golf-coastal-course.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const revealStages = [
  "Landscape",
  "Terrain",
  "Water",
  "Canopy",
  "Change",
  "Intelligence",
];

const intelligenceLayers = [
  {
    label: "Drainage",
    icon: Droplets,
    title: "Drainage Priority",
    area: "Area 7",
    status: "High",
    copy: "Water is collecting in a low corridor after heavy rain.",
    action: "Increase drainage capacity before winter.",
    tone: "cyan",
  },
  {
    label: "Water",
    icon: Waves,
    title: "Surface Water Risk",
    area: "Coastal Pond 3",
    status: "Low",
    copy: "Buffer growth is reducing runoff exposure around the water edge.",
    action: "Keep monitoring through the autumn rainfall cycle.",
    tone: "blue",
  },
  {
    label: "Trees",
    icon: Trees,
    title: "Canopy Change",
    area: "North Boundary",
    status: "Rising",
    copy: "Canopy spread is reducing light and airflow near sensitive turf.",
    action: "Model selective works before committee review.",
    tone: "emerald",
  },
  {
    label: "Fairways",
    icon: Activity,
    title: "Maintenance Pressure",
    area: "Fairway 7",
    status: "High",
    copy: "Recovery is slowing where terrain and traffic overlap.",
    action: "Prioritise works before the next wet period.",
    tone: "amber",
  },
  {
    label: "Greens",
    icon: Flag,
    title: "Condition Signal",
    area: "Green 12",
    status: "Medium",
    copy: "Firmness has moved beyond the preferred range at the approach.",
    action: "Adjust aeration timing for the next high-play window.",
    tone: "emerald",
  },
  {
    label: "Buildings",
    icon: Building2,
    title: "Asset Register",
    area: "Clubhouse Zone",
    status: "Tracked",
    copy: "Hardstanding, access and service areas are aligned to the register.",
    action: "Use as the baseline for future expansion planning.",
    tone: "slate",
  },
];

const platformMetrics = [
  { label: "Course Health", value: "91", unit: "%", trend: "+4.8" },
  { label: "Priorities", value: "14", unit: "", trend: "5 high" },
  { label: "Environmental Score", value: "86", unit: "/100", trend: "+7.1" },
  { label: "Flood Risk", value: "Low", unit: "", trend: "Stable" },
];

const proofTabs = [
  {
    label: "Outcomes",
    icon: CheckCircle2,
    title: "Better decisions, less noise.",
    copy:
      "Basalt helps teams understand every acre, reduce avoidable maintenance, plan investment and protect long-term asset health.",
    items: ["Understand change", "Prioritise work", "Defend investment"],
  },
  {
    label: "Reports",
    icon: FileText,
    title: "Evidence ready for the room.",
    copy:
      "Clear reports connect daily maintenance pressure with long-term planning, so decisions can move from course team to board.",
    items: ["Executive summary", "Risk analysis", "Recommendations"],
  },
  {
    label: "Engine",
    icon: Radar,
    title: "Built for spatial intelligence.",
    copy:
      "The Basalt Platform combines imagery, terrain, weather, asset records and modelling into one calm evidence layer.",
    items: ["LiDAR", "Satellite imagery", "Digital twins"],
  },
];

const productRoadmap = [
  {
    name: "Basalt Golf",
    status: "Available Today",
    icon: Flag,
    copy:
      "Maintenance, environmental and capital planning intelligence for golf clubs.",
  },
  {
    name: "Basalt Solar",
    status: "Coming Soon",
    icon: Activity,
    copy:
      "Landscape intelligence for vegetation, drainage, access and asset monitoring.",
  },
  {
    name: "Basalt Estates",
    status: "Future",
    icon: Trees,
    copy:
      "Landscape, woodland, infrastructure and environmental change intelligence.",
  },
  {
    name: "Basalt Utilities",
    status: "Future",
    icon: Route,
    copy:
      "Corridor, vegetation, drainage, access and infrastructure intelligence.",
  },
];

export default function Home() {
  const [activeLayer, setActiveLayer] = useState(intelligenceLayers[0]);
  const [activeProof, setActiveProof] = useState(proofTabs[0]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <section className="relative flex min-h-screen flex-col justify-between">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.01, x: [0, -18, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(245,221,170,0.13),transparent_28%),linear-gradient(180deg,rgba(3,7,6,0.16)_0%,rgba(3,7,6,0.34)_38%,rgba(3,7,6,0.84)_84%,#050807_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050807] to-transparent" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <a className="flex items-center gap-3" href="#">
            <span className="grid size-9 place-items-center rounded border border-white/22 bg-white/10 backdrop-blur">
              <Radar className="size-4" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.34em] text-white/92">
              Basalt
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#discovery">Discovery</a>
            <a href="#explore">Explore</a>
            <a href="#platform">Platform</a>
            <a href="#landscapes">Landscapes</a>
          </div>
          <a
            href="#contact"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white shadow-2xl shadow-black/20 backdrop-blur transition hover:bg-white/16 sm:inline-flex"
          >
            Book a call <ArrowRight className="size-4" />
          </a>
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-5 pb-20 sm:px-8 lg:items-center lg:px-10 lg:pb-0 lg:pt-20">
          <motion.div
            className="hero-panel min-w-0"
            initial={false}
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-white/70"
            >
              Basalt Golf
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-semibold leading-[0.93] tracking-normal text-white sm:text-balance sm:text-7xl lg:text-8xl"
            >
              Know Every
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>Acre.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="hero-description mt-7 text-pretty text-lg leading-8 text-white/76 sm:text-xl"
            >
              The intelligence platform for understanding outdoor assets,
              launching first with golf.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="hero-actions mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#platform"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8] sm:w-auto"
              >
                Explore the Platform <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16 sm:w-auto"
              >
                Request an Example Report
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="discovery" className="relative border-y border-white/8 bg-[#050807]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Discovery
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">
              See What the Eye Can&apos;t.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              A familiar landscape becomes terrain, water, canopy and change.
            </p>
          </motion.div>

          <motion.div
            className="relative min-h-[440px] overflow-hidden rounded-[8px] border border-white/12 bg-black shadow-[0_44px_150px_rgba(0,0,0,0.52)] sm:min-h-[620px]"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-72"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.02),rgba(5,8,7,0.88)),radial-gradient(circle_at_60%_34%,rgba(184,242,210,0.24),transparent_28%)]" />
            <div className="course-data absolute inset-0 opacity-85" />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(184,242,210,0.52)_1px,transparent_1.8px)] bg-[size:24px_24px] opacity-0"
              whileInView={{ opacity: [0, 0.42, 0.16] }}
              viewport={{ once: true }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />
            <div className="absolute inset-x-5 bottom-6">
              <div className="flex items-center gap-2 overflow-hidden rounded-full border border-white/12 bg-black/24 p-1.5 backdrop-blur-xl">
                {revealStages.map((stage, index) => (
                  <motion.span
                    key={stage}
                    className="h-1.5 flex-1 rounded-full bg-white/14"
                    initial={{ opacity: 0.16 }}
                    whileInView={{ opacity: [0.16, 1, 0.42] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.7 }}
                    title={stage}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/42">
                <span>Landscape</span>
                <span>Intelligence</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="explore" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Exploration
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                Choose a layer. The landscape responds.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/58">
              A product moment, not a product manual.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {intelligenceLayers.map((layer) => (
                <button
                  key={layer.label}
                  onClick={() => setActiveLayer(layer)}
                  className={`flex min-h-12 items-center justify-between rounded-[8px] border px-4 py-3 text-left transition ${
                    activeLayer.label === layer.label
                      ? "border-[#b8f2d2]/42 bg-[#b8f2d2]/12 text-white"
                      : "border-white/10 bg-white/[0.04] text-white/62 hover:border-white/20 hover:text-white"
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

            <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-white/12 bg-[#07100d] sm:min-h-[620px]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-55"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className={`layer-glow layer-${activeLayer.tone}`} />
              <div className="course-lines absolute inset-0" />
              <motion.div
                key={activeLayer.label}
                className="absolute left-[18%] top-[28%] h-28 w-40 rounded-[8px] border border-[#b8f2d2]/34 bg-[#b8f2d2]/14 sm:h-32 sm:w-48"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              />
              <motion.div
                key={`${activeLayer.label}-panel`}
                className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/14 bg-black/50 p-5 backdrop-blur-2xl sm:left-auto sm:w-[390px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42 }}
              >
                <div className="mb-4 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/46">
                      {activeLayer.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {activeLayer.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-[#07110d]">
                    {activeLayer.status}
                  </span>
                </div>
                <p className="text-sm leading-6 text-white/62">
                  {activeLayer.area} · {activeLayer.copy}
                </p>
                <div className="mt-5 rounded-[6px] border border-[#b8f2d2]/18 bg-[#b8f2d2]/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#b8f2d2]">
                    Recommended Action
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white">
                    {activeLayer.action}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="platform"
        className="relative border-y border-white/8 bg-[#050807] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(65,118,89,0.24),transparent_32%),radial-gradient(circle_at_86%_16%,rgba(120,139,189,0.13),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="mb-10 max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              The Basalt Platform
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">
              One calm operating layer.
            </h2>
          </motion.div>

          <motion.div
            className="rounded-[8px] border border-white/12 bg-white/[0.055] p-3 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="rounded-[6px] border border-white/10 bg-[#08100d]/94">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/42">
                    Basalt Command
                  </p>
                  <h3 className="mt-1 text-xl font-medium text-white">
                    Outdoor Asset Intelligence
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Map layer"
                    className="grid size-10 place-items-center rounded border border-white/12 bg-white/7 text-white/72"
                  >
                    <Map className="size-4" />
                  </button>
                  <button
                    aria-label="Priority radar"
                    className="grid size-10 place-items-center rounded border border-white/12 bg-white text-[#07110d]"
                  >
                    <Radar className="size-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 p-3 lg:grid-cols-[1.22fr_0.78fr]">
                <div className="relative min-h-[440px] overflow-hidden rounded-[6px] border border-white/10 bg-[#0a1510]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-46"
                    style={{ backgroundImage: `url(${heroImage})` }}
                  />
                  <div className="asset-map absolute inset-0 opacity-80" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
                  <div className="absolute left-5 top-5 rounded-[6px] border border-white/12 bg-black/38 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/46">
                      Active View
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <Activity className="size-5 text-[#b8f2d2]" />
                      <span className="text-sm text-white/82">
                        Priority scoring and asset register
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-x-5 bottom-5 rounded-[6px] border border-white/12 bg-black/38 p-4 backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between text-xs text-white/46">
                      <span>Historical trend</span>
                      <span>36 month view</span>
                    </div>
                    <div className="flex items-end gap-2">
                      {[32, 46, 41, 59, 62, 74, 68, 83].map((height, index) => (
                        <motion.div
                          key={index}
                          className="flex-1 rounded-t bg-gradient-to-t from-[#315f42] to-[#b8f2d2]"
                          initial={{ height: 0 }}
                          whileInView={{ height }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: index * 0.06 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {platformMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[6px] border border-white/10 bg-white/[0.045] p-4"
                      >
                        <p className="text-sm text-white/52">{metric.label}</p>
                        <div className="mt-4 flex items-end justify-between gap-3">
                          <p className="font-mono text-4xl text-white">
                            {metric.value}
                            <span className="text-lg text-white/48">
                              {metric.unit}
                            </span>
                          </p>
                          <span className="rounded-full bg-[#b8f2d2]/12 px-2 py-1 font-mono text-xs text-[#b8f2d2]">
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[6px] border border-[#b8f2d2]/18 bg-[#b8f2d2]/8 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 size-5 text-[#b8f2d2]" />
                      <p className="text-sm leading-6 text-white/70">
                        Recommendations stay connected to the map, the evidence
                        and the investment plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Value
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Enough proof to keep moving.
            </h2>
          </div>
          <div>
            <div className="mb-4 grid grid-cols-3 gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] p-1.5">
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
              className="min-h-[300px] rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8"
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
                    className="rounded-[6px] border border-white/10 bg-black/20 p-4 text-sm text-white/66"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="landscapes"
        className="relative border-y border-white/8 bg-[#080d0b] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,242,210,0.12),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Roadmap
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                One Platform. Many Landscapes.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Basalt Golf is the first product built on an intelligence engine
              for complex outdoor environments.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {productRoadmap.map((product, index) => (
              <motion.article
                key={product.name}
                className={`relative min-h-[260px] overflow-hidden rounded-[8px] border p-6 ${
                  index === 0
                    ? "border-[#b8f2d2]/34 bg-[#b8f2d2]/10"
                    : "border-white/10 bg-white/[0.045]"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-[6px] border border-white/12 bg-black/24">
                    <product.icon className="size-5 text-[#b8f2d2]" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs ${
                      index === 0
                        ? "bg-white text-[#07110d]"
                        : "bg-white/8 text-white/56"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-white">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/62">
                  {product.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.055] p-8 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Basalt Golf
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                See your course with a new level of confidence.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              {[
                "Book a Discovery Call",
                "Request an Example Report",
                "Become a Pilot Club",
              ].map((action, index) => (
                <a
                  key={action}
                  href="#"
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${
                    index === 0
                      ? "bg-white text-[#07110d] hover:bg-[#dff4e8]"
                      : "border border-white/14 bg-white/8 text-white hover:bg-white/14"
                  }`}
                >
                  {action} <ArrowRight className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
