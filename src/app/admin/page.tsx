import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, FileText, Mail, ShieldCheck } from "lucide-react";
import { demoActivity, demoClub, demoReports } from "@/lib/portal/demo-data";

const metrics: Array<[string, string, LucideIcon]> = [
  ["Total active clubs", "1", Building2],
  ["Clubs being onboarded", "1", ShieldCheck],
  ["Draft reports", "0", FileText],
  ["Reports awaiting review", "0", FileText],
  ["Recently published reports", String(demoReports.length), FileText],
  ["Outstanding invitations", "2", Mail],
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
              Basalt Admin
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Customer operations.
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/admin/clubs/new" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d]">
              Create Club <ArrowRight className="size-4" />
            </Link>
            <Link href="/admin/reports" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70">
              Report Builder
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <Icon className="size-5 text-[#a6d8bd]" />
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-white/42">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold text-white">Recently published</h2>
            <div className="mt-4 grid gap-3">
              {demoReports.map((report) => (
                <Link key={report.id} href={`/clubs/${demoClub.slug}/reports/${report.slug}`} className="rounded-[6px] border border-white/10 bg-black/16 p-3 transition hover:bg-white/[0.06]">
                  <p className="text-sm font-semibold text-white">{report.title}</p>
                  <p className="mt-1 text-xs text-white/42">Published {report.publishedAt}</p>
                </Link>
              ))}
            </div>
          </section>
          <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold text-white">Recent administrative activity</h2>
            <div className="mt-4 grid gap-3">
              {demoActivity.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-white/62">{activity.action}</span>
                  <span className="font-mono text-xs text-white/36">{activity.createdAt}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
