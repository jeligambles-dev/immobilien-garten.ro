"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ImageIcon, MapPin, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { SkeletonGrid } from "@/components/Skeleton";
import BeforeAfter from "@/components/BeforeAfter";
import SectionHead from "@/components/ui/SectionHead";
import bundled from "../../../data/lucrari.json";

interface Lucrare {
  id: string;
  title: string;
  description: string;
  photos: string[];
  services: string[];
  location: string;
  createdAt: string;
}

const serviceFilters = [
  "Toate",
  "Tuns Gazon",
  "Toaletare Pomi & Arbuști",
  "Tuns Gard Viu",
  "Plantări Profesionale",
  "Montaj Gazon Rulou",
  "Sistem Irigații",
];

export default function Portofoliu() {
  const [active, setActive] = useState("Toate");
  const [selected, setSelected] = useState<Lucrare | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [lucrari, setLucrari] = useState<Lucrare[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/lucrari")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => { setLucrari(Array.isArray(data) ? data : (bundled as Lucrare[])); setLoading(false); })
      .catch(() => { setLucrari(bundled as Lucrare[]); setLoading(false); });
  }, []);

  // Scroll to lucrare if hash exists
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [lucrari]);

  const filtered = active === "Toate"
    ? lucrari
    : lucrari.filter((l) => l.services.some((s) => s.includes(active.replace("Toate", ""))));

  function openLucrare(l: Lucrare) {
    setSelected(l);
    setPhotoIdx(0);
  }

  return (
    <section className="glow-bg pt-40 pb-28">
      <div className="wrap">
        <SectionHead
          as="h1"
          eyebrow="Lucrări"
          title={<>Trage de linie. <em>Diferența</em> vorbește singură.</>}
          lead="Grădini reale din Timișoara și împrejurimi — înainte și după."
        />
        <BeforeAfter />

        <div className="mt-28">
          <SectionHead eyebrow="Proiecte" title={<>Proiecte <em>reale</em>, clienți reali.</>} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {serviceFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                active === f
                  ? "bg-accent text-accent-ink"
                  : "glass !rounded-full text-ink/85 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-12 w-12 text-ink/30 mx-auto mb-3" />
            <p className="text-muted">Nu sunt lucrări în această categorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l) => (
              <button
                key={l.id}
                id={`lucrare-${l.id}`}
                onClick={() => openLucrare(l)}
                className="glass group flex w-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer text-left"
              >
                {/* Cover photo */}
                <div className="h-52 w-full shrink-0 relative overflow-hidden">
                  {l.photos[0] ? (
                    <Image src={l.photos[0]} alt={l.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-[#1f4a2f] to-[#0d2016] flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-white/40" />
                    </div>
                  )}
                  {l.photos.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {l.photos.length} foto
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-extrabold mb-2">
                    {l.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-2 mb-3">
                    {l.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {l.services.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-ink/50">
                    <MapPin className="h-3 w-3" /> {l.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreen && selected?.photos[photoIdx] && (
        <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center" onClick={() => setFullscreen(false)}>
          <Image src={selected.photos[photoIdx]} alt={selected.title} fill className="object-contain" />
          <button onClick={() => setFullscreen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full cursor-pointer z-10" aria-label="Închide">
            <Minimize2 className="h-6 w-6" />
          </button>
          {selected.photos.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setPhotoIdx((p) => (p - 1 + selected.photos.length) % selected.photos.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer z-10"><ChevronLeft className="h-7 w-7" /></button>
              <button onClick={(e) => { e.stopPropagation(); setPhotoIdx((p) => (p + 1) % selected.photos.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer z-10"><ChevronRight className="h-7 w-7" /></button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {selected.photos.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setPhotoIdx(i); }} className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === photoIdx ? "w-8 bg-white" : "w-2.5 bg-white/40"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Lightbox */}
      {selected && !fullscreen && (
        <div className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass !bg-[rgba(10,28,18,.92)] max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Photo gallery */}
            <div className="relative h-72 sm:h-80 cursor-pointer" onClick={() => setFullscreen(true)}>
              {selected.photos[photoIdx] ? (
                <Image src={selected.photos[photoIdx]} alt={selected.title} fill className="object-cover rounded-t-2xl" />
              ) : (
                <div className="h-full bg-gradient-to-br from-[#1f4a2f] to-[#0d2016] rounded-t-2xl" />
              )}

              {/* Fullscreen button */}
              <button onClick={(e) => { e.stopPropagation(); setFullscreen(true); }} className="absolute top-3 left-3 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer z-10" aria-label="Ecran complet">
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Close */}
              <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer z-10" aria-label="Închide">
                <X className="h-5 w-5" />
              </button>

              {/* Nav arrows */}
              {selected.photos.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setPhotoIdx((p) => (p - 1 + selected.photos.length) % selected.photos.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer z-10"><ChevronLeft className="h-5 w-5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setPhotoIdx((p) => (p + 1) % selected.photos.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer z-10"><ChevronRight className="h-5 w-5" /></button>
                </>
              )}

              {/* Photo counter */}
              {selected.photos.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                  {photoIdx + 1} / {selected.photos.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {selected.photos.length > 1 && (
              <div className="flex gap-2 px-6 pt-4 overflow-x-auto">
                {selected.photos.map((p, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)} className={`h-16 w-16 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer ${i === photoIdx ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <Image src={p} alt={`Foto ${i + 1}`} width={64} height={64} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="p-6">
              <h3 className="font-heading font-extrabold text-2xl mb-2">{selected.title}</h3>
              <span className="flex items-center gap-1 text-sm text-ink/50 mb-3">
                <MapPin className="h-4 w-4" /> {selected.location}
              </span>
              <p className="text-muted leading-relaxed mb-4">{selected.description}</p>
              <div>
                <p className="text-xs font-semibold text-leaf mb-2 uppercase tracking-[.14em]">Servicii efectuate</p>
                <div className="flex flex-wrap gap-2">
                  {selected.services.map((s) => (
                    <span key={s} className="chip !text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
