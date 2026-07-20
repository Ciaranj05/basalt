"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const products = [
  {
    id: "golf",
    name: "Golf",
    eyebrow: "Basalt Golf",
    headline: "Understand every acre.",
    copy:
      "Spatial intelligence for golf course maintenance, environmental planning and long-term capital decisions.",
    primary: "Explore Basalt Golf",
    secondary: "Discuss your course",
    href: "/golf",
    anchor: "#golf",
    scene: "scene-golf",
  },
  {
    id: "sports",
    name: "Sports Grounds",
    eyebrow: "Basalt Sports Grounds",
    headline: "Understand your grounds before you invest.",
    copy:
      "Accurate aerial mapping, terrain insight and practical reporting for GAA, football, rugby, cricket, hockey and community sports facilities.",
    primary: "Explore Sports Grounds",
    secondary: "Discuss your grounds",
    href: "/sports-grounds",
    anchor: "#sports-grounds",
    scene: "scene-sports",
  },
  {
    id: "estates",
    name: "Estates",
    eyebrow: "Basalt Estates",
    headline: "See the full landscape.",
    copy:
      "Landscape intelligence for land, woodland, access, drainage, infrastructure, environmental assets and long-term estate management.",
    primary: "Explore Basalt Estates",
    secondary: "Discuss your estate",
    href: "/estates",
    anchor: "#estates",
    scene: "scene-estates",
  },
];

const golfOutputs = [
  "Course orthomosaic",
  "Contour and elevation view",
  "Drainage layer",
  "Asset and irrigation mapping",
  "Maintenance observations",
  "Capital planning map",
  "Example Golf report",
];

const sportsOutputs = [
  "Complete grounds capture",
  "Pitch, building and boundary mapping",
  "Terrain and low-point analysis",
  "Indicative surface-water routes",
  "Development overlays",
  "Committee evidence",
  "Repeat progress records",
];

const estateOutputs = [
  "Estate-wide map",
  "Woodland compartments",
  "Roads and access",
  "Water and drainage",
  "Buildings and infrastructure",
  "Solar and renewable assets",
  "Year-on-year change",
];

const platformCapabilities = [
  "Aerial capture",
  "Photogrammetry",
  "Terrain models",
  "LiDAR where applicable",
  "Mapping layers",
  "Measurements",
  "Observations",
  "Reporting",
  "Change tracking",
  "Secure digital records",
];

