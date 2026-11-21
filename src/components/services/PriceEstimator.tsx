"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { SERVICES, priceFor, type PriceRow } from "@/lib/services";
import { parseQty, estimateRange, formatLei, MAX_QTY } from "@/lib/estimate";

const UNIT_LABEL: Record<string, string> = { mp: "m²", ml: "metri liniari", buc: "bucăți" };

export default function PriceEstimator({ rows }: { rows: PriceRow[] | undefined }) {
  const priced = useMemo(
    () => SERVICES.map((s) => ({ s, p: priceFor(s, rows) })).filter((x) => x.p.min != null),
    [rows],
  );
  const [slug, setSlug] = useState<string>("");
  const [qty, setQty] = useState("");
  const current = priced.find((x) => x.s.slug === slug) ?? priced[0];
  const range = current ? estimateRange(current.p.min, current.p.max, parseQty(qty)) : null;
  const unit = current?.p.unit ?? "mp";

  return (
    <div className="glass grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div>
        <div className="eyebrow">Calculator de preț</div>
        <h2 className="h-sec !text-[clamp(30px,3.4vw,44px)]">
          Cât te costă, <em>orientativ</em>?
        </h2>
        <p className="lead mt-4">Alege serviciul și suprafața. Oferta finală o primești după evaluarea gratuită.</p>
      </div>
      <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        <label className="text-sm text-muted" htmlFor="est-svc">Serviciu</label>
        <select id="est-svc" className="field" value={current?.s.slug ?? ""} onChange={(e) => setSlug(e.target.value)} disabled={!priced.length}>
          {priced.map(({ s }) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
        <label className="mt-2 text-sm text-muted" htmlFor="est-qty">Cantitate ({UNIT_LABEL[unit] ?? unit})</label>
        <input id="est-qty" className="field" inputMode="decimal" placeholder="ex. 200" maxLength={12} value={qty} onChange={(e) => setQty(e.target.value)} />
        <div className="mt-3 min-h-[92px] rounded-2xl border border-white/10 bg-white/[.04] p-5" aria-live="polite">
          {range ? (
            <>
              <div className="text-sm text-muted">Estimare</div>
              <div className="font-heading text-3xl font-black text-accent">
                {range.low === range.high ? formatLei(range.low) : `${formatLei(range.low)} – ${formatLei(range.high)}`}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 text-muted">
              <Calculator className="h-5 w-5 text-accent" />
              {Number(qty.replace(/\./g, "").replace(",", ".")) > MAX_QTY
                ? "Pentru suprafețe atât de mari, cere o ofertă personalizată."
                : "Introdu o cantitate pentru estimare."}
            </div>
          )}
        </div>
        <p className="text-xs text-ink/50">Preț orientativ. Oferta finală după evaluarea gratuită.</p>
        <Link href={`/contact?serviciu=${current?.s.slug ?? ""}`} className="btn-cta mt-1 !py-3.5">Cere ofertă exactă →</Link>
      </form>
    </div>
  );
}
