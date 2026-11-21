"use client";

import { serviceBySlug, priceFor, type ServiceSlug } from "@/lib/services";
import { usePrices } from "./usePrices";

export default function LivePrice({ slug, className = "" }: { slug: ServiceSlug; className?: string }) {
  const rows = usePrices();
  const def = serviceBySlug(slug)!;
  return <span className={`pill-price ${className} ${rows ? "" : "opacity-0"}`}>{priceFor(def, rows).label}</span>;
}
