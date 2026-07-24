import Link from "next/link";
import { ArrowLeft, CheckCircle2, Eye, ShieldCheck } from "lucide-react";
import { demoReports } from "@/lib/portal/demo-data";

const builderCapabilities = [
  "Create and edit report metadata",
  "Select enabled modules",
  "Reorder report sections",
  "Add structured summaries",
  "Add findings and link course areas",
  "Add recommendations",
  "Upload images and files",
  "Associate map layers",
  "Save drafts",
  "Preview customer view",
  "Publish with explicit protected action",
];

export default function ReportBuilderPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white">
          <ArrowLeft className="size-4" />
          Admin
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
              Report Builder
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Structured report production.
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-white/58 lg:justify-self-end">
            The builder intentionally uses consistent modules rather than a
            free-form page builder, so every report keeps a dependable customer
            presentation.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold text-white">Draft and published reports</h2>
            <div className="mt-4 grid gap-3">
              {demoReports.map((report) => (
                <article key={report.id} className="rounded-[6px] border border-white/10 bg-black/16 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                    {report.status} · Version {report.version}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{report.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/clubs/north-coast-golf-club/reports/${report.slug}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm text-white/70">
                      Preview <Eye className="size-4" />
                    </Link>
                    <button className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm text-white/70">
                      Protected publish <ShieldCheck className="size-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold text-white">Builder foundation</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {builderCapabilities.map((capability) => (
                <div key={capability} className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-black/16 p-3 text-sm leading-5 text-white/62">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                  {capability}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
