export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-gold/10 bg-card">
      <div className="aspect-[4/3] animate-pulse bg-white/5" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-white/5" />
        <div className="h-px w-full bg-gold/10" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-white/5" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
