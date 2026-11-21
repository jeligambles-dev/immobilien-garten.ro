"use client";

import { useEffect, useState } from "react";
import type { PriceRow } from "@/lib/services";
import bundled from "../../../data/site-content.json";

const FALLBACK = (bundled as { services?: PriceRow[] }).services ?? [];

/** Admin-edited prices from /api/admin/content; falls back to the prices bundled at build time. */
export function usePrices(): PriceRow[] {
  // start from the bundled prices so server HTML already shows them (no flash, crawlable)
  const [rows, setRows] = useState<PriceRow[]>(FALLBACK);
  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => setRows(Array.isArray(d?.services) ? d.services : FALLBACK))
      .catch(() => setRows(FALLBACK));
  }, []);
  return rows;
}
