import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Basalt Estates | Future Landscape Intelligence Product",
  description:
    "Basalt Estates is a future product concept for mapping land, woodland, water, access, buildings, infrastructure and long-term change across managed estates.",
};

const capabilities = [
  "Land-use mapping",
  "Woodland compartments",
  "Roads, tracks and access",
  "Buildings and structures",
  "Drainage and watercourses",
  "Environmental change areas",
  "Solar and renewable assets",
  "Repeat change monitoring",
];

export default function EstatesPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" product="Estates" theme="dark" />
        </Link>
        <a
          href="mailto:hello@basalt.co?subject=Basalt%20Estates%20enquiry"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/16"
        >
          Discuss your estate <ArrowRight className="size-4" />
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Future product
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            See the full landscape.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            Bring land, woodland, water, access, buildings and infrastructure
            into one clear visual record for better long-term management.
          </p>
        </div>
        <div className="chapter-visual">
          <div className="landscape-scene scene-estates" role="img" aria-label="Managed estate landscape with Basalt overlays">
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

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <div
              key={capability}
              className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/66"
            >
              {capability}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] p-6">
          <ShieldCheck className="mt-1 size-5 shrink-0 text-[#a6d8bd]" />
          <p className="text-sm leading-6 text-white/62">
            Basalt Estates is presented as an illustrative future product
            concept. It does not represent regulated forestry, planning,
            engineering or environmental consultancy services.
          </p>
        </div>
      </section>
    </main>
  );
}
