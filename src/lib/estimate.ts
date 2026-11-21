// Price estimator helpers. No imports (unit-tested with node --test).

export function parseQty(raw: string): number | null {
  const s = raw.trim().replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function estimateRange(
  min: number | null,
  max: number | null,
  qty: number | null,
): { low: number; high: number } | null {
  if (min == null || qty == null) return null;
  return { low: Math.round(min * qty), high: Math.round((max ?? min) * qty) };
}

export function formatLei(n: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0, useGrouping: "always" }).format(n) + " lei";
}
