"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";
import {
  CourseOutputPreview,
  RepeatDateComparison,
} from "@/components/OutputExamples";

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

export default function Home() {
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
              Course Intelligence
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              See your course differently.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#314138]/72">
              Turn survey information into a clear visual picture of course
              condition, with the ability to focus on individual areas and see
              what warrants attention.
            </p>
          </div>
          <CourseOutputPreview />
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
              See what&apos;s changing.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#314138]/70">
              A single survey gives you a snapshot. Repeat monitoring lets you
              compare condition over time and build a clearer record of the
              course.
            </p>
          </div>
          <RepeatDateComparison />
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
