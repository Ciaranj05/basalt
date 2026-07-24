export function PortalEmptyState({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[8px] border border-dashed border-white/14 bg-white/[0.03] p-8 text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/54">{copy}</p>
    </div>
  );
}

export function PortalLoadingState() {
  return (
    <div className="grid gap-4">
      <div className="h-32 animate-pulse rounded-[8px] bg-white/[0.05]" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="h-28 animate-pulse rounded-[8px] bg-white/[0.04]" />
        <div className="h-28 animate-pulse rounded-[8px] bg-white/[0.04]" />
        <div className="h-28 animate-pulse rounded-[8px] bg-white/[0.04]" />
      </div>
    </div>
  );
}
