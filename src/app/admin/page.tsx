"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Lock, LogOut, Upload, Trash2, Plus, Save, X, ImageIcon,
  FolderOpen, Pencil, SlidersHorizontal, DollarSign, Images,
  Hammer, MapPin, Map, MessageCircle, Film, FileText, HelpCircle, ExternalLink,
} from "lucide-react";
import VideoTab from "@/components/admin/VideoTab";
import ServiceContentTab from "@/components/admin/ServiceContentTab";
import FaqTab from "@/components/admin/FaqTab";

// ---- TYPES ----
interface PortfolioItem { id: string; title: string; category: string; description: string; image: string | null; createdAt: string; }
interface UploadedImage { filename: string; url: string; }
interface HeroSlide { id: string; src: string; label: string; desc: string; }
interface BeforeAfterItem { id: string; label: string; desc: string; before: string; after: string; }
interface ServicePrice { id: string; title: string; price: string; priceMin: number; priceMax: number; unit: string; }
interface SiteContent { heroSlides: HeroSlide[]; beforeAfter: BeforeAfterItem[]; services: ServicePrice[]; coveringAreas: string[]; storyVideo?: unknown; serviceContent?: unknown; generalFaq?: unknown; }
interface Lucrare { id: string; title: string; description: string; photos: string[]; services: string[]; location: string; createdAt: string; }

const categories = ["Gazon", "Pomi & Arbuști", "Gard Viu", "Plantări", "Irigații"];
const allServices = [
  "Tuns Gazon", "Scarificare & Aerisire", "Toaletare Pomi & Arbuști", "Tuns Gard Viu",
  "Plantări Profesionale", "Montaj Gazon Rulou", "Gazon Artificial", "Sistem Irigații", "Pavaje & Alei",
  "Defrișare Teren", "Curățare Teren", "Nivelare Teren", "Mulcire",
  "Amenajare Peisagistică", "Design Grădină", "Borduri & Pavaje",
  "Scoarță Decorativă", "Pietriș Decorativ", "Gazon Semănat",
  "Fertilizare", "Tratamente Fitosanitare", "Combatere Dăunători",
  "Tăiere Copaci", "Doborâre Arbori", "Dezrădăcinare Cioate",
  "Drenaj Grădină", "Iluminat Exterior", "Garduri & Pergole",
  "Întreținere Lunară", "Curățenie Sezonieră", "Pregătire Iarnă",
];

