import { PortalLoadingState } from "@/components/portal/States";

export default function ClubLoading() {
  return (
    <main className="min-h-screen bg-[#050807] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PortalLoadingState />
      </div>
    </main>
  );
}
