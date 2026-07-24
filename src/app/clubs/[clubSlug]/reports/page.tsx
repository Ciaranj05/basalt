import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { demoReports, getDemoClubBySlug } from "@/lib/portal/demo-data";

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ clubSlug: string }>;
}) {
  const { clubSlug } = await params;
  const club = getDemoClubBySlug(clubSlug);
  if (!club) notFound();

  return (
    <PortalShell club={club} active="Reports">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
          Reports
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Published course reports.
        </h1>
        <div className="mt-8 grid gap-4">
          {demoReports.map((report) => (
            <article key={report.id} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex size-12 items-center justify-center rounded-[8px] border border-white/10 bg-black/20">
                  <FileText className="size-5 text-[#a6d8bd]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                    Survey date {report.surveyDate} · Version {report.version}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{report.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">{report.summary}</p>
                </div>
                <Link
                  href={`/clubs/${club.slug}/reports/${report.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
                >
                  Read report <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
