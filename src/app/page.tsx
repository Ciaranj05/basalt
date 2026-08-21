"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Map,
  Repeat,
} from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

const outcomes = [
  {
    icon: Map,
    title: "Understand condition",
    copy: "See course, turf and moisture information more clearly.",
  },
  {
    icon: Repeat,
    title: "See what is changing",
    copy: "Compare surveys and identify areas improving, deteriorating or staying persistent.",
  },
  {
    icon: FileText,
    title: "Explain it clearly",
    copy: "Turn course information into visual evidence for teams, managers and committees.",
  },
];

const processSteps = [
  {
    title: "Survey",
    copy: "Capture a consistent view of the course.",
  },
  {
    title: "Understand",
    copy: "Organise imagery, turf condition and moisture observations.",
  },
  {
    title: "Compare",
    copy: "Review current findings against previous surveys.",
  },
  {
    title: "Monitor",
    copy: "Build a clearer record through the season.",
  },
];

const courseLayers = [
  "Course condition",
  "Turf health",
  "Moisture",
  "Previous survey",
];

const courseMarkers = [
  {
    label: "Green 7",
    note: "Turf change detected",
    position: "left-[28%] top-[32%]",
  },
  {
    label: "12th Fairway",
    note: "Persistent moisture area",
    position: "right-[18%] top-[48%]",
  },
  {
    label: "Green 4",
    note: "Condition improving",
    position: "left-[42%] bottom-[22%]",
  },
];

const months = [
  {
    label: "Apr",
    title: "Baseline established",
    note: "The first survey creates a clear reference point.",
  },
  {
    label: "May",
    title: "Moisture area identified",
    note: "A recurring wet area is marked for closer review.",
  },
  {
    label: "Jun",
    title: "Area monitored",
    note: "The same location is compared against the previous survey.",
  },
  {
    label: "Jul",
    title: "Improvement detected",
    note: "The record shows the area beginning to recover.",
  },
  {
    label: "Aug",
    title: "Condition stable",
    note: "The trend can be explained with a simple visual history.",
  },
];

const founderPillars = ["Golf", "GIS", "Planning", "Software"];

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

