import Link from "next/link";
import { Bell, ChevronDown, Menu, UserCircle } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";
import type { Club } from "@/lib/portal/types";

const navItems = [
  "Overview",
  "Course Map",
  "Reports",
  "Course Areas",
  "Findings",
  "Recommendations",
  "Documents",
  "Team",
];

export function PortalShell({
  club,
  active = "Overview",
  children,
}: {
  club: Club;
  active?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050807]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="Basalt home">
              <BasaltLogo variant="horizontal" theme="dark" size="compact" />
            </Link>
            <div className="hidden h-8 w-px bg-white/10 md:block" />
            <Link href={`/clubs/${club.slug}`} className="hidden items-center gap-3 md:flex">
              <span className="flex size-9 items-center justify-center rounded-[6px] border border-white/10 bg-white/[0.06] text-sm font-semibold">
                {club.name.slice(0, 2).toUpperCase()}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{club.name}</span>
                <span className="block text-xs text-white/42">{club.packageName}</span>
              </span>
              <ChevronDown className="size-4 text-white/42" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/64 transition hover:text-white sm:flex"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <button
              type="button"
              className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm text-white/64 transition hover:text-white sm:flex"
            >
              <UserCircle className="size-4" />
              User menu
            </button>
            <button
              type="button"
              className="size-10 rounded-full border border-white/10 bg-white/[0.04] text-white/64 md:hidden"
              aria-label="Open navigation"
            >
              <Menu className="mx-auto size-4" />
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          {navItems.map((item) => {
            const href =
              item === "Overview"
                ? `/clubs/${club.slug}`
                : item === "Reports"
                  ? `/clubs/${club.slug}/reports`
                  : item === "Course Areas"
                    ? `/clubs/${club.slug}/course-areas`
                    : "#";

            return (
              <Link
                key={item}
                href={href}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm transition ${
                  active === item
                    ? "bg-white text-[#07110d]"
                    : "text-white/54 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
    </main>
  );
}
