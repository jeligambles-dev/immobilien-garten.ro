"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Lock,
  LogOut,
  Upload,
  Trash2,
  Plus,
  Save,
  X,
  ImageIcon,
  FolderOpen,
  Pencil,
  SlidersHorizontal,
  DollarSign,
  MessageCircle,
  Images,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  createdAt: string;
}

interface UploadedImage {
  filename: string;
  url: string;
}

interface HeroSlide {
  id: string;
  src: string;
  label: string;
  desc: string;
}

interface BeforeAfterItem {
  id: string;
  label: string;
  desc: string;
  before: string;
  after: string;
}

interface ServicePrice {
  id: string;
  title: string;
  price: string;
  priceMin: number;
  priceMax: number;
  unit: string;
}

interface SiteContent {
  heroSlides: HeroSlide[];
  beforeAfter: BeforeAfterItem[];
  services: ServicePrice[];
}

const categories = ["Gazon", "Pomi & Arbuști", "Gard Viu", "Plantări", "Irigații"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"portfolio" | "images" | "hero" | "beforeafter" | "prices">("portfolio");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function login() {
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadData();
    } else {
      const data = await res.json();
      setError(data.error || "Parolă incorectă");
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
  }

  async function loadData() {
    const [portfolioRes, imagesRes, contentRes] = await Promise.all([
      fetch("/api/admin/portfolio"),
      fetch("/api/admin/images"),
      fetch("/api/admin/content"),
    ]);
    if (portfolioRes.ok) setItems(await portfolioRes.json());
    if (imagesRes.ok) setImages(await imagesRes.json());
    if (contentRes.ok) setContent(await contentRes.json());
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/images", { method: "POST", body: form });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      setImages((prev) => [...prev, data]);
      return data.url;
    }
    return null;
  }

  async function deleteImage(filename: string) {
    await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    setImages((prev) => prev.filter((i) => i.filename !== filename));
  }

  async function saveItem(item: PortfolioItem) {
    const isNew = !items.find((i) => i.id === item.id);
    await fetch("/api/admin/portfolio", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    await loadData();
    setEditing(null);
  }

  async function deleteItem(id: string) {
    await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function saveContent(data: Partial<SiteContent>) {
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    await loadData();
  }

  function pickImage(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const url = await uploadImage(file);
          resolve(url);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  }

  useEffect(() => {
    fetch("/api/admin/images").then((r) => {
      if (r.ok) { setAuthed(true); loadData(); }
    });
  }, []);

  // LOGIN
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Lock className="h-7 w-7" />
            </div>
          </div>
          <h1 className="font-heading font-bold text-slate-900 text-xl text-center mb-6">Admin Panel</h1>
          <form onSubmit={(e) => { e.preventDefault(); login(); }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolă admin"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 cursor-pointer">
              Autentificare
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "portfolio" as const, label: "Portofoliu", icon: FolderOpen },
    { id: "images" as const, label: "Imagini", icon: ImageIcon },
    { id: "hero" as const, label: "Carousel", icon: SlidersHorizontal },
    { id: "beforeafter" as const, label: "Înainte/După", icon: Images },
    { id: "prices" as const, label: "Prețuri", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="font-heading font-bold text-slate-900">Admin Panel</h1>
          <div className="flex items-center gap-3">
            {saved && <span className="text-green-600 text-sm font-medium">Salvat!</span>}
            <button onClick={logout} className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 cursor-pointer">
              <LogOut className="h-4 w-4" /> Deconectare
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                tab === t.id ? "bg-green-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* PORTFOLIO TAB */}
        {tab === "portfolio" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-slate-900">Proiecte Portofoliu</h2>
              <button
                onClick={() => setEditing({ id: "new-" + Date.now(), title: "", category: "Gazon", description: "", image: null, createdAt: new Date().toISOString() })}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Adaugă
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="h-40 bg-slate-100 relative">
                    {item.image ? <Image src={item.image} alt={item.title} fill className="object-cover" /> : <div className="h-full flex items-center justify-center text-slate-300"><ImageIcon className="h-10 w-10" /></div>}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{item.category}</span>
                    <h3 className="font-semibold text-slate-900 text-sm mt-2">{item.title || "Fără titlu"}</h3>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setEditing({ ...item })} className="flex items-center gap-1 text-xs text-slate-500 hover:text-green-600 cursor-pointer"><Pencil className="h-3 w-3" /> Editează</button>
                      <button onClick={() => { if (confirm("Ștergi?")) deleteItem(item.id); }} className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 cursor-pointer"><Trash2 className="h-3 w-3" /> Șterge</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IMAGES TAB */}
        {tab === "images" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-slate-900">Galerie Imagini ({images.length})</h2>
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer">
                <Upload className="h-4 w-4" /> {uploading ? "Se încarcă..." : "Încarcă"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={async (e) => { for (const f of Array.from(e.target.files || [])) await uploadImage(f); e.target.value = ""; }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.filename} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="aspect-square relative"><Image src={img.url} alt={img.filename} fill className="object-cover" /></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button onClick={() => { if (confirm("Ștergi?")) deleteImage(img.filename); }} className="h-10 w-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer"><Trash2 className="h-5 w-5" /></button>
                  </div>
                  <p className="p-2 text-xs text-slate-500 truncate">{img.filename}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HERO CAROUSEL TAB */}
        {tab === "hero" && content && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-slate-900">Carousel Hero</h2>
              <button
                onClick={() => {
                  const slides = [...content.heroSlides, { id: Date.now().toString(), src: "", label: "Slide Nou", desc: "" }];
                  setContent({ ...content, heroSlides: slides });
                }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Adaugă Slide
              </button>
            </div>
            <div className="space-y-4">
              {content.heroSlides.map((slide, i) => (
                <div key={slide.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-40 h-28 bg-slate-100 rounded-lg overflow-hidden relative shrink-0">
                    {slide.src ? <Image src={slide.src} alt={slide.label} fill className="object-cover" /> : <div className="h-full flex items-center justify-center text-slate-300"><ImageIcon className="h-8 w-8" /></div>}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input value={slide.label} onChange={(e) => { const s = [...content.heroSlides]; s[i] = { ...s[i], label: e.target.value }; setContent({ ...content, heroSlides: s }); }} placeholder="Titlu slide" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                    <input value={slide.desc} onChange={(e) => { const s = [...content.heroSlides]; s[i] = { ...s[i], desc: e.target.value }; setContent({ ...content, heroSlides: s }); }} placeholder="Descriere" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                    <div className="flex gap-2">
                      <button onClick={async () => { const url = await pickImage(); if (url) { const s = [...content.heroSlides]; s[i] = { ...s[i], src: url }; setContent({ ...content, heroSlides: s }); } }} className="text-xs text-green-600 hover:text-green-700 cursor-pointer">Schimbă Imagine</button>
                      <button onClick={() => { const s = content.heroSlides.filter((_, j) => j !== i); setContent({ ...content, heroSlides: s }); }} className="text-xs text-red-500 hover:text-red-600 cursor-pointer">Șterge</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => saveContent({ heroSlides: content.heroSlides })} className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl cursor-pointer">
              <Save className="h-4 w-4" /> Salvează Carousel
            </button>
          </div>
        )}

        {/* BEFORE/AFTER TAB */}
        {tab === "beforeafter" && content && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-slate-900">Înainte / După</h2>
              <button
                onClick={() => {
                  const ba = [...content.beforeAfter, { id: Date.now().toString(), label: "Proiect Nou", desc: "", before: "", after: "" }];
                  setContent({ ...content, beforeAfter: ba });
                }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Adaugă
              </button>
            </div>
            <div className="space-y-4">
              {content.beforeAfter.map((item, i) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">ÎNAINTE</p>
                      <div className="h-32 bg-slate-100 rounded-lg overflow-hidden relative">
                        {item.before ? <Image src={item.before} alt="Înainte" fill className="object-cover" /> : <div className="h-full flex items-center justify-center text-slate-300"><ImageIcon className="h-8 w-8" /></div>}
                      </div>
                      <button onClick={async () => { const url = await pickImage(); if (url) { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], before: url }; setContent({ ...content, beforeAfter: ba }); } }} className="text-xs text-green-600 mt-1 cursor-pointer">Schimbă</button>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">DUPĂ</p>
                      <div className="h-32 bg-slate-100 rounded-lg overflow-hidden relative">
                        {item.after ? <Image src={item.after} alt="După" fill className="object-cover" /> : <div className="h-full flex items-center justify-center text-slate-300"><ImageIcon className="h-8 w-8" /></div>}
                      </div>
                      <button onClick={async () => { const url = await pickImage(); if (url) { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], after: url }; setContent({ ...content, beforeAfter: ba }); } }} className="text-xs text-green-600 mt-1 cursor-pointer">Schimbă</button>
                    </div>
                  </div>
                  <input value={item.label} onChange={(e) => { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], label: e.target.value }; setContent({ ...content, beforeAfter: ba }); }} placeholder="Titlu" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-green-500" />
                  <input value={item.desc} onChange={(e) => { const ba = [...content.beforeAfter]; ba[i] = { ...ba[i], desc: e.target.value }; setContent({ ...content, beforeAfter: ba }); }} placeholder="Descriere" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                  <button onClick={() => { const ba = content.beforeAfter.filter((_, j) => j !== i); setContent({ ...content, beforeAfter: ba }); }} className="text-xs text-red-500 mt-2 cursor-pointer">Șterge</button>
                </div>
              ))}
            </div>
            <button onClick={() => saveContent({ beforeAfter: content.beforeAfter })} className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl cursor-pointer">
              <Save className="h-4 w-4" /> Salvează Înainte/După
            </button>
          </div>
        )}

        {/* PRICES TAB */}
        {tab === "prices" && content && (
          <div>
            <h2 className="font-heading font-semibold text-slate-900 mb-4">Prețuri Servicii</h2>
            <p className="text-slate-500 text-sm mb-4">Aceste prețuri apar pe pagina Produse & Servicii și în calculatorul chatbot-ului.</p>
            <div className="space-y-3">
              {content.services.map((svc, i) => (
                <div key={svc.id} className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="sm:col-span-1">
                    <p className="font-semibold text-slate-900 text-sm">{svc.title}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Afișat</label>
                    <input value={svc.price} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], price: e.target.value }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Min (lei/{svc.unit})</label>
                    <input type="number" step="0.1" value={svc.priceMin} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], priceMin: parseFloat(e.target.value) || 0 }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Max (lei/{svc.unit})</label>
                    <input type="number" step="0.1" value={svc.priceMax} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], priceMax: parseFloat(e.target.value) || 0 }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Unitate</label>
                    <select value={svc.unit} onChange={(e) => { const s = [...content.services]; s[i] = { ...s[i], unit: e.target.value }; setContent({ ...content, services: s }); }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500">
                      <option value="mp">mp</option>
                      <option value="ml">ml</option>
                      <option value="buc">buc</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => saveContent({ services: content.services })} className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl cursor-pointer">
              <Save className="h-4 w-4" /> Salvează Prețuri
            </button>
          </div>
        )}
      </div>

      {/* Edit Portfolio Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-heading font-semibold text-slate-900">{editing.id.startsWith("new-") ? "Proiect Nou" : "Editează"}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Imagine</label>
                {editing.image ? (
                  <div className="relative h-40 rounded-xl overflow-hidden border border-slate-200">
                    <Image src={editing.image} alt="Preview" fill className="object-cover" />
                    <button onClick={() => setEditing({ ...editing, image: null })} className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"><X className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <button onClick={async () => { const url = await pickImage(); if (url) setEditing({ ...editing, image: url }); }} className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-green-400 hover:text-green-500 cursor-pointer">
                    <Upload className="h-6 w-6 mb-1" /><span className="text-xs">Încarcă imagine</span>
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Titlu</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Categorie</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descriere</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">Anulează</button>
              <button onClick={() => saveItem(editing)} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer"><Save className="h-4 w-4" /> Salvează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
