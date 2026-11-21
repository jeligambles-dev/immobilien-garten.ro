// Price estimator helpers. No imports (unit-tested with node --test).

export const MAX_QTY = 100_000;

/** Accepts "120", "12,5", "12.5" and Romanian thousands ("1.500", "1.500,5"); null if invalid, <= 0 or > MAX_QTY. */
export function parseQty(raw: string): number | null {
  let s = raw.trim().replace(/\s/g, "");
  // dots followed by exactly three digits are thousands separators
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, "");
  s = s.replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) && n > 0 && n <= MAX_QTY ? n : null;
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