function SceneVisual({ scene, label }: { scene: string; label: string }) {
  return (
    <div className={`landscape-scene ${scene}`} aria-label={label} role="img">
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

function ReportPreview({
  product,
  title,
  note,
  items,
  variant,
}: {
  product: string;
  title: string;
  note: string;
  items: string[];
  variant: "golf" | "sports" | "estates";
}) {
  return (
    <div className="report-shell">
      <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/42">
            {product}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-white/52">
          {note}
        </span>
      </div>
      <div className="grid gap-4 pt-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={`report-map report-${variant}`}>
          <span className="report-grid" />
          <span className="report-route report-route-one" />
          <span className="report-route report-route-two" />
          <span className="report-zone report-zone-one" />
          <span className="report-zone report-zone-two" />
          <span className="report-marker report-marker-one" />
          <span className="report-marker report-marker-two" />
        </div>
        <div className="grid content-start gap-2">
          {items.slice(0, 6).map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-white/[0.035] p-3 text-sm leading-5 text-white/66"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const activeProduct = products[activeIndex];

  const shouldAutoRotate = useMemo(
    () => !hasInteracted && !reducedMotion && heroInView && tabVisible,
    [hasInteracted, heroInView, reducedMotion, tabVisible],
  );

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.42 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldAutoRotate) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 13000);

    return () => window.clearInterval(interval);
  }, [shouldAutoRotate]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 8) setHasInteracted(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectProduct = (index: number) => {
    setHasInteracted(true);
    setActiveIndex(index);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col overflow-hidden"
        onMouseEnter={() => setHasInteracted(true)}
        onFocusCapture={() => setHasInteracted(true)}
      >
        <div className="absolute inset-0">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute inset-0"
              aria-hidden={activeIndex !== index}
              initial={false}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.4, ease: "easeInOut" }}
            >
              <SceneVisual scene={product.scene} label={`${product.eyebrow} aerial landscape`} />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(245,221,170,0.13),transparent_28%),linear-gradient(180deg,rgba(3,7,6,0.12)_0%,rgba(3,7,6,0.34)_42%,rgba(3,7,6,0.86)_86%,#050807_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050807] to-transparent" />
        </div>

        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Link className="flex items-center" href="/" aria-label="Basalt home">
            <BasaltLogo variant="horizontal" theme="dark" />
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/68 md:flex">
            <a href="#products" className="transition hover:text-white">Products</a>
            <a href="#platform" className="transition hover:text-white">Platform</a>
            <a href="#contact" className="transition hover:text-white">About</a>
          </div>
          <a
            href="#contact"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 text-sm font-medium text-white shadow-2xl shadow-black/20 backdrop-blur transition hover:bg-white/16 sm:inline-flex"
          >
            Discuss Your Site <ArrowRight className="size-4" />
          </a>
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-5 pb-8 sm:px-8 lg:items-center lg:px-10">
          <div className="w-full">
            <motion.div
              key={activeProduct.id}
              className="max-w-4xl"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                {activeProduct.eyebrow}
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.93] tracking-normal text-white sm:text-balance sm:text-7xl lg:text-8xl">
                {activeProduct.headline}
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/74 sm:text-xl">
                {activeProduct.copy}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={activeProduct.href}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
                >
                  {activeProduct.primary} <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#contact"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/16"
                >
                  {activeProduct.secondary}
                </a>
              </div>
            </motion.div>

            <div
              className="mt-12 grid gap-2 rounded-[8px] border border-white/12 bg-black/24 p-2 backdrop-blur-2xl sm:grid-cols-3 lg:max-w-2xl"
              role="tablist"
              aria-label="Basalt products"
            >
              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls={`${product.id}-chapter`}
                  onClick={() => selectProduct(index)}
                  className={`relative rounded-[6px] px-4 py-3 text-left text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-[#b8f2d2] ${
                    activeIndex === index
                      ? "text-white"
                      : "text-white/52 hover:bg-white/[0.045] hover:text-white/82"
                  }`}
                >
                  <span className="block">{product.name}</span>
                  {activeIndex === index ? (
                    <motion.span
                      layoutId="hero-product-indicator"
                      className="absolute inset-x-4 bottom-2 h-px rounded-full bg-white/58 shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="relative bg-[#050807] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div id="golf" className="product-chapter">
            <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">Basalt Golf</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                  The flagship product for course intelligence.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/62 sm:text-lg">
                  Basalt captures the course, builds an accurate map, reveals drainage, contours, assets and observations, then turns the evidence into reports for committees, contractors and stakeholders.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {golfOutputs.slice(0, 6).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white/54">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
                <div className="chapter-visual">
                  <SceneVisual scene="scene-golf" label="Golf course mapped with Basalt intelligence overlays" />
                </div>
              </motion.div>
            </div>
            <div className="mt-6">
              <ReportPreview
                product="Basalt Golf"
                title="Course Intelligence Report"
                note="Sample report"
                variant="golf"
                items={[
                  "Executive summary",
                  "Mapped maintenance observations",
                  "Drainage concerns",
                  "Capital-planning areas",
                  "Environmental considerations",
                  "Before-and-after comparison",
                ]}
              />
            </div>
          </div>

          <div id="sports-grounds" className="product-chapter pt-20 lg:pt-28">
            <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <motion.div className="order-2 lg:order-1" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
                <div className="chapter-visual">
                  <SceneVisual scene="scene-sports" label="Multi-pitch sports grounds mapped with Basalt intelligence overlays" />
                </div>
              </motion.div>
              <motion.div className="order-1 lg:order-2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">Basalt Sports Grounds</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                  Understand your grounds before you invest.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/62 sm:text-lg">
                  Basalt turns aerial survey data into practical maps, measurements and reports clubs can use for maintenance, drainage, development, funding and contractor discussions.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["GAA", "Football", "Rugby", "Cricket", "Hockey", "Community Sport", ...sportsOutputs.slice(0, 3)].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white/54">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sports-grounds" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]">
                    Explore Basalt Sports Grounds <ArrowRight className="size-4" />
                  </Link>
                  <a href="#contact" className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/14">
                    Discuss your grounds
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="mt-6">
              <ReportPreview
                product="Basalt Sports Grounds"
                title="Grounds Evidence Pack"
                note="Sample report"
                variant="sports"
                items={[
                  "Pitch dimensions and orientation",
                  "Access and facility mapping",
                  "Low-point analysis",
                  "Indicative water-flow routes",
                  "Proposed development overlay",
                  "Contractor briefing map",
                ]}
              />
            </div>
            <p className="mt-4 max-w-4xl text-xs leading-5 text-white/42">
              Basalt provides aerial surveying, terrain analysis and visual decision-support information. It does not replace civil engineering, drainage design, geotechnical assessment, planning advice or other regulated professional services.
            </p>
          </div>

          <div id="estates" className="product-chapter pt-20 lg:pt-28">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">Basalt Estates</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                  See the full landscape.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/62 sm:text-lg">
                  Bring land, woodland, water, access, buildings and infrastructure into one clear visual record for better long-term management.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {estateOutputs.slice(0, 6).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white/54">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
                <ReportPreview
                  product="Basalt Estates"
                  title="Estate Intelligence Report"
                  note="Sample report"
                  variant="estates"
                  items={[
                    "Land parcels",
                    "Woodland and vegetation zones",
                    "Access routes",
                    "Buildings and infrastructure",
                    "Water and drainage",
                    "Environmental change areas",
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,242,210,0.1),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">The Basalt Platform</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                One intelligence engine. Three specialist products.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Basalt transforms aerial and spatial data into practical maps, observations and reports for complex outdoor environments.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6">
              <div className="grid gap-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href}
                    className="flex items-center justify-between gap-4 rounded-[6px] border border-white/10 bg-black/16 p-4 transition hover:bg-white/[0.06]"
                  >
                    <span>
                      <span className="block text-base font-semibold text-white">{product.eyebrow}</span>
                      <span className="mt-1 block text-sm leading-5 text-white/50">{product.copy}</span>
                    </span>
                    <ArrowRight className="size-4 text-white/42" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {platformCapabilities.map((capability) => (
                <div key={capability} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm text-white/64">
                  <Layers3 className="size-4 text-[#a6d8bd]" />
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.055] p-8 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <BasaltLogo variant="horizontal" theme="grey" size="compact" className="text-sm" />
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                Bring your landscape into focus.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                Tell us about your course, sports grounds or estate and we will help identify the right Basalt approach.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="site-type">Site type</label>
              <select id="site-type" className="h-12 rounded-full border border-white/14 bg-[#101713] px-5 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]">
                <option>Golf</option>
                <option>Sports Grounds</option>
                <option>Estates</option>
                <option>Other</option>
              </select>
              <a href="mailto:hello@basalt.co?subject=Discuss%20your%20site" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]">
                Discuss your site <ArrowRight className="size-4" />
              </a>
              <Link href="/golf" className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/14">
                Explore Basalt Golf
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/8 pt-8 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/golf" className="transition hover:text-white">Golf</Link>
            <Link href="/sports-grounds" className="transition hover:text-white">Sports Grounds</Link>
            <Link href="/estates" className="transition hover:text-white">Estates</Link>
            <a href="#platform" className="transition hover:text-white">Platform</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
