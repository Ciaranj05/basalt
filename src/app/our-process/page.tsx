import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Our Process | Basalt",
  description:
    "Basalt's four-step land intelligence process: understand, survey, analyse and report.",
};

const steps = [
  {
    title: "Understand",
    copy:
      "We discuss the site, current challenges and decisions the client needs to make.",
  },
  {
    title: "Survey",
    copy:
      "We select the appropriate combination of aerial imagery, RTK, LiDAR, multispectral and ground data.",
  },
  {
    title: "Analyse",
    copy:
      "We process the data into accurate mapping, terrain models, health indicators and management information.",
  },
  {
    title: "Report",
    copy:
      "We deliver clear digital outputs and reports designed for practical use, planning and future comparison.",
  },
];

export default function ProcessPage() {
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
          Request a Proposal <ArrowRight className="size-4" />
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
          Our Process
        </p>
        <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
          Understand your land. Plan with confidence.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
          Basalt turns survey data into practical information through a clear,
          proposal-led process tailored to each site.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:px-8 lg:grid-cols-4 lg:px-10">
        {steps.map((step, index) => (
          <article key={step.title} className="survey-step">
            <p className="font-mono text-xs text-white/36">0{index + 1}</p>
            <h2 className="mt-4 text-xl font-semibold text-white">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{step.copy}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Proposal-led, not fixed-package pricing.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/62">
            Every site is different. Proposals are tailored to the area being
            surveyed, the level of accuracy required, the sensors used and the
            analysis and reporting needed.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Request a Proposal <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
