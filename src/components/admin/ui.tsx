"use client";

import type { ReactNode } from "react";
import { Save, RotateCcw } from "lucide-react";

export const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-accent";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/85">
        {label} {hint && <span className="font-normal text-ink/50">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function TabHead({ title, desc, children }: { title: string; desc?: string; children?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-ink">{title}</h2>
        {desc && <p className="mt-1 max-w-2xl text-sm text-muted">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export function Actions({ onSave, onReset, saving, resetLabel = "Revino la textul original" }: { onSave: () => void; onReset?: () => void; saving?: boolean; resetLabel?: string }) {
  return (
    <div className="glass sticky bottom-4 z-10 mt-6 flex w-fit flex-wrap gap-3 !rounded-full p-2 !bg-[rgba(10,28,18,.85)]">
      <button onClick={onSave} disabled={saving} className="btn-cta !px-6 !py-3 disabled:opacity-60">
        <Save className="h-4 w-4" /> {saving ? "Se salvează…" : "Salvează"}
      </button>
      {onReset && (
        <button onClick={onReset} className="btn-ghost glass !px-5 !py-3">
          <RotateCcw className="h-4 w-4" /> {resetLabel}
        </button>
      )}
    </div>
  );
}
