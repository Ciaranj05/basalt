import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "About | Basalt Golf Course Intelligence",
  description:
    "Basalt helps golf clubs make better maintenance, investment and course planning decisions with accurate course intelligence.",
};

const principles = [
  "Built exclusively for golf clubs",
  "Designed for course managers, head greenkeepers and committees",
  "Focused on evidence, planning and long-term course records",
  "Technology used only where it improves the decision",
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
            About Basalt
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Golf course intelligence for better decisions.
          </h1>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-lg leading-8 text-white/68">
            Basalt works exclusively with golf clubs. We help course managers,
            head greenkeepers, general managers and committees understand the
            course before committing to drainage, renovation, irrigation or
            long-term improvement work.
          </p>
          <p className="mt-5 text-base leading-7 text-white/58">
            The deliverable is not a survey for its own sake. It is a clear
            course record, practical evidence and committee-ready reporting that
            helps clubs plan with confidence and preserve institutional
            knowledge year after year.
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
    </main>
  );
}
