"use client";

/** One shared request per page load for /api/admin/content (prices, areas, before/after, chatbot). */
let pending: Promise<Record<string, unknown> | null> | null = null;

export function fetchSiteContent(): Promise<Record<string, unknown> | null> {
  if (!pending) {
    pending = fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return pending;
}
