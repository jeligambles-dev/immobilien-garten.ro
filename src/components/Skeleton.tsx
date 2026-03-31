export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-green-100 overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 bg-slate-200 rounded-full" />
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
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
