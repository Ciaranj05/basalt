import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";
import { LogoutButton } from "@/components/portal/AuthForms";
import { requireAuthenticatedUser, resolveLoginDestination } from "@/lib/portal/access";
import { getUserClubCards } from "@/lib/portal/data";

export const dynamic = "force-dynamic";

export default async function ClubSelectorPage() {
  const { supabase, user } = await requireAuthenticatedUser();
  const clubs = await getUserClubCards(supabase, user.id);

  if (clubs.length === 1) {
    const destination = await resolveLoginDestination(supabase, user.id);
    if (destination !== "/clubs") {
      redirect(destination);
    }
  }

  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <header className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" aria-label="Basalt home">
            <BasaltLogo variant="horizontal" theme="dark" size="compact" />
          </Link>
          <LogoutButton />
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
          Club Selector
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
          Select a workspace.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/56">
          Only clubs linked to your authorised Basalt account are shown here.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {clubs.map((club) => (
            <Link
              key={club.id}
              href={`/clubs/${club.slug}`}
              className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                {club.membershipRole?.replaceAll("_", " ")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{club.name}</h2>
              <p className="mt-2 text-sm text-white/54">
                {club.courseName ?? "Course setup pending"}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#a6d8bd]">
                Open workspace <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
          {!clubs.length ? (
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-2xl font-semibold text-white">No active club access.</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Ask your Basalt administrator to confirm your club membership.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