function GolfMapPreview() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#d8d1c1] bg-[#07100d] shadow-[0_28px_90px_rgba(20,28,22,0.18)] sm:min-h-[520px]">
      <CourseScene label="Example Basalt report preview showing a golf course with subtle intelligence overlays" />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute left-4 top-4 z-10 max-w-[18rem] rounded-[8px] border border-white/14 bg-[#07100d]/82 p-4 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.24em] text-white/46">
          Example report preview
        </p>
        <h3 className="mt-2 text-xl font-semibold">Course view</h3>
        <div className="mt-4 grid gap-2">
          {courseLayers.map((layer, index) => (
            <div key={layer} className="flex items-center gap-2 text-sm text-white/72">
              <span
                className={`size-2 rounded-full ${
                  index < 2 ? "bg-[#b8f2d2]" : "border border-white/42"
                }`}
              />
              {layer}
            </div>
          ))}
        </div>
      </div>
      {courseMarkers.map((marker) => (
        <div
          key={marker.label}
          className={`absolute z-10 hidden max-w-[11rem] rounded-[8px] border border-white/14 bg-[#07100d]/82 p-3 text-white backdrop-blur-xl sm:block ${marker.position}`}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[#b8f2d2]">
            {marker.label}
          </p>
          <p className="mt-1 text-sm leading-5 text-white/76">{marker.note}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeMonth, setActiveMonth] = useState(months[1]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0">
          <CourseScene label="Coastal golf course aerial with subtle Basalt course intelligence overlays" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050807] to-transparent" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link href="/" aria-label="Basalt home">
            <BasaltLogo variant="horizontal" theme="dark" />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/72 md:flex">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#monitoring" className="transition hover:text-white">Monitoring</a>
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#story" className="transition hover:text-white">Our Story</a>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
          <Link
            href="/contact"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/16 sm:inline-flex"
          >
            Talk to us <ArrowRight className="size-4" />
          </Link>
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-5 pb-12 sm:px-8 lg:items-center lg:px-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-[#b8f2d2]">
              Golf Course Intelligence
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.94] tracking-normal text-white sm:text-balance sm:text-7xl lg:text-8xl">
              Your course. Better understood.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/78 sm:text-xl">
              Drone-based monitoring, GIS and clear visual reporting for golf
              clubs that want to understand course condition and how it changes
              over time.
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

      <section id="solutions" className="bg-[#f4f1e8] px-5 py-18 text-[#07110d] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
              What Basalt Shows You
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Course information you can see, compare and explain.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#314138]/72">
              A visual way to understand course condition, turf change and
              moisture patterns without turning the customer experience into
              specialist GIS software.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {outcomes.map((outcome) => {
                const Icon = outcome.icon;
                return (
                  <article key={outcome.title} className="rounded-[8px] border border-[#d8d1c1] bg-white/58 p-4">
                    <Icon className="size-5 text-[#486754]" />
                    <h3 className="mt-4 text-lg font-semibold">{outcome.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#314138]/68">
                      {outcome.copy}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
          <GolfMapPreview />
        </div>
      </section>

      <section id="how-it-works" className="bg-[#07110d] px-5 py-18 sm:px-8 lg:px-10 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#b8f2d2]">
                How It Works
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                Survey. Understand. Compare. Monitor.
              </h2>
            </div>
            <Link
              href="/golf"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/78 transition hover:text-white"
            >
              Explore the golf service <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
                <p className="font-mono text-xs text-white/34">0{index + 1}</p>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{step.copy}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-white/52">
            Built using drone monitoring, multispectral imagery, GIS and software.
          </p>
        </div>
      </section>

      <section id="monitoring" className="bg-[#fbfaf6] px-5 py-18 text-[#07110d] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
              See What Is Changing
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              One survey shows you the course. Repeat monitoring shows you the story.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#314138]/70">
              A simple history helps answer the questions greenkeepers and
              committees actually ask: is it improving, getting worse, or still
              behaving the same way?
            </p>
          </div>
          <div className="overflow-hidden rounded-[8px] border border-[#d8d1c1] bg-[#f4f1e8] shadow-[0_28px_90px_rgba(20,28,22,0.13)]">
            <div className="report-map report-golf min-h-[300px] border-0 sm:min-h-[360px]">
              <span className="report-grid" />
              <span className="report-zone report-zone-one" />
              <span className="report-zone report-zone-two" />
              <span className="report-marker report-marker-one" />
              <span className="report-marker report-marker-two" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[8px] border border-white/14 bg-[#07100d]/82 p-4 text-white backdrop-blur-xl sm:left-auto sm:max-w-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#b8f2d2]">
                  7th Green
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{activeMonth.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/66">{activeMonth.note}</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1 p-3 sm:p-4">
              {months.map((month) => (
                <button
                  key={month.label}
                  type="button"
                  onClick={() => setActiveMonth(month)}
                  className={`rounded-[6px] px-3 py-3 text-center text-sm font-semibold transition ${
                    activeMonth.label === month.label
                      ? "bg-[#07110d] text-white"
                      : "bg-white/72 text-[#314138]/62 hover:bg-white"
                  }`}
                >
                  {month.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="bg-[#e9e3d5] px-5 py-18 text-[#07110d] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#d8d1c1] bg-[#07100d]">
            <CourseScene label="North Coast inspired links golf landscape with Basalt overlays" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/14 bg-[#07100d]/82 p-5 text-white backdrop-blur-xl sm:right-auto sm:max-w-md">
              <p className="text-xs uppercase tracking-[0.24em] text-[#b8f2d2]">
                North Coast of Ireland
              </p>
              <p className="mt-3 text-lg leading-7 text-white/76">
                Built in a place where golf, coastal landscapes and changing
                conditions are part of everyday life.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
              Why Basalt
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Built around golf.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#314138]/74">
              We are Ciaran McGoldrick and Ciaran Lenehan, based on the North
              Coast of Ireland, a place where golf is part of the landscape.
            </p>
            <p className="mt-4 text-base leading-7 text-[#314138]/66">
              Between us, we bring more than two decades of experience across
              golf technology, GIS, environmental and town planning, and
              software development.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {founderPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-[#486754]/20 bg-white/58 px-4 py-2 text-sm font-semibold text-[#314138]"
                >
                  {pillar}
                </span>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#07110d] transition hover:text-[#486754]"
            >
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#050807] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <BasaltLogo variant="horizontal" theme="grey" size="compact" className="text-sm" />
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Talk to us about your course.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
              Tell us what you are trying to understand: turf change, moisture
              patterns, recurring problem areas or building a clearer course
              record over time.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Start the conversation <ArrowRight className="size-4" />
          </Link>
        </div>
        <footer className="mx-auto mt-14 flex max-w-7xl flex-col gap-5 border-t border-white/8 pt-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#monitoring" className="transition hover:text-white">Monitoring</a>
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#story" className="transition hover:text-white">Our Story</a>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
