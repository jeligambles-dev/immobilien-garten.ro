"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SERVICES, priceFor, type PriceRow, type ServiceSlug } from "@/lib/services";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const SPAN: Partial<Record<ServiceSlug, string>> = {
  pavaje: "sm:col-span-2 lg:row-span-2",
  "gazon-rulou": "sm:col-span-2",
  "toaletare-pomi": "sm:col-span-2",
  irigatii: "sm:col-span-2",
};

export function usePrices() {
  const [rows, setRows] = useState<PriceRow[] | undefined>();
  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => setRows(Array.isArray(d?.services) ? d.services : []))
      .catch(() => setRows([]));
  }, []);
  return rows;
}

export default function ServiceBento({ rows }: { rows: PriceRow[] | undefined }) {
  return (
    <div className="grid auto-rows-[240px] grid-cols-1 gap-[18px] sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
      {SERVICES.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 4) * 80} className={SPAN[s.slug] ?? ""}>
          <TiltCard className="h-full overflow-hidden rounded-[26px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
            <Link href={`/servicii/${s.slug}`} className="group block h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.poster} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.07]" />
              <span className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-[rgba(5,16,10,.85)]" />
              <span className="absolute left-[18px] top-4 z-[2] font-heading text-[15px] font-black text-white/85">{String(i + 1).padStart(2, "0")}</span>
              <span className="glass absolute inset-x-3.5 bottom-3.5 z-[2] flex flex-wrap items-end justify-between gap-x-2.5 gap-y-2 !rounded-[18px] px-[18px] py-4">
                <span>
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[.18em] text-leaf">{s.eyebrow}</span>
                  <span className={`block font-heading font-extrabold leading-[1.05] ${s.slug === "pavaje" ? "text-[34px]" : "text-[22px]"}`}>{s.title}</span>
                </span>
                <span className="pill-price">{priceFor(s, rows).label}</span>
              </span>
            </Link>
          </TiltCard>
        </Reveal>
      ))}
      <Reveal delay={240}>
        <Link href="/contact" className="flex h-full flex-col justify-between rounded-[26px] bg-gradient-to-br from-accent to-[#e0912a] p-6 text-accent-ink transition-transform hover:-translate-y-1">
          <span>
            <span className="mb-2 block text-[11px] uppercase tracking-[.18em] text-accent-ink/70">Nu știi de unde să începi?</span>
            <span className="block font-heading text-2xl font-extrabold leading-tight">Evaluare gratuită la tine acasă</span>
          </span>
          <span className="inline-flex w-fit rounded-full bg-accent-ink px-5 py-3 text-sm font-bold text-accent">Cere ofertă →</span>
        </Link>
      </Reveal>
    </div>
  );
}
