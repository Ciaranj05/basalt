import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Our Story | Basalt Golf Course Intelligence",
  description:
    "Meet the founders of Basalt and learn how golf, GIS, planning and software shaped our golf course intelligence platform.",
};

const principles = [
  "Golf technology",
  "Environmental planning",
  "GIS",
  "Town and country planning",
  "Software development",
];

const beliefs = [
  "Greenkeepers and course managers know their course better than anyone.",
  "Repeat monitoring can add clearer evidence to that expertise.",
  "Course information should be easy for managers and committees to understand.",
  "The most useful record is one that shows how the course changes over time.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/16"
        >
          Book a Discovery Call <ArrowRight className="size-4" />
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Our Story
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Built around golf. Backed by the right experience.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            We are Ciaran McGoldrick and Ciaran Lenehan, two lifelong golf
            enthusiasts based on the North Coast of Ireland.
          </p>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-lg leading-8 text-white/68">
            Golf has always been a major part of our lives, and living in one
            of the game&apos;s most distinctive regions means we are surrounded by
            links golf and coastal landscapes that shape how we think about
            courses.
          </p>
          <p className="mt-5 text-base leading-7 text-white/58">
            Our move into this space is about more than a love of the game.
            Between us, our professional backgrounds span golf technology,
            environmental planning, GIS, town and country planning, and
            software development.
          </p>
          <div className="mt-7 grid gap-3">
            {principles.map((principle) => (
              <div key={principle} className="flex items-start gap-3 text-sm leading-6 text-white/64">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#a6d8bd]" />
                {principle}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[#a6d8bd]">
              Ciaran McGoldrick
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white">
              Golf technology, environmental planning and software.
            </h2>
            <p className="mt-5 text-sm leading-6 text-white/62">
              Golf has always been a major part of my life, and for more than
              13 years I have worked for a golf technology company, working
              closely with golf clubs and seeing first-hand how technology can
              help them operate, evolve and make better decisions.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/58">
              My academic background combines a degree in Environmental
              Planning with a Master&apos;s in Software Development. That has given
              me experience across both the physical environment and the
              technology that can make complex information easier to understand
              and use.
            </p>
          </article>

          <article className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[#a6d8bd]">
              Ciaran Lenehan
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white">
              Town and country planning, GIS and spatial analysis.
            </h2>
            <p className="mt-5 text-sm leading-6 text-white/62">
              Ciaran brings more than 10 years of professional experience in
              Town and Country Planning, alongside postgraduate expertise in
              Geographic Information Systems and Town and Country Planning.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/58">
              His background brings a strong understanding of mapping, spatial
              analysis, land use and how geographical information can be used
              to support better decision-making.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Why We Built This
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
            Golf + GIS + Planning + Software.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/62">
            Golf courses are complex environments that change continually.
            Weather, moisture, drainage, turf condition and maintenance work
            can all influence how a course performs and presents.
          </p>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-lg leading-8 text-white/68">
            Our aim is simple: give golf clubs a better way to understand what
            is happening across their course and how it is changing over time.
          </p>
          <p className="mt-5 text-base leading-7 text-white/58">
            We are not trying to replace the expertise of greenkeepers or
            course managers. Our role is to give them an additional layer of
            information, helping them monitor change, identify patterns and
            communicate what is happening more clearly.
          </p>
          <div className="mt-7 grid gap-3">
            {beliefs.map((belief) => (
              <div key={belief} className="flex items-start gap-3 text-sm leading-6 text-white/64">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#a6d8bd]" />
                {belief}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
