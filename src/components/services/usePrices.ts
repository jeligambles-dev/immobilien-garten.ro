"use client";

import { useEffect, useState } from "react";
import type { PriceRow } from "@/lib/services";
import bundled from "../../../data/site-content.json";
import { fetchSiteContent } from "../siteContent";

const FALLBACK = (bundled as { services?: PriceRow[] }).services ?? [];

/** Admin-edited prices from /api/admin/content; falls back to the prices bundled at build time. */
export function usePrices(initial?: PriceRow[]): PriceRow[] {
  // start from server-provided (admin) prices, else the bundled ones, so server HTML already shows them
  const [rows, setRows] = useState<PriceRow[]>(initial ?? FALLBACK);
  useEffect(() => {
    if (initial) return; // server already rendered the current admin prices
    fetchSiteContent().then((d) => {
      if (Array.isArray(d?.services)) setRows(d.services as PriceRow[]);
    });
  }, [initial]);
  return rows;
}
