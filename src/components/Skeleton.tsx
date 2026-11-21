export function SkeletonCard() {
  return (
    <div className="glass overflow-hidden animate-pulse">
      <div className="h-52 bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 bg-white/10 rounded-full" />
        <div className="h-5 w-3/4 bg-white/10 rounded" />
        <div className="h-4 w-full bg-white/10 rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
