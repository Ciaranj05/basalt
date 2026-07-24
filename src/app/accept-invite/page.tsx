import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export default function AcceptInvitePage() {
  return (
    <main className="min-h-screen bg-[#050807] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <section className="mt-20 rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Invitation
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white">
            Accept your Basalt invitation.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Portal access is created by invitation only. Invitation token
            validation will be handled by a secure server action backed by
            Supabase Auth in the next implementation stage.
          </p>
          <form className="mt-7 grid gap-5">
            <div>
              <label className="block text-sm font-medium text-white" htmlFor="token">
                Invitation token
              </label>
              <input
                id="token"
                name="token"
                required
                className="mt-2 h-12 w-full rounded-[6px] border border-white/12 bg-black/20 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white" htmlFor="password">
                Create password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 h-12 w-full rounded-[6px] border border-white/12 bg-black/20 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Create account <ArrowRight className="size-4" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
