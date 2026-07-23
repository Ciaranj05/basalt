import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Book a Discovery Call | Basalt",
  description:
    "Book a discovery call with Basalt to discuss course intelligence, sample reporting, monitoring and golf course improvement planning.",
};

const topics = [
  "Drainage evidence",
  "Bunker or tee renovation",
  "Course baseline mapping",
  "Turf performance monitoring",
  "Tree and woodland records",
  "Annual committee reporting",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/62 md:flex">
          <Link href="/#solutions" className="transition hover:text-white">Solutions</Link>
          <Link href="/#reports" className="transition hover:text-white">Reports</Link>
          <Link href="/#technology" className="transition hover:text-white">Technology</Link>
          <Link href="/about" className="transition hover:text-white">About</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Contact
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Book a Discovery Call
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            Speak to Basalt before committing to drainage, bunker work,
            irrigation changes or long-term course improvements.
          </p>
          <a
            href="mailto:hello@basalt.co?subject=Book%20a%20Basalt%20discovery%20call"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Email Basalt <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">
            Useful topics for the first call.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/62">
            A short discovery call helps identify the decision your club needs
            to make and the course intelligence required to support it.
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-black/16 p-3 text-sm leading-5 text-white/64"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
