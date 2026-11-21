// HTML escaping for user input placed into email markup. No imports (unit-tested with node --test).

const MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(v: unknown): string {
  if (v == null) return "";
  return String(v).replace(/[&<>"']/g, (c) => MAP[c]);
}
