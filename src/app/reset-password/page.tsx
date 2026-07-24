import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#050807] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <section className="mt-20 rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Password Reset
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white">
            Reset your portal password.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Enter the email address linked to your Basalt portal account. If the
            account exists, Supabase Auth will send a secure reset link.
          </p>
          <form className="mt-7">
            <label className="block text-sm font-medium text-white" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 h-12 w-full rounded-[6px] border border-white/12 bg-black/20 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]"
            />
            <button
              type="submit"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Send reset link <ArrowRight className="size-4" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
