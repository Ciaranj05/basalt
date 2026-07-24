"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BasaltLogo } from "@/components/BasaltLogo";
import type { Club } from "@/lib/portal/types";
import { LogoutButton } from "./AuthForms";

const navItems = [
  { label: "Overview", href: (clubSlug: string) => `/clubs/${clubSlug}` },
  { label: "Map", href: (clubSlug: string) => `/clubs/${clubSlug}/map`, requiresMap: true },
  { label: "Course Areas", href: (clubSlug: string) => `/clubs/${clubSlug}/course-areas` },
  { label: "Reports", href: (clubSlug: string) => `/clubs/${clubSlug}/reports` },
] as const;

export function PortalShell({
  club,
  active = "Overview",
  showMapNavigation = false,
  children,
}: {
  club: Club;
  active?: string;
  showMapNavigation?: boolean;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const drawer = document.getElementById("portal-mobile-navigation-panel");
      const focusable = Array.from(
        drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

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
            <LogoutButton />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="size-10 rounded-full border border-white/10 bg-white/[0.04] text-white/64 transition hover:text-white md:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              aria-controls="portal-mobile-navigation"
            >
              <Menu className="mx-auto size-4" />
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8">
          {navItems.filter((item) => !("requiresMap" in item) || showMapNavigation).map((item) => {
            const href = item.href(club.slug);

            return (
              <Link
                key={item.label}
                href={href}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm transition ${
                  active === item.label
                    ? "bg-white text-[#07110d]"
                    : "text-white/54 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Portal navigation"
          id="portal-mobile-navigation"
        >
          <div id="portal-mobile-navigation-panel" className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-[#050807] p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <BasaltLogo variant="horizontal" theme="dark" size="compact" />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="size-10 rounded-full border border-white/10 bg-white/[0.04] text-white/64 transition hover:text-white"
                aria-label="Close navigation"
              >
                <X className="mx-auto size-4" />
              </button>
            </div>
            <nav className="mt-8 grid gap-2" aria-label="Mobile portal navigation">
              {navItems.filter((item) => !("requiresMap" in item) || showMapNavigation).map((item) => {
                const href = item.href(club.slug);

                return (
                  <Link
                    key={item.label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-full px-4 py-3 text-sm transition ${
                      active === item.label
                        ? "bg-white text-[#07110d]"
                        : "text-white/64 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto border-t border-white/10 pt-4">
              <LogoutButton variant="mobile" />
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </main>
  );
}
