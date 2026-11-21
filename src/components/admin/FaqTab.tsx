"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { GENERAL_FAQ } from "@/lib/faq";
import { resolveFaq, type QA } from "@/lib/contentMerge";
import { Actions, TabHead, inputCls } from "./ui";

export default function FaqTab({ value, onSave }: { value: unknown; onSave: (v: QA[] | null) => Promise<void> }) {
  const [draft, setDraft] = useState<QA[]>(() => resolveFaq(GENERAL_FAQ, value));
  const [saving, setSaving] = useState(false);
  useEffect(() => setDraft(resolveFaq(GENERAL_FAQ, value)), [value]);

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= draft.length) return;
    const n = [...draft];
    [n[i], n[j]] = [n[j], n[i]];
    setDraft(n);
  };

  return (
    <div>
      <TabHead title="Întrebări frecvente" desc="Grupul „Generale” de pe pagina Întrebări frecvente. Întrebările fiecărui serviciu se editează în Pagini servicii." />
      <div className="space-y-3">
        {draft.map((f, i) => (
          <div key={i} className="glass !rounded-2xl p-4">
            <div className="mb-2 flex gap-2">
              <input className={inputCls} value={f.q} placeholder="Întrebare" onChange={(e) => setDraft(draft.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
              <button onClick={() => move(i, -1)} className="grid w-10 shrink-0 place-items-center rounded-xl text-ink/50 hover:bg-white/10" aria-label="Mută sus"><ArrowUp className="h-4 w-4" /></button>
              <button onClick={() => move(i, 1)} className="grid w-10 shrink-0 place-items-center rounded-xl text-ink/50 hover:bg-white/10" aria-label="Mută jos"><ArrowDown className="h-4 w-4" /></button>
              <button onClick={() => setDraft(draft.filter((_, j) => j !== i))} className="grid w-10 shrink-0 place-items-center rounded-xl text-ink/50 hover:bg-white/10 hover:text-red-300" aria-label="Șterge"><Trash2 className="h-4 w-4" /></button>
            </div>
            <textarea rows={3} className={inputCls} value={f.a} placeholder="Răspuns" onChange={(e) => setDraft(draft.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
          </div>
        ))}
      </div>
      <button onClick={() => setDraft([...draft, { q: "", a: "" }])} className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent"><Plus className="h-4 w-4" /> Adaugă întrebare</button>
      <Actions
        saving={saving}
        onSave={async () => {
          setSaving(true);
          await onSave(draft);
          setSaving(false);
        }}
        onReset={value ? async () => { if (confirm("Revii la întrebările originale?")) await onSave(null); } : undefined}
      />
    </div>
  );
}
