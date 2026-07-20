"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  Droplets,
  FileText,
  Flag,
  Leaf,
  Map,
  MapPin,
  Mountain,
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

const layerStages = [
  "Aerial imagery",
  "LiDAR point cloud",
  "Digital terrain",
  "Contour mapping",
  "Water-flow",
  "Drainage",
  "Tree canopy",
  "Historical change",
  "Asset model",
];

const intelligenceLayers = [
  {
    label: "Greens",
    icon: Flag,
    title: "Maintenance Priority",
    area: "Green 12",
    status: "Medium",
    copy: "Surface firmness has moved outside the preferred range across the front approach.",
    action: "Adjust aeration schedule before the next high-play period.",
    tone: "emerald",
  },
  {
    label: "Tees",
    icon: MapPin,
    title: "Historical Change",
    area: "Tee Complex 4",
    status: "Stable",
    copy: "Wear pattern has remained consistent, but recovery is slowing on the right-hand markers.",
    action: "Extend rotation plan by two additional positions.",
    tone: "blue",
  },
  {
    label: "Fairways",
    icon: Activity,
    title: "Surface Water Risk",
    area: "Fairway 7",
    status: "High",
    copy: "Surface water naturally accumulates following prolonged rainfall.",
    action: "Increase drainage capacity before winter.",
    tone: "amber",
  },
  {
    label: "Bunkers",
    icon: Mountain,
    title: "Capital Planning",
    area: "Bunker Cluster 15",
    status: "Review",
    copy: "Sand migration and edge movement are creating repeat maintenance demand.",
    action: "Prioritise reconstruction in the next capital cycle.",
    tone: "sand",
  },
  {
    label: "Water",
    icon: Waves,
    title: "Environmental Risk",
    area: "Coastal Pond 3",
    status: "Low",
    copy: "Water edge vegetation is improving and runoff exposure has reduced since spring.",
    action: "Continue buffer growth monitoring through autumn.",
    tone: "blue",
  },
  {
    label: "Drainage",
    icon: Droplets,
    title: "Drainage Priority",
    area: "Area 7",
    status: "High",
    copy: "Subtle terrain channels water into a low-lying maintenance corridor.",
    action: "Increase drainage capacity before winter.",
    tone: "cyan",
  },
  {
    label: "Trees",
    icon: Trees,
    title: "Tree Canopy Growth",
    area: "North Boundary",
    status: "Rising",
    copy: "Canopy spread is starting to reduce light and airflow around two greens.",
    action: "Model selective works before course committee review.",
    tone: "emerald",
  },
  {
    label: "Paths",
    icon: Route,
    title: "Maintenance Priority",
    area: "Route 10",
    status: "Medium",
    copy: "Visitor movement and rainfall are increasing edge breakdown along the approach.",
    action: "Repair edge failure before winter traffic increases.",
    tone: "stone",
  },
  {
    label: "Buildings",
    icon: Building2,
    title: "Asset Register",
    area: "Clubhouse Zone",
    status: "Tracked",
    copy: "Hardstanding, access and service areas are aligned to the current register.",
    action: "Use as baseline for future expansion planning.",
    tone: "slate",
  },
];

const courseMetrics = [
  { label: "Overall Course Health", value: "91", unit: "%", trend: "+4.8" },
  { label: "Maintenance Priorities", value: "14", unit: "", trend: "5 high" },
  { label: "Environmental Health", value: "86", unit: "/100", trend: "+7.1" },
  { label: "Flood Risk", value: "Low", unit: "", trend: "Stable" },
];

const outcomeCards = [
  ["Understand Every Acre", "See condition, pressure and change with confidence."],
  ["Reduce Maintenance Costs", "Focus team time on the areas that will matter most."],
  ["Improve Drainage Decisions", "Plan works around terrain, water movement and evidence."],
  ["Plan Capital Investment", "Give decision-makers clear priorities, trade-offs and timing."],
  ["Monitor Environmental Change", "Track canopy, water, habitat and climate resilience."],
  ["Protect Long-Term Asset Health", "Build a record that improves every season."],
];

