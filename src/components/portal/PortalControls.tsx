"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ComingSoonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "primary" | "secondary";
};

export function ComingSoonButton({
  children,
  className = "",
  tone = "secondary",
  ...props
}: ComingSoonButtonProps) {
  const toneClass =
    tone === "primary"
      ? "bg-white/20 text-white/50"
      : "border border-white/12 bg-white/[0.03] text-white/42";

  return (
    <button
      type="button"
      {...props}
      disabled
      aria-disabled="true"
      title="Coming soon"
      className={`${toneClass} cursor-not-allowed ${className}`}
    >
      {children}
      <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white/34">
        Coming soon
      </span>
    </button>
  );
}

export function PrintReportButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`transition hover:bg-white/[0.07] hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}
