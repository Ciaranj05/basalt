import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Request a Proposal | Basalt",
  description:
    "Request a tailored Basalt proposal for golf course intelligence, farm mapping or estate land management.",
};

const proposalFactors = [
  "Area being surveyed",
  "Required level of accuracy",
  "Sensors and data sources needed",
  "Analysis and reporting requirements",
  "Repeat monitoring or comparison needs",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/62 md:flex">
          <Link href="/golf" className="transition hover:text-white">Golf</Link>
          <Link href="/farms-estates" className="transition hover:text-white">Farms & Estates</Link>
          <Link href="/our-process" className="transition hover:text-white">Process</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Contact
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Request a Proposal
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            Tell us about your course, farm or estate and the decisions you need
            to make. We will recommend the right survey, analysis and reporting
            approach.
          </p>
          <a
            href="mailto:hello@basalt.co?subject=Request%20a%20Basalt%20proposal"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Email Basalt <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">
            Every proposal is tailored.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Basalt does not display fixed pricing at this stage because each
            site, objective and reporting requirement is different.
          </p>
          <div className="mt-6 grid gap-2">
            {proposalFactors.map((factor) => (
              <div
                key={factor}
                className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-black/16 p-3 text-sm leading-5 text-white/64"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                {factor}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