type Tab = "lucrari" | "portfolio" | "images" | "video" | "beforeafter" | "prices" | "areas" | "servicePages" | "faq";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("lucrari");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [lucrari, setLucrari] = useState<Lucrare[]>([]);
  const [editingLucrare, setEditingLucrare] = useState<Lucrare | null>(null);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newArea, setNewArea] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // ---- AUTH ----
  async function login() {
    setError("");
    const res = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) { setAuthed(true); loadData(); }
    else { const d = await res.json(); setError(d.error || "Parolă incorectă"); }
  }
  async function logout() { await fetch("/api/admin/auth", { method: "DELETE" }); setAuthed(false); }

  // ---- DATA ----
  async function loadData() {
    const [a, b, c, d] = await Promise.all([fetch("/api/admin/portfolio"), fetch("/api/admin/images"), fetch("/api/admin/content"), fetch("/api/admin/lucrari")]);
    if (a.ok) setItems(await a.json());
    if (b.ok) setImages(await b.json());
    if (c.ok) setContent(await c.json());
    if (d.ok) setLucrari(await d.json());
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    const form = new FormData(); form.append("file", file);
    const res = await fetch("/api/admin/images", { method: "POST", body: form });
    setUploading(false);
    if (res.ok) { const d = await res.json(); setImages((p) => [...p, d]); return d.url; }
    return null;
  }
  async function deleteImage(filename: string) { await fetch("/api/admin/images", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename }) }); setImages((p) => p.filter((i) => i.filename !== filename)); }
  async function saveItem(item: PortfolioItem) { const isNew = !items.find((i) => i.id === item.id); await fetch("/api/admin/portfolio", { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }); await loadData(); setEditing(null); }
  async function deleteItem(id: string) { await fetch("/api/admin/portfolio", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); setItems((p) => p.filter((i) => i.id !== id)); }
  async function saveLucrare(l: Lucrare) { const exists = lucrari.find((x) => x.id === l.id); await fetch("/api/admin/lucrari", { method: exists ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(l) }); await loadData(); setEditingLucrare(null); }
  async function deleteLucrare(id: string) { await fetch("/api/admin/lucrari", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); setLucrari((p) => p.filter((l) => l.id !== id)); }
  async function saveContent(data: Partial<SiteContent>) { await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); setSaved(true); setTimeout(() => setSaved(false), 2000); await loadData(); }

  function pickImage(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input"); input.type = "file"; input.accept = "image/*";
      input.onchange = async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; resolve(f ? await uploadImage(f) : null); };
      input.click();
    });
  }

  function pickMultipleImages(): Promise<string[]> {
    return new Promise((resolve) => {
      const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true;
      input.onchange = async (e) => {
        const files = Array.from((e.target as HTMLInputElement).files || []);
        const urls: string[] = [];
        for (const f of files) { const url = await uploadImage(f); if (url) urls.push(url); }
        resolve(urls);
      };
      input.click();
    });
  }

  useEffect(() => { fetch("/api/admin/images").then((r) => { if (r.ok) { setAuthed(true); loadData(); } }); }, []);

  // ---- LOGIN ----
  if (!authed) {
    return (
      <div className="admin-root min-h-screen flex items-center justify-center glow-bg text-ink px-4">
        <div className="w-full max-w-sm glass rounded-2xl shadow-lg border border-white/15 p-8">
          <div className="flex items-center justify-center mb-6"><div className="h-14 w-14 rounded-2xl bg-leaf/15 text-accent flex items-center justify-center"><Lock className="h-7 w-7" /></div></div>
          <h1 className="font-heading font-bold text-ink text-xl text-center mb-6">Admin Panel</h1>
          <form onSubmit={(e) => { e.preventDefault(); login(); }}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parolă admin" className="w-full rounded-xl border border-white/15 px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" autoFocus />
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <button type="submit" className="w-full bg-accent hover:brightness-110 text-accent-ink font-semibold py-3 rounded-xl cursor-pointer">Autentificare</button>
          </form>
        </div>
      </div>
    );
  }

  // ---- TABS ----
  const tabGroups = [
    { label: "Conținut", items: [
      { id: "lucrari" as Tab, label: "Lucrări", icon: Hammer },
      { id: "beforeafter" as Tab, label: "Înainte/După", icon: Images },
      { id: "video" as Tab, label: "Video principal", icon: Film },
    ]},
    { label: "Pagini", items: [
      { id: "servicePages" as Tab, label: "Pagini servicii", icon: FileText },
      { id: "faq" as Tab, label: "Întrebări frecvente", icon: HelpCircle },
    ]},
    { label: "Catalog", items: [
      { id: "prices" as Tab, label: "Prețuri & Chatbot", icon: DollarSign },
      { id: "portfolio" as Tab, label: "Portofoliu vechi", icon: FolderOpen },
    ]},
    { label: "Setări", items: [
      { id: "areas" as Tab, label: "Zone acoperire", icon: Map },
      { id: "images" as Tab, label: "Imagini", icon: ImageIcon },
    ]},
  ];


  return (
    <div className="admin-root min-h-screen glow-bg text-ink">
      {/* HEADER */}
      <header className="glass !rounded-none !border-x-0 !border-t-0 border-b border-white/15 sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><img src="/logo-light.png" alt="" className="h-8 w-auto" /><h1 className="font-heading font-bold text-ink">Admin</h1></div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-leaf text-sm font-medium">Salvat!</span>}
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ExternalLink className="h-4 w-4" /> Vezi site-ul</a>
            <button onClick={logout} className="flex items-center gap-2 text-sm text-muted hover:text-red-500 cursor-pointer"><LogOut className="h-4 w-4" /> Ieși</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        {/* SIDEBAR TABS */}
        <div className="flex flex-col sm:flex-row gap-6">
          <nav className="sm:w-48 shrink-0">
            {tabGroups.map((g) => (
              <div key={g.label} className="mb-4">
                <p className="text-[10px] font-bold text-ink/50 uppercase tracking-wider px-3 mb-1">{g.label}</p>
                {g.items.map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer mb-0.5 ${tab === t.id ? "bg-accent text-accent-ink" : "text-muted hover:bg-white/10"}`}>
                    <t.icon className="h-4 w-4" /> {t.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">

        {/* ===== LUCRARI ===== */}
        {tab === "lucrari" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-ink text-lg">Lucrări Realizate</h2>
              <button onClick={() => setEditingLucrare({ id: "new-" + Date.now(), title: "", description: "", photos: [], services: [], location: "Timișoara", createdAt: new Date().toISOString() })} className="flex items-center gap-2 bg-accent hover:brightness-110 text-accent-ink text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"><Plus className="h-4 w-4" /> Adaugă Lucrare</button>
            </div>
            {lucrari.length === 0 ? (
              <div className="glass rounded-xl border border-dashed border-white/20 p-12 text-center"><Hammer className="h-12 w-12 text-ink/30 mx-auto mb-3" /><p className="text-muted text-sm">Nicio lucrare. Adaugă prima!</p></div>
            ) : (
              <div className="space-y-3">
                {lucrari.map((l) => (
                  <div key={l.id} className="glass rounded-xl border border-white/15 p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex gap-2 shrink-0 overflow-x-auto">
                      {l.photos.slice(0, 3).map((p, i) => (<div key={i} className="h-20 w-20 rounded-lg overflow-hidden relative shrink-0"><Image src={p} alt="" fill sizes="160px" className="object-cover" /></div>))}
                      {l.photos.length === 0 && <div className="h-20 w-20 rounded-lg bg-white/5 flex items-center justify-center"><ImageIcon className="h-8 w-8 text-ink/30" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink text-sm">{l.title || "Fără titlu"}</h3>
                      <p className="text-muted text-xs mt-1 line-clamp-2">{l.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">{l.services.map((s) => (<span key={s} className="text-xs bg-leaf/10 text-leaf px-2 py-0.5 rounded-full">{s}</span>))}</div>
                      <p className="text-xs text-ink/50 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.location} · {l.photos.length} foto</p>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button onClick={() => setEditingLucrare({ ...l })} className="flex items-center gap-1 text-xs text-muted hover:text-accent cursor-pointer"><Pencil className="h-3 w-3" /> Editează</button>
                      <button onClick={() => { if (confirm("Ștergi?")) deleteLucrare(l.id); }} className="flex items-center gap-1 text-xs text-muted hover:text-red-500 cursor-pointer"><Trash2 className="h-3 w-3" /> Șterge</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== VIDEO ===== */}
        {tab === "video" && content && <VideoTab value={content.storyVideo} onSave={(v) => saveContent({ storyVideo: v })} />}

        {/* ===== SERVICE PAGES ===== */}
        {tab === "servicePages" && content && <ServiceContentTab value={content.serviceContent} onSave={(v) => saveContent({ serviceContent: v })} />}

        {/* ===== GENERAL FAQ ===== */}
        {tab === "faq" && content && <FaqTab value={content.generalFaq} onSave={(v) => saveContent({ generalFaq: v })} />}

        {/* ===== BEFORE/AFTER ===== */}
        {tab === "beforeafter" && content && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-ink text-lg">Înainte / După</h2>
              <button onClick={() => setContent({ ...content, beforeAfter: [...content.beforeAfter, { id: Date.now().toString(), label: "Proiect Nou", desc: "", before: "", after: "" }] })} className="flex items-center gap-2 bg-accent hover:brightness-110 text-accent-ink text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"><Plus className="h-4 w-4" /> Adaugă</button>
            </div>
            <div className="space-y-4">
              {content.beforeAfter.map((item, i) => (
                <div key={item.id} className="glass rounded-xl border border-white/15 p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {(["before", "after"] as const).map((type) => (
                      <div key={type}>
                        <p className="text-xs font-medium text-muted mb-1">{type === "before" ? "ÎNAINTE" : "DUPĂ"}</p>
                        <div className="h-28 bg-white/5 rounded-lg overflow-hidden relative">
                          {item[type] ? <Image src={item[type]} alt="" fill sizes="160px" className="object-cover" /> : <div className="h-full flex items-center justify-center text-ink/30"><ImageIcon className="h-6 w-6" /></div>}
                        </div>
                        <button onClick={async () => { const url = await pickImage(); if (url) { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], [type]: url }; setContent({ ...content, beforeAfter: ba }); } }} className="text-xs text-accent mt-1 cursor-pointer">Schimbă</button>
                      </div>
                    ))}
                  </div>
                  <input value={item.label} onChange={(e) => { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], label: e.target.value }; setContent({ ...content, beforeAfter: ba }); }} placeholder="Titlu" className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" />
                  <input value={item.desc} onChange={(e) => { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], desc: e.target.value }; setContent({ ...content, beforeAfter: ba }); }} placeholder="Descriere" className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" />
                  <button onClick={() => setContent({ ...content, beforeAfter: content.beforeAfter.filter((_, j) => j !== i) })} className="text-xs text-red-500 mt-2 cursor-pointer">Șterge</button>
                </div>
              ))}
            </div>
            <button onClick={() => saveContent({ beforeAfter: content.beforeAfter })} className="mt-4 flex items-center gap-2 bg-accent hover:brightness-110 text-accent-ink font-semibold px-6 py-2.5 rounded-xl cursor-pointer"><Save className="h-4 w-4" /> Salvează</button>
          </div>
        )}

        {/* ===== PRICES & CHATBOT ===== */}
        {tab === "prices" && content && (
          <div>
            <h2 className="font-heading font-semibold text-ink text-lg mb-2">Prețuri Servicii & Chatbot</h2>
            <p className="text-muted text-sm mb-4">Aceste prețuri apar pe prima pagină, pe pagina Servicii (inclusiv calculatorul), pe paginile de servicii și în chatbot. Un câmp Min/Max lăsat 0 ascunde serviciul din calculator.</p>
            <div className="space-y-3">
              {content.services.map((svc, i) => (
                <div key={svc.id} className="glass rounded-xl border border-white/15 p-4">
                  <p className="font-semibold text-ink text-sm mb-3 flex items-center gap-2"><MessageCircle className="h-4 w-4 text-accent" /> {svc.title}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-muted">Afișat pe site</label>
                      <input value={svc.price} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], price: e.target.value }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" />
                    </div>
                    <div>
                      <label className="text-xs text-muted">Min (lei/{svc.unit})</label>
                      <input type="number" step="0.1" value={svc.priceMin} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], priceMin: parseFloat(e.target.value) || 0 }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" />
                    </div>
                    <div>
                      <label className="text-xs text-muted">Max (lei/{svc.unit})</label>
                      <input type="number" step="0.1" value={svc.priceMax} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], priceMax: parseFloat(e.target.value) || 0 }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" />
                    </div>
                    <div>
                      <label className="text-xs text-muted">Unitate</label>
                      <select value={svc.unit} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], unit: e.target.value }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40">
                        <option value="mp">mp</option><option value="ml">ml</option><option value="buc">buc</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => saveContent({ services: content.services })} className="mt-4 flex items-center gap-2 bg-accent hover:brightness-110 text-accent-ink font-semibold px-6 py-2.5 rounded-xl cursor-pointer"><Save className="h-4 w-4" /> Salvează Prețuri</button>
          </div>
        )}

        {/* ===== COVERING AREAS ===== */}
        {tab === "areas" && content && (
          <div>
            <h2 className="font-heading font-semibold text-ink text-lg mb-2">Zone de Acoperire</h2>
            <p className="text-muted text-sm mb-4">Localitățile în care oferiți servicii. Apar pe pagina Contact, pe hartă. Localitățile din jurul Timișoarei primesc automat pin pe hartă.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {(content.coveringAreas || []).map((area, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-leaf/10 border border-leaf/30 text-leaf text-sm px-3 py-1.5 rounded-full">
                  <MapPin className="h-3 w-3" /> {area}
                  <button onClick={() => { const a = content.coveringAreas.filter((_, j) => j !== i); setContent({ ...content, coveringAreas: a }); }} className="text-leaf/70 hover:text-red-500 cursor-pointer ml-1">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <input value={newArea} onChange={(e) => setNewArea(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && newArea.trim()) { setContent({ ...content, coveringAreas: [...(content.coveringAreas || []), newArea.trim()] }); setNewArea(""); } }} placeholder="Adaugă localitate..." className="flex-1 rounded-lg border border-white/15 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" />
              <button onClick={() => { if (newArea.trim()) { setContent({ ...content, coveringAreas: [...(content.coveringAreas || []), newArea.trim()] }); setNewArea(""); } }} className="bg-accent hover:brightness-110 text-accent-ink text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => saveContent({ coveringAreas: content.coveringAreas })} className="flex items-center gap-2 bg-accent hover:brightness-110 text-accent-ink font-semibold px-6 py-2.5 rounded-xl cursor-pointer"><Save className="h-4 w-4" /> Salvează Zone</button>
          </div>
        )}

        {/* ===== PORTFOLIO (old) ===== */}
        {tab === "portfolio" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-ink text-lg">Portofoliu (vechi)</h2>
              <button onClick={() => setEditing({ id: "new-" + Date.now(), title: "", category: "Gazon", description: "", image: null, createdAt: new Date().toISOString() })} className="flex items-center gap-2 bg-accent hover:brightness-110 text-accent-ink text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"><Plus className="h-4 w-4" /> Adaugă</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="glass rounded-xl border border-white/15 overflow-hidden">
                  <div className="h-32 bg-white/5 relative">{item.image ? <Image src={item.image} alt={item.title} fill sizes="160px" className="object-cover" /> : <div className="h-full flex items-center justify-center text-ink/30"><ImageIcon className="h-8 w-8" /></div>}</div>
                  <div className="p-3">
                    <span className="text-xs font-medium text-accent bg-leaf/10 px-2 py-0.5 rounded-full">{item.category}</span>
                    <h3 className="font-semibold text-ink text-sm mt-1">{item.title || "Fără titlu"}</h3>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setEditing({ ...item })} className="text-xs text-muted hover:text-accent cursor-pointer"><Pencil className="h-3 w-3 inline" /> Editează</button>
                      <button onClick={() => { if (confirm("Ștergi?")) deleteItem(item.id); }} className="text-xs text-muted hover:text-red-500 cursor-pointer"><Trash2 className="h-3 w-3 inline" /> Șterge</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== IMAGES ===== */}
        {tab === "images" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-ink text-lg">Galerie Imagini ({images.length})</h2>
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 bg-accent hover:brightness-110 disabled:opacity-50 text-accent-ink text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"><Upload className="h-4 w-4" /> {uploading ? "Se încarcă..." : "Încarcă"}</button>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={async (e) => { for (const f of Array.from(e.target.files || [])) await uploadImage(f); e.target.value = ""; }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img) => (
                <div key={img.filename} className="group relative glass rounded-xl border border-white/15 overflow-hidden">
                  <div className="aspect-square relative"><Image src={img.url} alt={img.filename} fill sizes="160px" className="object-cover" /></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"><button onClick={() => { if (confirm("Ștergi?")) deleteImage(img.filename); }} className="h-10 w-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer"><Trash2 className="h-5 w-5" /></button></div>
                  <p className="p-2 text-xs text-muted truncate">{img.filename}</p>
                </div>
              ))}
            </div>
          </div>
        )}

          </div>
        </div>
      </div>

      {/* ===== EDIT LUCRARE MODAL ===== */}
      {editingLucrare && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass !rounded-3xl !bg-[rgba(10,28,18,.96)] max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-heading font-semibold text-ink">{editingLucrare.id.startsWith("new-") ? "Lucrare Nouă" : "Editează Lucrare"}</h3>
              <button onClick={() => setEditingLucrare(null)} className="p-1.5 text-ink/50 hover:text-ink cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">Fotografii <span className="text-ink/50 font-normal">(prima = copertă, trage pentru a reordona)</span></label>
                <div className="flex flex-wrap gap-2">
                  {editingLucrare.photos.map((p, i) => (
                    <div
                      key={p + i}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("photoIdx", i.toString())}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const from = parseInt(e.dataTransfer.getData("photoIdx"));
                        if (isNaN(from) || from === i) return;
                        const photos = [...editingLucrare.photos];
                        const [moved] = photos.splice(from, 1);
                        photos.splice(i, 0, moved);
                        setEditingLucrare({ ...editingLucrare, photos });
                      }}
                      className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 cursor-grab active:cursor-grabbing ${i === 0 ? "border-amber-400" : "border-white/15"}`}
                    >
                      <Image src={p} alt="" fill sizes="160px" className="object-cover" />
                      {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-amber-400 text-[9px] text-center font-bold text-amber-900 py-0.5">COPERTĂ</span>}
                      <button onClick={() => setEditingLucrare({ ...editingLucrare, photos: editingLucrare.photos.filter((_, j) => j !== i) })} className="absolute top-0.5 right-0.5 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer text-xs">×</button>
                      <span className="absolute top-0.5 left-0.5 bg-black/50 text-white text-[9px] font-bold px-1 rounded">{i + 1}</span>
                    </div>
                  ))}
                  <button onClick={async () => { const urls = await pickMultipleImages(); if (urls.length) setEditingLucrare({ ...editingLucrare, photos: [...editingLucrare.photos, ...urls] }); }} className="h-20 w-20 border-2 border-dashed border-white/15 rounded-lg flex flex-col items-center justify-center text-ink/50 hover:border-accent/60 hover:text-leaf cursor-pointer"><Upload className="h-5 w-5" /><span className="text-[10px]">Adaugă</span></button>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-ink/85 mb-1.5">Titlu</label><input value={editingLucrare.title} onChange={(e) => setEditingLucrare({ ...editingLucrare, title: e.target.value })} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" placeholder="Ex: Amenajare curte" /></div>
              <div><label className="block text-sm font-medium text-ink/85 mb-1.5">Descriere</label><textarea value={editingLucrare.description} onChange={(e) => setEditingLucrare({ ...editingLucrare, description: e.target.value })} rows={3} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none bg-white/5 text-ink placeholder:text-ink/40" /></div>
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">Servicii efectuate</label>
                <div className="flex flex-wrap gap-2">
                  {allServices.map((s) => { const on = editingLucrare.services.includes(s); return (<button key={s} type="button" onClick={() => setEditingLucrare({ ...editingLucrare, services: on ? editingLucrare.services.filter((x) => x !== s) : [...editingLucrare.services, s] })} className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer ${on ? "bg-accent text-accent-ink border-accent" : "glass text-muted border-white/15 hover:border-accent/60"}`}>{s}</button>); })}
                </div>
              </div>
              <div><label className="block text-sm font-medium text-ink/85 mb-1.5">Locație</label><input value={editingLucrare.location} onChange={(e) => setEditingLucrare({ ...editingLucrare, location: e.target.value })} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" /></div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-white/10">
              <button onClick={() => setEditingLucrare(null)} className="flex-1 py-2.5 text-sm font-medium text-muted border border-white/15 rounded-xl hover:bg-white/5 cursor-pointer">Anulează</button>
              <button onClick={() => saveLucrare(editingLucrare)} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-accent-ink bg-accent hover:brightness-110 rounded-xl cursor-pointer"><Save className="h-4 w-4" /> Salvează</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT PORTFOLIO MODAL ===== */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass !rounded-3xl !bg-[rgba(10,28,18,.96)] max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-heading font-semibold text-ink">{editing.id.startsWith("new-") ? "Proiect Nou" : "Editează"}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 text-ink/50 hover:text-ink cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">Imagine</label>
                {editing.image ? (<div className="relative h-40 rounded-xl overflow-hidden border border-white/15"><Image src={editing.image} alt="" fill sizes="160px" className="object-cover" /><button onClick={() => setEditing({ ...editing, image: null })} className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"><X className="h-4 w-4" /></button></div>) : (<button onClick={async () => { const url = await pickImage(); if (url) setEditing({ ...editing, image: url }); }} className="w-full h-32 border-2 border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center text-ink/50 hover:border-accent/60 hover:text-leaf cursor-pointer"><Upload className="h-6 w-6 mb-1" /><span className="text-xs">Încarcă</span></button>)}
              </div>
              <div><label className="block text-sm font-medium text-ink/85 mb-1.5">Titlu</label><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40" /></div>
              <div><label className="block text-sm font-medium text-ink/85 mb-1.5">Categorie</label><select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white/5 text-ink placeholder:text-ink/40">{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-ink/85 mb-1.5">Descriere</label><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none bg-white/5 text-ink placeholder:text-ink/40" /></div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-white/10">
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 text-sm font-medium text-muted border border-white/15 rounded-xl hover:bg-white/5 cursor-pointer">Anulează</button>
              <button onClick={() => saveItem(editing)} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-accent-ink bg-accent hover:brightness-110 rounded-xl cursor-pointer"><Save className="h-4 w-4" /> Salvează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
