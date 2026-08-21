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
  Map,
  Repeat,
  ScanLine,
} from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const problems = [
  {
    icon: Droplets,
    quote: "Where are moisture patterns starting to affect the course?",
  },
  {
    icon: BarChart3,
    quote: "Which turf changes deserve closer inspection this month?",
  },
  {
    icon: FileText,
    quote: "How do we explain course condition clearly to the committee?",
  },
  {
    icon: Map,
    quote: "Can we see greens, tees and fairways in one consistent record?",
  },
  {
    icon: Repeat,
    quote: "What has changed since the last survey?",
  },
];

const solutions = [
  {
    icon: Map,
    title: "Course Baseline",
    copy: "A clear starting point for understanding current course condition.",
    items: [
      "Whole course coverage",
      "Greens, tees and fairways",
      "Current imagery",
      "Condition overview",
    ],
  },
  {
    icon: Droplets,
    title: "Water & Moisture Patterns",
    copy: "Highlight areas where moisture behaviour warrants further investigation.",
    items: [
      "Persistent wet areas",
      "Moisture observations",
      "Drainage concerns",
      "Areas to inspect",
    ],
  },
  {
    icon: BarChart3,
    title: "Turf Insight",
    copy: "Use repeat imagery and multispectral analysis to understand meaningful turf change.",
    items: [
      "Turf condition",
      "Growth variation",
      "Repeat imagery",
      "Inspection focus",
    ],
  },
  {
    icon: CircleDot,
    title: "Condition Monitoring",
    copy: "Track specific areas of concern or interest through the season.",
    items: [
      "Key areas of concern",
      "Monthly observations",
      "Progress notes",
      "Maintenance context",
    ],
  },
  {
    icon: Repeat,
    title: "Change Tracking",
    copy: "Compare surveys and understand what has improved, deteriorated or persisted.",
    items: [
      "Seasonal comparison",
      "Previous surveys",
      "Maintenance impact",
      "Progress tracking",
    ],
  },
  {
    icon: FileText,
    title: "Course Intelligence Reports",
    copy: "Turn survey information into clear visual evidence for club decisions.",
    items: [
      "Visual reports",
      "Committee clarity",
      "Decision support",
      "Practical summaries",
    ],
  },
];

const programmes = [
  {
    icon: Map,
    title: "Establish the baseline",
    summary: "Create the first clear record of current course condition.",
    includes: [
      "Whole course coverage",
      "Greens, tees and fairways",
      "Current imagery",
      "Areas requiring attention",
      "Visual reporting",
    ],
  },
  {
    icon: Repeat,
    title: "Monitor the change",
    summary: "Use regular monitoring to understand what has changed since the last survey.",
    includes: [
      "Monthly comparisons",
      "Seasonal movement",
      "Persistent moisture patterns",
      "Areas improving or deteriorating",
      "Updated visual reports",
    ],
  },
  {
    icon: BarChart3,
    title: "Explain the picture",
    summary: "Bring GIS, planning judgement and software together so technical outputs are easier to use.",
    includes: [
      "Turf condition context",
      "Moisture observations",
      "Clear priorities",
      "Committee-ready language",
      "Course intelligence in one place",
    ],
  },
];

const processSteps = [
  {
    title: "Survey",
    copy: "Capture a consistent view of the course.",
  },
  {
    title: "Compare",
    copy: "Review current imagery against previous surveys.",
  },
  {
    title: "Explain",
    copy: "Turn observations into clear course intelligence.",
  },
  {
    title: "Monitor",
    copy: "Build a more useful record over time.",
  },
];

const reportCards = [
  {
    title: "Course condition map",
    copy: "A clear visual record of greens, tees, fairways and areas needing review.",
    layer: "Course condition",
  },
  {
    title: "Drainage & moisture",
    copy: "Visual evidence of wet areas, moisture patterns and drainage concerns.",
    layer: "Drainage",
  },
  {
    title: "Turf health",
    copy: "Multispectral insight that helps identify areas for closer inspection.",
    layer: "Turf health",
  },
  {
    title: "Repeat comparison",
    copy: "Survey comparisons that show whether course condition is improving over time.",
    layer: "Change",
  },
  {
    title: "Maintenance priorities",
    copy: "Practical next steps for greenkeepers, course managers and committees.",
    layer: "Priorities",
  },
];