const decisionCards = [
  {
    title: "Drainage Priority",
    area: "Area 7",
    severity: "High",
    evidence:
      "Surface water naturally accumulates after prolonged rainfall and delays recovery on adjacent playing corridors.",
    action: "Increase drainage capacity before winter.",
    impact: "Forecast risk reduction: 23%",
  },
  {
    title: "Capital Planning",
    area: "Bunker Cluster 15",
    severity: "Medium",
    evidence:
      "Sand migration and edge movement are creating repeated maintenance demand across the same asset group.",
    action: "Move reconstruction into the next capital cycle.",
    impact: "Avoids recurring seasonal repair cost",
  },
  {
    title: "Environmental Change",
    area: "North Boundary",
    severity: "Review",
    evidence:
      "Canopy spread is reducing light and airflow around sensitive turf and habitat edges.",
    action: "Model selective works before committee review.",
    impact: "Protects long-term course condition",
  },
];

const reportTypes = [
  "Executive Summary",
  "Maintenance Planning",
  "Capital Investment",
  "Environmental Monitoring",
  "Historical Comparisons",
  "Risk Analysis",
  "Recommendations",
];

const environmental = [
  { icon: Trees, label: "Tree Canopy", value: "+12%", copy: "Growth and shade pressure" },
  { icon: Droplets, label: "Water Management", value: "7 zones", copy: "Drainage and irrigation demand" },
  { icon: CloudRain, label: "Flood Risk", value: "Low", copy: "Rainfall response by catchment" },
  { icon: Leaf, label: "Biodiversity", value: "31", copy: "Habitat markers monitored" },
];

const capitalPlan = [
  ["Drainage corridor", "High", "Q4", "£84k"],
  ["Bunker renewal", "Medium", "Q1", "£126k"],
  ["Path resilience", "Medium", "Q2", "£48k"],
  ["Canopy works", "Review", "Q2", "£32k"],
];

const workflow = ["Capture", "Understand", "Monitor", "Recommend", "Improve"];

const technologies = [
  "LiDAR",
  "Drone imagery",
  "Satellite imagery",
  "GIS",
  "Weather data",
  "Artificial intelligence",
  "Machine learning",
  "Digital twins",
];

const productRoadmap = [
  {
    name: "Basalt Golf",
    status: "Available Today",
    icon: Flag,
    copy:
      "Helping golf clubs make better maintenance, environmental and capital planning decisions.",
    signals: ["Course condition", "Drainage", "Capital planning"],
  },
  {
    name: "Basalt Solar",
    status: "Coming Soon",
    icon: Activity,
    copy:
      "Landscape intelligence for utility-scale solar farms, vegetation management, drainage, access routes and asset monitoring.",
    signals: ["Vegetation", "Access", "Asset monitoring"],
  },
  {
    name: "Basalt Estates",
    status: "Future",
    icon: Trees,
    copy:
      "Helping estate owners understand landscapes, woodland, infrastructure and long-term environmental change.",
    signals: ["Woodland", "Infrastructure", "Change"],
  },
  {
    name: "Basalt Utilities",
    status: "Future",
    icon: Route,
    copy:
      "Supporting utility operators with corridor monitoring, vegetation management, drainage, access and infrastructure intelligence.",
    signals: ["Corridors", "Vegetation", "Access"],
  },
];

