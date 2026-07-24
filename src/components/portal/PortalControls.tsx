"use client";

import type { ReactNode } from "react";

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
