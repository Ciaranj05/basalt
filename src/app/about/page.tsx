import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "About | Basalt",
  description:
    "Basalt is a premium land intelligence and digital mapping consultancy for golf clubs, farms and estates.",
};

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
          Request a Proposal <ArrowRight className="size-4" />
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            About Basalt
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            A land intelligence consultancy for complex outdoor assets.
          </h1>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-lg leading-8 text-white/68">
            Basalt helps land-based organisations understand the places they
            manage. We use professional surveying, digital mapping, terrain
            analysis and intelligent reporting to support better planning,
            maintenance and investment decisions.
          </p>
          <p className="mt-5 text-base leading-7 text-white/58">
            Our work begins with golf clubs, farms and estates because these
            environments combine landform, water, vegetation, infrastructure
            and long-term change. The technology matters, but the outcome is
            practical information that can be used by managers, committees,
            owners and advisers.
          </p>
        </div>
      </section>
    </main>
  );
}
