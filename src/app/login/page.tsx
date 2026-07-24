import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const nextPath = searchParams?.next ?? "/clubs";

  return (
    <main className="min-h-screen bg-[#050807] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
              Customer Portal
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] sm:text-6xl">
              Secure access to your course intelligence.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/62">
              Access is invite-only for authorised golf club users and Basalt
              administrators.
            </p>
          </div>
          <form className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <input type="hidden" name="next" value={nextPath} />
            <label className="block text-sm font-medium text-white" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 h-12 w-full rounded-[6px] border border-white/12 bg-black/20 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]"
            />
            <label className="mt-5 block text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 h-12 w-full rounded-[6px] border border-white/12 bg-black/20 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]"
            />
            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8]"
            >
              Sign in <ArrowRight className="size-4" />
            </button>
            <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-white/56">
              <Link href="/reset-password" className="transition hover:text-white">
                Reset password
              </Link>
              <Link href="/accept-invite" className="transition hover:text-white">
                Accept invitation
              </Link>
            </div>
            <p className="mt-6 text-xs leading-5 text-white/42">
              Public registration is disabled. Accounts are created by Basalt
              or an authorised club administrator.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
