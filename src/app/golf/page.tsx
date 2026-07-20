import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Basalt Golf | Spatial Intelligence for Golf Courses",
  description:
    "Basalt Golf turns aerial and spatial data into practical maps, observations and reports for golf course maintenance, environmental planning and capital decisions.",
};

const outputs = [
  "Course orthomosaic",
  "Contour and elevation view",
  "Drainage and water movement layers",
  "Asset and irrigation mapping",
  "Maintenance observations",
  "Capital planning evidence",
  "Committee-ready reporting",
];

export default function GolfPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" product="Golf" theme="dark" />
        </Link>
        <a
          href="mailto:hello@basalt.co?subject=Basalt%20Golf%20enquiry"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/16"
        >
          Discuss your course <ArrowRight className="size-4" />
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Basalt Golf
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Understand every inch.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            Spatial intelligence for golf course maintenance, environmental
            planning and long-term capital decisions.
          </p>
        </div>
        <div className="chapter-visual">
          <div className="landscape-scene scene-golf" role="img" aria-label="Golf course aerial with Basalt overlays">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {outputs.map((output) => (
            <div
              key={output}
              className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/66"
            >
              {output}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