export default function Home() {
  const [activeLayer, setActiveLayer] = useState(intelligenceLayers[2]);

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(245,221,170,0.13),transparent_28%),linear-gradient(180deg,rgba(3,7,6,0.18)_0%,rgba(3,7,6,0.32)_36%,rgba(3,7,6,0.82)_82%,#050807_100%)]" />
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
            <a href="#decisions">Decisions</a>
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
                href="#reports"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16 sm:w-auto"
              >
                View Example Report
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="discovery" className="relative border-y border-white/8 bg-[#050807]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Hidden Intelligence
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">
              See What the Eye Can&apos;t.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              The course remains beautiful and familiar. Basalt reveals the
              structure beneath it: terrain, water, canopy, history and change.
            </p>
          </motion.div>

          <motion.div
            className="relative min-h-[620px] overflow-hidden rounded-[8px] border border-white/12 bg-black shadow-[0_44px_150px_rgba(0,0,0,0.52)]"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.08),rgba(5,8,7,0.92)),radial-gradient(circle_at_60%_34%,rgba(184,242,210,0.24),transparent_28%)]" />
            <div className="course-data absolute inset-0 opacity-90" />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(184,242,210,0.52)_1px,transparent_1.8px)] bg-[size:24px_24px] opacity-0"
              whileInView={{ opacity: [0, 0.42, 0.18] }}
              viewport={{ once: true }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
            />

            <div className="absolute inset-x-5 bottom-6">
              <div className="flex items-center gap-2 overflow-hidden rounded-full border border-white/12 bg-black/24 p-1.5 backdrop-blur-xl">
                {layerStages.map((stage, index) => (
                  <motion.span
                    key={stage}
                    className="h-1.5 flex-1 rounded-full bg-white/14"
                    initial={{ opacity: 0.18 }}
                    whileInView={{ opacity: [0.18, 1, 0.42] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.11, duration: 0.7 }}
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

      <section id="explore" className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Exploration
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                Explore the asset layer by layer.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/58">
              Select what matters and the map responds. Golf is the first
              expression of a system designed for complex outdoor assets.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {intelligenceLayers.map((layer) => (
                <button
                  key={layer.label}
                  onClick={() => setActiveLayer(layer)}
                  className={`flex items-center justify-between rounded-[8px] border px-4 py-3 text-left transition ${
                    activeLayer.label === layer.label
                      ? "border-[#b8f2d2]/42 bg-[#b8f2d2]/12 text-white"
                      : "border-white/10 bg-white/[0.04] text-white/62 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <layer.icon className="size-4" />
                    {layer.label}
                  </span>
                  <ChevronRight className="size-4 opacity-50" />
                </button>
              ))}
            </div>

            <div className="relative min-h-[600px] overflow-hidden rounded-[8px] border border-white/12 bg-[#07100d]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-55"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className={`layer-glow layer-${activeLayer.tone}`} />
              <div className="course-lines absolute inset-0" />
              <motion.div
                key={activeLayer.label}
                className="absolute left-[18%] top-[28%] h-32 w-48 rounded-[8px] border border-[#b8f2d2]/34 bg-[#b8f2d2]/14"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              />
              <motion.div
                key={`${activeLayer.label}-panel`}
                className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/14 bg-black/48 p-5 backdrop-blur-2xl sm:left-auto sm:w-[390px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42 }}
              >
                <div className="mb-5 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/46">
                      Active Layer
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {activeLayer.label}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-[#07110d]">
                    {activeLayer.status}
                  </span>
                </div>
                <p className="text-sm leading-6 text-white/68">
                  {activeLayer.title} · {activeLayer.area}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {activeLayer.copy}
                </p>
                <div className="mt-5 rounded-[6px] border border-[#b8f2d2]/18 bg-[#b8f2d2]/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#b8f2d2]">
                    Exploration Mode
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white">
                    Toggle layers to compare condition, pressure and change
                    across the same landscape.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="decisions"
        className="border-y border-white/8 bg-[#080d0b] px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Decision Intelligence
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                From hidden signals to practical recommendations.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/58 lg:justify-self-end">
              Exploration shows what is happening. Decision intelligence shows
              what to do next, with evidence clear enough for operational teams
              and boards.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {decisionCards.map((decision, index) => (
              <motion.article
                key={decision.title}
                className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-white/42">
                      {decision.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {decision.area}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-[#07110d]">
                    {decision.severity}
                  </span>
                </div>
                <p className="text-sm leading-6 text-white/62">
                  {decision.evidence}
                </p>
                <div className="mt-6 rounded-[6px] border border-[#b8f2d2]/18 bg-[#b8f2d2]/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#b8f2d2]">
                    Recommended Action
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white">
                    {decision.action}
                  </p>
                </div>
                <p className="mt-5 font-mono text-sm text-white/48">
                  {decision.impact}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="platform"
        className="relative border-y border-white/8 bg-[#050807] px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(65,118,89,0.28),transparent_32%),radial-gradient(circle_at_86%_16%,rgba(120,139,189,0.15),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="mb-10 max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Platform Dashboard
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">
              A complete operating layer for outdoor asset decisions.
            </h2>
          </motion.div>

          <motion.div
            className="rounded-[8px] border border-white/12 bg-white/[0.055] p-3 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
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
                    Championship Course Overview
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

              <div className="grid gap-3 p-3 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="relative min-h-[540px] overflow-hidden rounded-[6px] border border-white/10 bg-[#0a1510]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-48"
                    style={{ backgroundImage: `url(${heroImage})` }}
                  />
                  <div className="asset-map absolute inset-0 opacity-80" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

                  {[
                    "left-[14%] top-[22%] h-32 w-44 border-[#bdf6cf]/35 bg-[#bdf6cf]/18",
                    "right-[16%] top-[27%] h-24 w-36 border-[#ffd27a]/40 bg-[#ffd27a]/18",
                    "bottom-[19%] left-[35%] h-36 w-52 border-[#7bdcff]/34 bg-[#7bdcff]/14",
                  ].map((classes, index) => (
                    <motion.div
                      key={classes}
                      className={`absolute rounded-[6px] border ${classes}`}
                      animate={{ opacity: [0.38, 0.86, 0.38] }}
                      transition={{
                        duration: 3.6 + index * 0.55,
                        repeat: Infinity,
                        delay: index * 0.4,
                      }}
                    />
                  ))}

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
                      <span>Historical trends</span>
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
                  <div className="grid gap-3 sm:grid-cols-2">
                    {courseMetrics.map((metric) => (
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

                  <div className="rounded-[6px] border border-white/10 bg-white/[0.045] p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <p className="text-sm text-white/52">Capital Planning</p>
                      <BarChart3 className="size-4 text-white/52" />
                    </div>
                    <div className="space-y-4">
                      {capitalPlan.slice(0, 3).map(([label, priority, , cost]) => (
                        <div key={label}>
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="text-white/78">{label}</span>
                            <span className="font-mono text-white/42">
                              {priority} · {cost}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#b8f2d2] to-[#7cb7ff]"
                              style={{
                                width:
                                  priority === "High"
                                    ? "82%"
                                    : priority === "Medium"
                                      ? "58%"
                                      : "44%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[6px] border border-[#b8f2d2]/18 bg-[#b8f2d2]/8 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 size-5 text-[#b8f2d2]" />
                      <div>
                        <p className="font-medium text-white">
                          Board-ready recommendation
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          Bring forward fairway drainage on Area 7. Forecast
                          winter risk reduction: 23%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Why Basalt
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            Better outcomes, explained without theatre.
          </h2>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2">
          {outcomeCards.map(([title, copy], index) => (
            <motion.div
              key={title}
              className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <CheckCircle2 className="size-5 text-[#b8f2d2]" />
              <h3 className="mt-6 text-xl font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="reports"
        className="border-y border-white/8 bg-[#09100d] px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.045] p-3">
            <div className="rounded-[6px] bg-[#f4f1e8] p-6 text-[#101410] shadow-2xl shadow-black/30">
              <div className="flex items-start justify-between gap-6 border-b border-black/10 pb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-black/46">
                    Committee Report
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">
                    Championship Course Intelligence
                  </h3>
                </div>
                <FileText className="size-8 text-[#315f42]" />
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["Risk", "Budget", "Priority"].map((item, index) => (
                  <div key={item} className="border-l border-black/12 pl-4">
                    <p className="text-sm text-black/48">{item}</p>
                    <p className="mt-3 font-mono text-3xl">
                      {["-23%", "£290k", "Area 7"][index]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {reportTypes.map((line) => (
                  <div
                    key={line}
                    className="flex items-start gap-3 rounded-[6px] bg-black/[0.045] p-4 text-sm"
                  >
                    <Leaf className="mt-0.5 size-4 text-[#315f42]" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Reports
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Clear enough for the course team. Strong enough for the board.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/62">
              Basalt reports connect daily maintenance pressure with long-term
              investment planning, so committees can make decisions with the
              same evidence as the people managing the course.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Environmental Intelligence
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Monitor the natural systems that shape course performance.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              Tree canopy, water movement, habitat condition and climate
              resilience are treated as long-term assets, not side notes.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {environmental.map((item, index) => (
              <motion.div
                key={item.label}
                className="relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-6"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <div className="absolute -right-8 -top-8 size-28 rounded-full bg-[#b8f2d2]/8 blur-2xl" />
                <item.icon className="size-5 text-[#b8f2d2]" />
                <p className="mt-6 font-mono text-4xl text-white">{item.value}</p>
                <h3 className="mt-3 text-lg font-medium">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#080d0b] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-white/56">Investment Timeline</p>
              <CalendarRange className="size-4 text-white/52" />
            </div>
            <div className="space-y-3">
              {capitalPlan.map(([item, priority, quarter, cost]) => (
                <div
                  key={item}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-[6px] border border-white/8 bg-black/20 p-4 text-sm"
                >
                  <span className="text-white/82">{item}</span>
                  <span className="rounded-full bg-white/8 px-2 py-1 font-mono text-xs text-white/54">
                    {priority}
                  </span>
                  <span className="font-mono text-white">{quarter} · {cost}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Capital Planning
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Turn maintenance pressure into strategic investment.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/62">
              Priority scoring, maintenance forecasting and budget planning help
              clubs defend the right projects at the right time.
            </p>
          </div>
        </div>
      </section>

      <section
        id="landscapes"
        className="relative px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,242,210,0.12),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                The Basalt Platform
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                One Platform. Many Landscapes.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/62 lg:justify-self-end">
              Basalt is designed to understand complex outdoor environments and
              transform spatial intelligence into practical decisions. Basalt
              Golf is the first product built on that engine.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-4">
            {productRoadmap.map((product, index) => (
              <motion.article
                key={product.name}
                className={`group relative min-h-[360px] overflow-hidden rounded-[8px] border p-6 transition ${
                  index === 0
                    ? "border-[#b8f2d2]/34 bg-[#b8f2d2]/10"
                    : "border-white/10 bg-white/[0.045] hover:border-white/20"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="absolute -right-12 -top-12 size-32 rounded-full bg-white/8 blur-3xl transition group-hover:bg-[#b8f2d2]/12" />
                <div className="relative flex h-full flex-col">
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
                  <div className="mt-auto pt-8">
                    <div className="flex flex-wrap gap-2">
                      {product.signals.map((signal) => (
                        <span
                          key={signal}
                          className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/50"
                        >
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Customer Journey
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
            A workflow for better decisions every season.
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {workflow.map((step, index) => (
            <motion.div
              key={step}
              className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <p className="font-mono text-sm text-[#b8f2d2]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-xl font-medium">{step}</h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-[8px] border border-white/10 bg-white/[0.04] p-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Technology
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal sm:text-4xl">
              The technology enables the decision. It is not the point.
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-white/60">
              Basalt combines multiple data sources into one evidence layer,
              designed first for golf and built to support a broader outdoor
              asset intelligence platform over time.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {technologies.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/62"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative px-5 pb-24 pt-4 sm:px-8 lg:px-10"
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
              {["Book a Discovery Call", "Request an Example Report", "Become a Pilot Club"].map(
                (action, index) => (
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
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
