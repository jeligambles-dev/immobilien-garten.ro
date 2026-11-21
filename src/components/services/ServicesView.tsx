"use client";

import ServiceBento from "./ServiceBento";
import { usePrices } from "./usePrices";
import PriceEstimator from "./PriceEstimator";

export default function ServicesView() {
  const rows = usePrices();
  return (
    <>
      <ServiceBento rows={rows} />
      <div className="mt-24">
        <PriceEstimator rows={rows} />
      </div>
    </>
  );
}
