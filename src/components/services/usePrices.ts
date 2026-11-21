"use client";

import { useEffect, useState } from "react";
import type { PriceRow } from "@/lib/services";
import bundled from "../../../data/site-content.json";
import { fetchSiteContent } from "../siteContent";

const FALLBACK = (bundled as { services?: PriceRow[] }).services ?? [];

/** Admin-edited prices from /api/admin/content; falls back to the prices bundled at build time. */
export function usePrices(): PriceRow[] {
  // start from the bundled prices so server HTML already shows them (no flash, crawlable)
  const [rows, setRows] = useState<PriceRow[]>(FALLBACK);
  useEffect(() => {
    fetchSiteContent().then((d) => {
      if (Array.isArray(d?.services)) setRows(d.services as PriceRow[]);
    });
  }, []);
  return rows;
}
