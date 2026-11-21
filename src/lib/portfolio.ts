// Portfolio helpers. No imports (unit-tested with node --test).

/** "Toate" + every service used by at least one project, sorted (Romanian collation). */
export function serviceFilters(projects: { services: string[] }[]): string[] {
  const set = new Set<string>();
  for (const p of projects) for (const s of p.services ?? []) if (s) set.add(s);
  return ["Toate", ...[...set].sort((a, b) => a.localeCompare(b, "ro"))];
}
