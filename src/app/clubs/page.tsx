import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { demoClub, demoDisclaimer } from "@/lib/portal/demo-data";

export default function ClubSelectorPage() {
  return (
    <PortalShell club={demoClub}>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
          Club Selector
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Select a workspace.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/56">
          Users with one active club membership will be redirected directly to
          their club dashboard once Supabase membership lookup is connected.
        </p>
        <div className="mt-10 rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">
            Demo workspace
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{demoClub.name}</h2>
          <p className="mt-2 text-sm text-white/54">{demoDisclaimer}</p>
          <Link
            href={`/clubs/${demoClub.slug}`}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
          >
            Open workspace <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PortalShell>
  );
}
