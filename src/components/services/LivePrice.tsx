"use client";

import { serviceBySlug, priceFor, rangeLabel, type PriceRow, type ServiceSlug } from "@/lib/services";
import { usePrices } from "./usePrices";

export default function LivePrice({ slug, prices, className = "" }: { slug: ServiceSlug; prices?: PriceRow[]; className?: string }) {
  const rows = usePrices(prices);
  return <span className={`pill-price ${className}`}>{priceFor(serviceBySlug(slug)!, rows).label}</span>;
}

/** "Între 0.50 și 1.50 lei/mp · qualifier" from live prices; just the qualifier when unpriced. */
export function LivePriceNote({ slug, qualifier, prices, className = "" }: { slug: ServiceSlug; qualifier: string; prices?: PriceRow[]; className?: string }) {
  const rows = usePrices(prices);
  const range = rangeLabel(priceFor(serviceBySlug(slug)!, rows));
  const text = [range, qualifier].filter(Boolean).join(" · ");
  return text ? <p className={className}>{text}</p> : null;
}
