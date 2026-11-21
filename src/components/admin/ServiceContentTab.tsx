"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import { SERVICE_CONTENT, type ServiceContent } from "@/lib/serviceContent";
import { mergeServiceContent } from "@/lib/contentMerge";
import { Actions, Field, TabHead, inputCls } from "./ui";

type Overrides = Partial<Record<ServiceSlug, Partial<ServiceContent>>>;

export default function ServiceContentTab({ value, onSave }: { value: unknown; onSave: (v: Overrides) => Promise<void> }) {
  const overrides = (value && typeof value === "object" ? value : {}) as Overrides;
  const [slug, setSlug] = useState<ServiceSlug>("pavaje");
  const [draft, setDraft] = useState<ServiceContent>(() => mergeServiceContent(SERVICE_CONTENT[slug], overrides[slug]));
  const [saving, setSaving] = useState(false);

  // reload the draft when switching service or after a save
  useEffect(() => {
    setDraft(mergeServiceContent(SERVICE_CONTENT[slug], overrides[slug]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, JSON.stringify(overrides[slug] ?? null)]);

  const set = <K extends keyof ServiceContent>(k: K, v: ServiceContent[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const save = async () => {
    setSaving(true);
    await onSave({ ...overrides, [slug]: draft });
    setSaving(false);
  };
  const reset = async () => {
    if (!confirm("Revii la textul original pentru acest serviciu?")) return;
    const next = { ...overrides };
    delete next[slug];
    await onSave(next);
  };
  const edited = !!overrides[slug];

  return (
    <div>
      <TabHead title="Pagini servicii" desc="Textele de pe fiecare pagină de serviciu. Prețurile se editează în tab-ul Prețuri.">
        <a href={`/servicii/${slug}`} target="_blank" rel="noopener noreferrer" className="btn-ghost glass !py-2.5">
          Vezi pagina <ExternalLink className="h-4 w-4" />
        </a>
      </TabHead>

      <div className="mb-6 flex flex-wrap gap-2">
        {SERVICES.map((s) => (
          <button
            key={s.slug}
            onClick={() => setSlug(s.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${slug === s.slug ? "bg-accent text-accent-ink" : "glass !rounded-full text-ink/85 hover:text-white"}`}
          >
            {s.title}
            {overrides[s.slug] && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-leaf align-middle" title="Modificat" />}
          </button>
        ))}
      </div>

      <div className="glass space-y-5 !rounded-2xl p-5 sm:p-6">
        <Field label="Text introductiv" hint="sub titlu, în imaginea de sus">
          <textarea rows={4} className={inputCls} value={draft.intro} onChange={(e) => set("intro", e.target.value)} />
        </Field>
        <Field label="Notă preț" hint="apare după intervalul de preț, ex. „În funcție de înălțime.”">
          <input className={inputCls} value={draft.priceNote} onChange={(e) => set("priceNote", e.target.value)} />
        </Field>

        <div>
          <p className="mb-2 text-sm font-medium text-ink/85">Ce include</p>
          <div className="space-y-2">
            {draft.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputCls} value={f} onChange={(e) => set("features", draft.features.map((x, j) => (j === i ? e.target.value : x)))} />
                <button onClick={() => set("features", draft.features.filter((_, j) => j !== i))} className="grid w-11 shrink-0 place-items-center rounded-xl text-ink/50 hover:bg-white/10 hover:text-red-300" aria-label="Șterge"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <button onClick={() => set("features", [...draft.features, ""])} className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent"><Plus className="h-4 w-4" /> Adaugă punct</button>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink/85">Pașii de lucru</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {draft.process.map((p, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-black text-accent-ink">{i + 1}</span>
                  <input className={inputCls} value={p.step} placeholder="Pas" onChange={(e) => set("process", draft.process.map((x, j) => (j === i ? { ...x, step: e.target.value } : x)))} />
                </div>
                <textarea rows={2} className={inputCls} value={p.desc} placeholder="Descriere" onChange={(e) => set("process", draft.process.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink/85">Întrebări frecvente</p>
          <div className="space-y-3">
            {draft.faq.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-3">
                <div className="mb-2 flex gap-2">
                  <input className={inputCls} value={f.q} placeholder="Întrebare" onChange={(e) => set("faq", draft.faq.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
                  <button onClick={() => set("faq", draft.faq.filter((_, j) => j !== i))} className="grid w-11 shrink-0 place-items-center rounded-xl text-ink/50 hover:bg-white/10 hover:text-red-300" aria-label="Șterge"><Trash2 className="h-4 w-4" /></button>
                </div>
                <textarea rows={2} className={inputCls} value={f.a} placeholder="Răspuns" onChange={(e) => set("faq", draft.faq.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
              </div>
            ))}
          </div>
          <button onClick={() => set("faq", [...draft.faq, { q: "", a: "" }])} className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent"><Plus className="h-4 w-4" /> Adaugă întrebare</button>
        </div>

        <details className="rounded-xl border border-white/10 p-3">
          <summary className="cursor-pointer text-sm font-medium text-ink/85">SEO (titlu și descriere Google)</summary>
          <div className="mt-3 space-y-3">
            <Field label="Titlu SEO"><input className={inputCls} value={draft.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} /></Field>
            <Field label="Descriere SEO" hint="~155 caractere"><textarea rows={2} className={inputCls} value={draft.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} /></Field>
          </div>
        </details>
      </div>

      <p className="mt-3 text-xs text-ink/50">Rândurile goale sunt ignorate. Dacă golești o secțiune complet, se folosește textul original.</p>
      <Actions onSave={save} saving={saving} onReset={edited ? reset : undefined} />
    </div>
  );
}
