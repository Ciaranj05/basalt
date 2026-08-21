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
    <main className="min-h-screen bg-[#fbfaf6] text-[#07110d]">
      <section className="bg-[#050807] text-white">
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

        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-18 pt-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:pb-24 lg:pt-20">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#b8f2d2]">
              Our Story
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
              Built around golf. Backed by the right experience.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              We are Ciaran McGoldrick and Ciaran Lenehan, two lifelong golf
              enthusiasts based on the North Coast of Ireland.
            </p>
          </div>
          <div className="rounded-[8px] border border-white/12 bg-white/[0.055] p-6 shadow-[0_34px_100px_rgba(0,0,0,0.28)] sm:p-8">
            <p className="text-lg leading-8 text-white/72">
              Golf has always been a major part of our lives, and living in one
              of the game&apos;s most distinctive regions means we are surrounded by
              links golf and coastal landscapes that shape how we think about
              courses.
            </p>
            <p className="mt-5 text-base leading-7 text-white/60">
              Our move into this space is about more than a love of the game.
              Between us, our professional backgrounds span golf technology,
              environmental planning, GIS, town and country planning, and
              software development.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {principles.map((principle) => (
                <span
                  key={principle}
                  className="rounded-full border border-[#b8f2d2]/20 bg-[#b8f2d2]/10 px-4 py-2 text-sm font-semibold text-[#dff4e8]"
                >
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1e8] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
              North Coast of Ireland
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              From golf country, for golf clubs.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#314138]/72 lg:justify-self-end">
            Basalt comes from a place where course condition, coastal weather,
            links landscapes and the rhythms of golf are part of everyday life.
            That gives the work a natural connection to the clubs we want to
            help.
          </p>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
              Founders
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              Golf, planning and software experience brought together.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-[8px] border border-[#d8d1c1] bg-white p-6 shadow-[0_24px_70px_rgba(20,28,22,0.08)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
                Ciaran McGoldrick
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-normal text-[#07110d]">
                Golf technology, environmental planning and software.
              </h3>
              <p className="mt-5 text-sm leading-6 text-[#314138]/70">
                Golf has always been a major part of my life, and for more than
                13 years I have worked for a golf technology company, working
                closely with golf clubs and seeing first-hand how technology can
                help them operate, evolve and make better decisions.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#314138]/62">
                My academic background combines a degree in Environmental
                Planning with a Master&apos;s in Software Development. That has given
                me experience across both the physical environment and the
                technology that can make complex information easier to understand
                and use.
              </p>
            </article>

            <article className="rounded-[8px] border border-[#d8d1c1] bg-white p-6 shadow-[0_24px_70px_rgba(20,28,22,0.08)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
                Ciaran Lenehan
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-normal text-[#07110d]">
                Town and country planning, GIS and spatial analysis.
              </h3>
              <p className="mt-5 text-sm leading-6 text-[#314138]/70">
                Ciaran brings more than 10 years of professional experience in
                Town and Country Planning, alongside postgraduate expertise in
                Geographic Information Systems and Town and Country Planning.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#314138]/62">
                His background brings a strong understanding of mapping, spatial
                analysis, land use and how geographical information can be used
                to support better decision-making.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e3d5] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
              Why We Built This
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Golf + GIS + Planning + Software.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#314138]/72">
              Golf courses are complex environments that change continually.
              Weather, moisture, drainage, turf condition and maintenance work
              can all influence how a course performs and presents.
            </p>
          </div>
          <div className="rounded-[8px] border border-[#d8d1c1] bg-[#fbfaf6]/78 p-6 sm:p-8">
            <p className="text-lg leading-8 text-[#314138]/78">
              Our aim is simple: give golf clubs a better way to understand what
              is happening across their course and how it is changing over time.
            </p>
            <p className="mt-5 text-base leading-7 text-[#314138]/66">
              We are not trying to replace the expertise of greenkeepers or
              course managers. Our role is to give them an additional layer of
              information, helping them monitor change, identify patterns and
              communicate what is happening more clearly.
            </p>
            <div className="mt-7 grid gap-3">
              {beliefs.map((belief) => (
                <div key={belief} className="flex items-start gap-3 text-sm leading-6 text-[#314138]/70">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#486754]" />
                  {belief}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050807] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#b8f2d2]">
              Basalt
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-5xl">
              Your course. Better understood.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Talk to us about your course <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
