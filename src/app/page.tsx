"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const products = [
  {
    id: "golf",
    name: "Golf",
    eyebrow: "Golf",
    headline: "Understand Every Inch.",
    copy:
      "Helping golf courses understand, measure and improve every acre through professional spatial intelligence.",
    primary: "Explore Golf",
    secondary: "Discuss Your Course",
    href: "/golf",
    anchor: "#golf",
    scene: "scene-golf",
  },
  {
    id: "sports",
    name: "Sports Grounds",
    eyebrow: "Sports Grounds",
    headline: "Understand Every Inch.",
    copy:
      "Helping sports facilities understand, measure and improve every playing surface through professional spatial intelligence.",
    primary: "Explore Sports Grounds",
    secondary: "Discuss Your Facility",
    href: "/sports-grounds",
    anchor: "#sports-grounds",
    scene: "scene-sports",
  },
  {
    id: "estates",
    name: "Estates",
    eyebrow: "Estates",
    headline: "Understand Every Inch.",
    copy:
      "Helping estates understand, measure and manage land with confidence through professional spatial intelligence.",
    primary: "Explore Estates",
    secondary: "Discuss Your Estate",
    href: "/estates",
    anchor: "#estates",
    scene: "scene-estates",
  },
];

const sectorPanels = [
  {
    product: "Basalt Golf",
    sectionHeading: "Helping Golf Courses Make Better Decisions",
    headline: "Understand Your Course. Plan With Confidence.",
    overview:
      "Basalt gives golf clubs a detailed digital understanding of their course, helping managers plan drainage, measure projects, manage assets and make more informed long-term investment decisions.",
    scene: "scene-golf",
    variant: "golf" as const,
    href: "#contact",
    cta: "Discuss Your Course",
    secondaryHref: "#golf-example-reports",
    secondaryCta: "View Example Reports",
    problems: [
      "Drainage",
      "Bunker remodelling",
      "Earthworks",
      "Irrigation planning",
      "Tree management",
    ],
    deliverables: ["Contours", "Volumes", "Drainage", "Terrain Models"],
    reportTitle: "Course Intelligence Report",
    reportItems: [
      "Drainage",
      "Fairway Levels",
      "Bunker Volumes",
      "Terrain Models",
    ],
  },
  {
    product: "Basalt Sports Grounds",
    sectionHeading: "Helping Sports Facilities Perform Better",
    headline:
      "Aerial mapping and terrain insight for clubs planning maintenance, drainage and facility investment.",
    overview:
      "Basalt creates clear evidence for volunteer committees, funding applications and contractor conversations.",
    scene: "scene-sports",
    variant: "sports" as const,
    href: "/sports-grounds",
    cta: "Explore Sports Grounds",
    secondaryHref: "#contact",
    secondaryCta: "Discuss Your Facility",
    problems: [
      "Waterlogging",
      "Pitch levels",
      "Access routes",
      "Development zones",
      "Progress records",
    ],
    deliverables: [
      "Pitch Mapping",
      "Drainage",
      "Surface Assessment",
      "Maintenance Planning",
    ],
    reportTitle: "Grounds Evidence Pack",
    reportItems: [
      "Pitch Levels",
      "Drainage",
      "Surface Assessment",
      "Maintenance Planning",
    ],
  },
  {
    product: "Basalt Estates",
    sectionHeading: "Helping Estates Understand and Manage Land",
    headline:
      "Landscape intelligence for land, woodland, access, infrastructure and long-term estate management.",
    overview:
      "Basalt turns complex managed landscapes into clear records for planning, monitoring and asset review.",
    scene: "scene-estates",
    variant: "estates" as const,
    href: "/estates",
    cta: "Explore Basalt Estates",
    secondaryHref: "#contact",
    secondaryCta: "Discuss Your Estate",
    problems: [
      "Woodland records",
      "Boundary review",
      "Water management",
      "Access planning",
      "Change monitoring",
    ],
    deliverables: [
      "Woodland Mapping",
      "Access Routes",
      "Boundary Surveys",
      "Water Management",
    ],
    reportTitle: "Estate Intelligence Report",
    reportItems: [
      "Woodland Mapping",
      "Access Routes",
      "Boundary Surveys",
      "Water Management",
    ],
  },
];

