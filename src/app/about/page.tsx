import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Our Story | Basalt Golf Course Intelligence",
  description:
    "Meet the founders of Basalt and learn how golf, GIS, planning and software shaped our golf course intelligence platform.",
};

function CourseScene() {
  return (
    <div
      className="landscape-scene scene-golf"
      role="img"
      aria-label="Coastal links golf landscape"
    >
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

const founderProfiles = [
  {
    name: "Ciaran McGoldrick",
    title: "Golf technology, environmental planning and software",
    copy:
      "Golf has always been a major part of Ciaran's life. For more than 13 years he has worked for a golf technology company, working closely with golf clubs and seeing first-hand how technology can support their operations and decision-making.",
    detail:
      "He holds a degree in Environmental Planning and a Master's in Software Development.",
  },
  {
    name: "Ciaran Lenehan",
    title: "Town and country planning, GIS and spatial analysis",
    copy:
      "Ciaran brings more than 10 years of professional experience in Town & Country Planning, together with postgraduate expertise in Geographic Information Systems and Town & Country Planning.",
    detail:
      "His background brings experience in mapping, spatial analysis, land use and turning geographical information into useful evidence.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#07110d]">
      <section className="relative overflow-hidden bg-[#050807] text-white">
        <div className="absolute inset-0">
          <CourseScene />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#050807] to-transparent" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
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

        <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-7xl items-end px-5 pb-14 pt-16 sm:px-8 lg:px-10 lg:pb-20">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#b8f2d2]">
              Our Story
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
              Built around golf. Backed by the right experience.
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <p className="max-w-lg text-2xl font-semibold leading-9 tracking-normal text-[#07110d] sm:text-3xl sm:leading-10">
            We&apos;re Ciaran McGoldrick and Ciaran Lenehan, two lifelong golf
            enthusiasts based on the North Coast of Ireland.
          </p>
          <div className="max-w-2xl space-y-5 text-base leading-7 text-[#314138]/74">
            <p>
              Golf has always been a major part of our lives. Living in a part
              of the world where links golf, coastline, dunes and natural
              grasses are on our doorstep has only strengthened that connection.
            </p>
            <p>
              But Basalt wasn&apos;t created simply because we love golf.
              Between us, our professional backgrounds span golf technology,
              environmental planning, GIS, town & country planning and software
              development.
            </p>
            <p>
              When we brought those experiences together, the opportunity felt
              natural: use modern mapping, monitoring and technology to give
              golf clubs a clearer understanding of what is happening across
              their course, and how it changes over time. That became Basalt.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e3d5] px-5 py-14 sm:px-8 lg:px-10 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <p className="text-balance text-4xl font-semibold tracking-normal text-[#07110d] sm:text-6xl lg:text-7xl">
            Golf × GIS × Planning × Software
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#314138]/72">
            Between us, these are the worlds we&apos;ve spent our careers
            working in. Basalt brings them together to help golf clubs turn
            course information into something clearer, more visual and easier
            to use.
          </p>
        </div>
      </section>

      <section className="bg-[#fbfaf6] px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
              Meet the Founders
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
              The people behind Basalt.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {founderProfiles.map((profile) => (
              <article
                key={profile.name}
                className="rounded-[8px] border border-[#d8d1c1] bg-white p-6 shadow-[0_24px_70px_rgba(20,28,22,0.07)] sm:p-8"
              >
                <div className="mb-7 flex h-28 items-end overflow-hidden rounded-[6px] bg-[#07110d] p-5 text-white">
                  <p className="text-5xl font-semibold leading-none tracking-normal text-white/88">
                    {profile.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </p>
                </div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#486754]">
                  {profile.name}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-normal text-[#07110d]">
                  {profile.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-[#314138]/70">
                  {profile.copy}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#314138]/62">
                  {profile.detail}
                </p>
              </article>
            ))}
          </div>

          <blockquote className="mx-auto mt-14 max-w-4xl text-balance border-y border-[#d8d1c1] py-10 text-center text-3xl font-semibold leading-tight tracking-normal text-[#07110d] sm:text-5xl">
            We&apos;re not here to tell greenkeepers how to manage their course.
            We&apos;re here to give them better information to work with.
          </blockquote>
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