const reasons = [
  "See areas improving, deteriorating or persisting",
  "Understand moisture and turf patterns over time",
  "Support greenkeeping insight with visual evidence",
  "Give committees a clearer shared record",
  "Build history rather than a one-off snapshot",
];

const technology = [
  {
    title: "Drone-based monitoring",
    copy: "Repeatable aerial surveys create a consistent view of course condition.",
  },
  {
    title: "Repeat multispectral imagery",
    copy: "Additional imagery helps highlight changes in turf condition for closer review.",
  },
  {
    title: "GIS",
    copy: "Course information is organised into layers that are easier to explore and explain.",
  },
  {
    title: "Planning judgement",
    copy: "Spatial evidence is presented in a way that supports practical club decisions.",
  },
  {
    title: "Software",
    copy: "Visual reports and portal views keep course information in one place.",
  },
];

const experiencePillars = ["Golf", "GIS", "Planning", "Software"];

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
            <a href="#monitoring" className="transition hover:text-white">Monitoring</a>
            <a href="#reports" className="transition hover:text-white">Reports</a>
            <a href="#story" className="transition hover:text-white">Story</a>
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
              Your course. Better understood.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/76 sm:text-xl">
              Basalt combines drone-based monitoring, GIS and clear visual
              reporting to help golf clubs understand course condition and how
              it changes over time.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#how-it-works"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
              >
                Explore how it works <ArrowRight className="size-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
              >
                Talk to us about your course
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="story" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              North Coast of Ireland
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Built around golf. Backed by the right experience.
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-white/66">
              Founded on the North Coast of Ireland, Basalt brings together
              more than two decades of experience across golf technology, GIS,
              environmental and town planning, and software development.
            </p>
            <p className="mt-4 text-base leading-7 text-white/58">
              We are based in one of golf&apos;s most distinctive regions, with
              links courses and coastal landscapes on our doorstep. Golf is not
              simply the market we chose to enter. It has always been part of
              our lives.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {experiencePillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-[#a6d8bd]/20 bg-[#a6d8bd]/10 px-4 py-2 text-sm font-medium text-[#dff4e8]"
                >
                  {pillar}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#a6d8bd]"
            >
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
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
              What Clubs Need To Know
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              A course changes every week. The record should change with it.
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
                Course intelligence designed around golf clubs.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              We combine golf understanding, spatial analysis, planning
              judgement and software so course information becomes clearer,
              easier to compare and easier to explain.
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

      <section id="monitoring" className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                See What&apos;s Changing
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Do not just see your course. See how it changes.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              A one-off survey gives a snapshot. Repeat monitoring creates a
              record, helping clubs understand what has improved, deteriorated
              or stayed persistently difficult across the season.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {programmes.map((programme, index) => {
              const Icon = programme.icon;
              return (
                <motion.article
                  key={programme.title}
                  className="group rounded-[8px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#a6d8bd]/26 hover:bg-white/[0.055]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-[8px] border border-[#a6d8bd]/20 bg-[#a6d8bd]/10">
                      <Icon className="size-5 text-[#a6d8bd]" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {programme.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/62">
                        {programme.summary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {programme.includes.map((item) => (
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

      <section id="how-it-works" className="px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              How It Works
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Survey. Compare. Explain.
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
                Course Intelligence
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Your course information, in one place.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Basalt brings together current imagery, previous surveys, turf
              condition, moisture observations, areas of concern and clear
              visual reports without making the customer experience feel like
              specialist GIS software.
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
              The value is in the comparison.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/62">
              A single image can be useful. A record built over time is more
              powerful. Basalt helps clubs see patterns, monitor areas of
              concern and communicate course change with confidence.
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
              Technology kept in service of the decision.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/62">
              We use drone-based monitoring, repeat imagery, multispectral
              analysis, GIS and software to make course condition easier to
              understand, compare and explain.
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
                Ready to understand your course more clearly?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                Talk to us about condition monitoring, turf change, moisture
                patterns or building a clearer course record over time.
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
            <a href="#monitoring" className="transition hover:text-white">Monitoring</a>
            <a href="#reports" className="transition hover:text-white">Reports</a>
            <a href="#story" className="transition hover:text-white">Story</a>
            <a href="#technology" className="transition hover:text-white">Technology</a>
            <Link href="/about" className="transition hover:text-white">About</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