const golfQuestions = [
  {
    question: "Why is this fairway always wet?",
    copy:
      "Map low points, slopes and surface-water flow to understand where drainage improvements may have the greatest impact.",
  },
  {
    question: "Where should new drainage be installed?",
    copy:
      "Use terrain and flow analysis to support drainage design before excavation begins.",
  },
  {
    question: "How much material will this project require?",
    copy:
      "Calculate areas and volumes for bunker renovation, tee construction, reshaping and earthworks.",
  },
  {
    question: "Are the proposed levels and works correct?",
    copy:
      "Compare existing, proposed and completed surfaces to support project planning and contractor verification.",
  },
  {
    question: "Where should we invest first?",
    copy:
      "Bring course conditions, maintenance priorities and proposed projects together to support capital planning and committee decisions.",
  },
  {
    question: "How has the course changed over time?",
    copy:
      "Compare surveys to monitor construction, erosion, vegetation, drainage works and course development.",
  },
];

const golfValueThemes = [
  {
    title: "Drainage and Water Management",
    copy:
      "Understand ground levels, low points, flow routes, catchments and areas vulnerable to standing water.",
    labels: [
      "Fairway drainage",
      "Bunker flooding",
      "Surface-water flow",
      "Low-point mapping",
    ],
  },
  {
    title: "Course Projects and Earthworks",
    copy:
      "Plan and measure bunker renovations, tee construction, fairway reshaping and other capital works with greater confidence.",
    labels: [
      "Cut-and-fill analysis",
      "Material volumes",
      "Existing versus proposed levels",
      "Contractor verification",
    ],
  },
  {
    title: "Course Assets and Infrastructure",
    copy:
      "Create a structured digital record of the physical assets that support the operation of the course.",
    labels: [
      "Drains and culverts",
      "Irrigation assets",
      "Paths and bridges",
      "Buildings and course furniture",
    ],
  },
  {
    title: "Long-Term Course Management",
    copy:
      "Build a permanent record that supports maintenance planning, environmental management and future investment.",
    labels: [
      "Tree and canopy monitoring",
      "Habitat and watercourse mapping",
      "Change tracking",
      "Capital planning",
    ],
  },
];

const golfReportOutputs = [
  {
    name: "High-resolution course map",
    copy: "Creates a clear visual baseline of the course and surrounding assets.",
  },
  {
    name: "Terrain and contour model",
    copy: "Shows levels and landform so course teams can understand the ground.",
  },
  {
    name: "Slope analysis",
    copy: "Highlights gradients that influence maintenance, playability and works.",
  },
  {
    name: "Surface-water flow map",
    copy: "Shows how water is likely to move across the terrain and where it may collect.",
  },
  {
    name: "Drainage assessment",
    copy: "Supports drainage planning by linking wet areas with terrain information.",
  },
  {
    name: "Cut-and-fill calculation",
    copy: "Estimates the material that may need to be removed, added or redistributed.",
  },
  {
    name: "Volume measurement",
    copy: "Measures project quantities for bunkers, tees, reshaping and earthworks.",
  },
  {
    name: "Digital asset register",
    copy: "Creates a structured record of key course infrastructure and its location.",
  },
  {
    name: "Change-over-time comparison",
    copy: "Shows how selected areas have changed between surveys.",
  },
];

const golfBenefits = [
  {
    title: "Plan With Confidence",
    copy: "Understand the course before committing to work.",
  },
  {
    title: "Reduce Uncertainty",
    copy: "Replace assumptions with measurable site information.",
  },
  {
    title: "Support Investment Decisions",
    copy: "Give committees and stakeholders clear visual evidence.",
  },
  {
    title: "Create a Permanent Record",
    copy: "Retain a digital reference that can be revisited and compared over time.",
  },
];

