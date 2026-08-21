"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";
import {
  CourseOutputPreview,
  RepeatDateComparison,
} from "@/components/OutputExamples";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappCtaHref, whatsappHref } from "@/lib/public-contact";

const clubBenefits = [
  {
    title: "Preserve knowledge",
    copy: "Keep important course history with the club, rather than relying on individual memory.",
  },
  {
    title: "Support investment",
    copy: "Give committees clear visual evidence when prioritising work and considering future expenditure.",
  },
  {
    title: "Track the impact",
    copy: "Compare surveys to understand what changed following maintenance and improvement work.",
  },
  {
    title: "Create continuity",
    copy: "Give future greenkeepers, managers and committee members a clearer record of what came before them.",
  },
];

const solutionAreas = [
  {
    title: "Course Condition",
    copy: "Understand the current state of key areas across the course.",
  },
  {
    title: "Turf Health",
    copy: "Identify meaningful variation and change in turf condition.",
  },
  {
    title: "Moisture & Drainage",
    copy: "Highlight patterns and areas that may warrant further investigation.",
  },
  {
    title: "Repeat Monitoring",
    copy: "Build a clearer picture of how the course changes over time.",
  },
  {
    title: "Survey Comparison",
    copy: "Compare survey dates and track improvement or deterioration.",
  },
  {
    title: "Visual Reporting",
    copy: "Give course teams and committees information they can understand quickly.",
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

function CourseRecordPanel() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#d8d1c1] bg-[#07100d] text-white">
      <Image
        src="/images/marketing/drone-over-links-course.png"
        alt="Survey drone above a links golf course with subtle course intelligence lines"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07100d]/82 via-[#07100d]/10 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/14 bg-[#07100d]/82 p-5 backdrop-blur-xl sm:right-auto sm:max-w-md">
        <p className="text-xs uppercase tracking-[0.24em] text-[#b8f2d2]">
          Course record
        </p>
        <p className="mt-3 text-lg leading-7 text-white/76">
          A golf-specific view of condition, change and survey evidence across
          the course.
        </p>
      </div>
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
            <a href="#record" className="transition hover:text-white">Course Record</a>
            <a href="#monitoring" className="transition hover:text-white">Monitoring</a>
            <a href="#story" className="transition hover:text-white">Our Story</a>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
          <a
            href={whatsappCtaHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="hidden h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/16 sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp us
          </a>
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
                href="#product"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
              >
                See the product <ArrowRight className="size-4" />
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

      <section id="product" className="bg-[#f4f1e8] px-5 py-18 text-[#07110d] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
              Course Intelligence
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              One shared view of your course.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#314138]/72">
              Bring course condition, observations and survey dates into a
              clearer visual record that course teams, managers and committees
              can discuss together.
            </p>
          </div>
          <CourseOutputPreview />
        </div>
      </section>

      <section id="solutions" className="bg-[#fbfaf6] px-5 py-16 text-[#07110d] sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
                Solutions
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                What we help you understand.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-[#314138]/70">
              Clearer information about course condition, change and areas
              worth investigating.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solutionAreas.map((area) => (
              <Link
                key={area.title}
                href="/golf"
                className="group rounded-[8px] border border-[#d8d1c1] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#486754]/28 hover:shadow-[0_20px_54px_rgba(20,28,22,0.08)]"
              >
                <h3 className="text-lg font-semibold text-[#07110d]">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#314138]/68">
                  {area.copy}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#486754]/76 transition group-hover:text-[#486754]">
                  Explore <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="record" className="bg-[#07110d] px-5 py-18 sm:px-8 lg:px-10 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#b8f2d2]">
                Club-Wide Value
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                More than a survey. A record of your course.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62">
              Build a permanent record of course condition, observations and
              change, preserving knowledge, supporting better conversations and
              giving future teams a clearer understanding of the course they
              inherit.
            </p>
          </div>
          <p className="mb-7 max-w-3xl text-balance text-2xl font-semibold leading-tight text-white sm:text-4xl">
            Course knowledge should stay with the club, not disappear when
            people change.
          </p>
          <div className="grid gap-3 md:grid-cols-4">
            {clubBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{benefit.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="monitoring" className="bg-[#fbfaf6] px-5 py-18 text-[#07110d] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
              See What Is Changing
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              From a snapshot to a history.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#314138]/70">
              Each survey captures a moment. Together, they show how your
              course changes over months and years.
            </p>
          </div>
          <RepeatDateComparison />
        </div>
      </section>

      <section id="story" className="bg-[#e9e3d5] px-5 py-18 text-[#07110d] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <CourseRecordPanel />
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
          <a
            href={whatsappCtaHref}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noreferrer" : undefined}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp us
          </a>
        </div>
        <footer className="mx-auto mt-14 flex max-w-7xl flex-col gap-5 border-t border-white/8 pt-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#record" className="transition hover:text-white">Course Record</a>
            <a href="#monitoring" className="transition hover:text-white">Monitoring</a>
            <a href="#story" className="transition hover:text-white">Our Story</a>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
