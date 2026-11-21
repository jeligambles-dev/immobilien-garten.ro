"use client";

import ServiceBento from "./ServiceBento";
import { usePrices } from "./usePrices";
import type { PriceRow } from "@/lib/services";
import PriceEstimator from "./PriceEstimator";

export default function ServicesView({ prices }: { prices?: PriceRow[] }) {
  const rows = usePrices(prices);
  return (
    <>
      <ServiceBento rows={rows} />
      <div className="mt-24">
        <PriceEstimator rows={rows} />
      </div>
    </>
  );
}