const surveySteps = [
  {
    title: "Plan",
    copy:
      "We define the site boundaries, flight paths and positioning requirements to ensure complete and consistent coverage.",
  },
  {
    title: "Capture",
    copy:
      "The site is scanned from the air using professional LiDAR, imaging and positioning technology.",
  },
  {
    title: "Process",
    copy:
      "The captured data is converted into point clouds, terrain models, mapping layers and high-resolution imagery.",
  },
  {
    title: "Analyse",
    copy:
      "The processed data is transformed into practical measurements, observations, reports and digital records.",
  },
];

const technologyCards = [
  {
    title: "LiDAR Mapping",
    copy:
      "Uses laser scanning to capture highly detailed terrain and surface information beyond what aerial photography alone can provide.",
  },
  {
    title: "RTK Positioning",
    copy:
      "Provides precise positioning throughout the survey to ensure reliable spatial data.",
  },
  {
    title: "Aerial Imaging",
    copy:
      "Captures high-resolution imagery that complements LiDAR data and provides rich visual context.",
  },
  {
    title: "Digital Twin",
    copy:
      "Creates a permanent digital representation of your site that can be measured, monitored and compared over time.",
  },
];

const measurementItems = [
  "Ground levels",
  "Slopes and gradients",
  "Drainage patterns",
  "Surface areas",
  "Volumes",
  "Earthworks",
  "Vegetation",
  "Access routes",
  "Infrastructure",
  "Fairways and playing surfaces",
  "Estate assets",
  "Solar site conditions",
];

