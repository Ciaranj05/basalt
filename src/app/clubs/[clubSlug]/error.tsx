"use client";

import { PortalEmptyState } from "@/components/portal/States";

export default function ClubError() {
  return (
    <main className="min-h-screen bg-[#050807] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PortalEmptyState
          title="We could not load this workspace."
          copy="Please refresh the page or contact Basalt if the issue continues."
        />
      </div>
    </main>
  );
}