const benefits = [
  {
    title: "Make Better Decisions",
    copy:
      "Move beyond visual inspection with accurate site information that supports planning, maintenance and capital investment.",
    variant: "decision",
  },
  {
    title: "Save Time and Reduce Uncertainty",
    copy:
      "Capture and review detailed site information without relying solely on repeated manual inspections and fragmented records.",
    variant: "time",
  },
  {
    title: "Create a Permanent Digital Record",
    copy:
      "Every survey becomes a secure digital record that can be revisited, measured and compared as the site changes over time.",
    variant: "record",
  },
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

function SurveyGlyph({ index }: { index: number }) {
  return (
    <div className={`survey-glyph survey-glyph-${index + 1}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasSelectedSector, setHasSelectedSector] = useState(false);
  const [activeGolfOutput, setActiveGolfOutput] = useState(golfReportOutputs[0]);
  const [heroInView, setHeroInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const activeProduct = products[activeIndex];
  const activeSector = sectorPanels[activeIndex];

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
    setHasSelectedSector(true);
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
            <a href="#products" className="transition hover:text-white">Sectors</a>
            <a href="#reports" className="transition hover:text-white">Reports</a>
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
                Basalt
              </p>
              <div className="mt-5 max-w-3xl">
                <p className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
                  Choose Your Sector
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
                  Select the sector most relevant to you to see how Basalt helps
                  different organisations understand, measure and manage outdoor
                  assets.
                </p>
              </div>

              <div
                className="mt-6 grid gap-1 rounded-[8px] border border-white/14 bg-black/28 p-1.5 shadow-2xl shadow-black/18 backdrop-blur-2xl sm:grid-cols-3 lg:max-w-2xl"
                role="tablist"
                aria-label="Choose your sector"
              >
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    aria-controls="sector-panel"
                    onClick={() => selectProduct(index)}
                    className={`relative min-h-12 rounded-[6px] px-4 py-3 text-center text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-[#b8f2d2] ${
                      activeIndex === index
                        ? "text-[#07110d]"
                        : "text-white/58 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    {activeIndex === index ? (
                      <motion.span
                        layoutId="hero-sector-pill"
                        className="absolute inset-0 rounded-[6px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.2)]"
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    ) : null}
                    <span className="relative z-10">{product.name}</span>
                  </button>
                ))}
              </div>

              {!hasSelectedSector ? (
                <motion.p
                  className="mt-3 text-sm text-white/46"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Select a sector to see tailored solutions.
                </motion.p>
              ) : null}

              <p className="mt-6 text-sm uppercase tracking-[0.28em] text-white/50">
                {activeProduct.eyebrow}
              </p>
              <h1 className="mt-3 text-5xl font-semibold leading-[0.93] tracking-normal text-white sm:text-balance sm:text-7xl lg:text-8xl">
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
          </div>
        </div>
      </section>

      <section id="products" className="relative bg-[#050807] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Selected Sector
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                {activeSector.sectionHeading}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              The sector you choose in the hero shapes the examples below, while
              the same Basalt survey platform powers the entire page.
            </p>
          </div>

          <motion.div
            id="sector-panel"
            key={activeSector.product}
            className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="chapter-visual">
              <SceneVisual
                scene={activeSector.scene}
                label={`${activeSector.product} mapped with Basalt intelligence overlays`}
              />
            </div>

            <div className="grid gap-4">
              <div className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-7">
                <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                  {activeSector.product}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                  {activeSector.headline}
                </h3>
                <p className="mt-5 text-base leading-7 text-white/62">
                  {activeSector.overview}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={activeSector.href}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
                  >
                    {activeSector.cta} <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href={activeSector.secondaryHref}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white transition hover:bg-white/14"
                  >
                    {activeSector.secondaryCta}
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[8px] border border-white/10 bg-black/16 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                    Typical challenges solved
                  </p>
                  <div className="mt-4 grid gap-2">
                    {activeSector.problems.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-5 text-white/62">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[8px] border border-white/10 bg-black/16 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                    Key deliverables
                  </p>
                  <div className="mt-4 grid gap-2">
                    {activeSector.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-5 text-white/62">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <ReportPreview
                product={activeSector.product}
                title={activeSector.reportTitle}
                note="Example report"
                variant={activeSector.variant}
                items={activeSector.reportItems}
              />
            </div>
          </motion.div>

          {activeSector.variant === "golf" ? (
            <motion.div
              className="mt-18 space-y-18 lg:mt-24 lg:space-y-24"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <section>
                <div className="mb-10 max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                    Questions We Help Golf Clubs Answer
                  </p>
                  <p className="mt-5 text-base leading-7 text-white/62">
                    The value of a Basalt survey is not simply the data
                    captured. It is the practical questions that data helps your
                    club answer.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {golfQuestions.map((item, index) => (
                    <motion.article
                      key={item.question}
                      className="golf-question-card"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45, delay: index * 0.04 }}
                    >
                      <div className="golf-card-visual">
                        <span />
                        <span />
                        <span />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-white">
                        {item.question}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/60">
                        {item.copy}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-10 max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                    A Complete View of Your Golf Course
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {golfValueThemes.map((theme, index) => (
                    <motion.article
                      key={theme.title}
                      className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                    >
                      <h3 className="text-2xl font-semibold text-white">
                        {theme.title}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-white/60">
                        {theme.copy}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {theme.labels.map((label) => (
                          <span
                            key={label}
                            className="rounded-full border border-white/10 bg-black/16 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/50"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>

              <section id="golf-example-reports">
                <div className="mb-10 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                      What Your Club Can Receive
                    </p>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
                      Outputs tailored to the decision.
                    </h2>
                  </div>
                  <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
                    Outputs are tailored to the questions your club needs
                    answered and the decisions being made.
                  </p>
                </div>

                <div className="golf-output-shell">
                  <motion.div
                    key={activeGolfOutput.name}
                    className="report-map report-golf"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="report-grid" />
                    <span className="report-route report-route-one" />
                    <span className="report-route report-route-two" />
                    <span className="report-zone report-zone-one" />
                    <span className="report-zone report-zone-two" />
                    <span className="report-marker report-marker-one" />
                    <span className="report-marker report-marker-two" />
                    <div className="absolute inset-x-4 bottom-4 rounded-[6px] border border-white/12 bg-black/46 p-4 backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                        Example output
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {activeGolfOutput.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/64">
                        {activeGolfOutput.copy}
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid content-start gap-2">
                    {golfReportOutputs.map((output) => (
                      <button
                        key={output.name}
                        type="button"
                        onClick={() => setActiveGolfOutput(output)}
                        className={`rounded-[6px] border p-3 text-left text-sm transition ${
                          activeGolfOutput.name === output.name
                            ? "border-white/24 bg-white/10 text-white"
                            : "border-white/10 bg-white/[0.035] text-white/58 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {output.name}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                    Better Information for Better Course Decisions
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {golfBenefits.map((benefit) => (
                      <div key={benefit.title}>
                        <h3 className="text-lg font-semibold text-white">
                          {benefit.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-white/58">
                          {benefit.copy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : null}

          <p className="mt-14 text-sm leading-6 text-white/42 lg:mt-18">
            The questions change by sector. The technology behind every Basalt
            survey remains the same.
          </p>
        </div>
      </section>

      <section className="technology-section relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(184,242,210,0.08),transparent_28%),radial-gradient(circle_at_76%_28%,rgba(124,183,255,0.07),transparent_26%)]" />
        <div className="technology-contours absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Survey Technology
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                The Technology Behind Every Survey
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Every Basalt survey combines professional drone technology, LiDAR
              and RTK positioning to create a detailed digital representation
              of your site.
            </p>
          </motion.div>

          <div className="relative mb-8">
            <div className="survey-timeline-line hidden lg:block" />
            <motion.div
              className="survey-timeline-progress hidden lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="grid gap-4 lg:grid-cols-4">
              {surveySteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  className="survey-step"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 lg:block">
                    <div className="survey-glyph-shell">
                      <SurveyGlyph index={index} />
                    </div>
                    <div className="min-w-0 lg:mt-6">
                      <p className="font-mono text-xs text-white/36">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        {step.copy}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mb-14 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {technologyCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="technology-card-mark">
                  <span />
                  <span />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  {card.copy}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="rounded-[8px] border border-white/10 bg-black/16 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                What the Survey Can Reveal
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {measurementItems.map((item, index) => (
                  <motion.div
                    key={item}
                    className="measurement-chip"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: index * 0.025 }}
                  >
                    <span className="measurement-icon" aria-hidden="true">
                      <span />
                    </span>
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                  Why LiDAR?
                </p>
                <div className="mt-6 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
                  <div className="lidar-comparison">
                    <div>
                      <span>Aerial image</span>
                    </div>
                    <div>
                      <span>Terrain model</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold leading-tight text-white">
                      Traditional aerial photography shows what a site looks
                      like.
                    </p>
                    <p className="mt-4 text-base leading-7 text-white/62">
                      LiDAR reveals its shape, levels and surface features,
                      providing the information needed to measure, analyse and
                      monitor change over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              What This Means for You
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
              Clarity for planning, maintenance and investment.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/62">
              Better information leads to better planning, maintenance and
              investment decisions.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                className="benefit-panel"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className={`benefit-preview benefit-${benefit.variant}`}>
                  <span />
                  <span />
                  <span />
                </div>
                <h3 className="mt-7 text-2xl font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/60">
                  {benefit.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="reports" className="relative px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
                Reports and Deliverables
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal sm:text-6xl">
                From Survey to Practical Insight
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62 lg:justify-self-end">
              Basalt turns complex spatial data into clear maps, measurements,
              observations and reports that can be used by managers, committees,
              consultants and contractors.
            </p>
          </div>

          <motion.div
            key={`${activeSector.product}-reports`}
            className="report-insight-shell"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
          >
            <div className={`report-map report-${activeSector.variant}`}>
              <span className="report-grid" />
              <span className="report-route report-route-one" />
              <span className="report-route report-route-two" />
              <span className="report-zone report-zone-one" />
              <span className="report-zone report-zone-two" />
              <span className="report-marker report-marker-one" />
              <span className="report-marker report-marker-two" />
            </div>
            <div className="grid content-start gap-2">
              {activeSector.reportItems.map((output) => (
                <div
                  key={output}
                  className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-white/[0.035] p-3 text-sm leading-5 text-white/66"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                  {output}
                </div>
              ))}
            </div>
          </motion.div>
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
            <a href="#reports" className="transition hover:text-white">Reports</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
