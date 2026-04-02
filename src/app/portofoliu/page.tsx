"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ImageIcon, MapPin, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { SkeletonGrid } from "@/components/Skeleton";

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
      .then((r) => r.json())
      .then((data) => { setLucrari(data); setLoading(false); })
      .catch(() => setLoading(false));
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
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Portofoliu — Lucrările Noastre
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Fiecare proiect este o dovadă a pasiunii și profesionalismului nostru.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {serviceFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                active === f
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
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
            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Nu sunt lucrări în această categorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l) => (
              <button
                key={l.id}
                id={`lucrare-${l.id}`}
                onClick={() => openLucrare(l)}
                className="group rounded-2xl overflow-hidden border border-green-100 hover:border-green-300 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 cursor-pointer text-left bg-white"
              >
                {/* Cover photo */}
                <div className="h-52 relative overflow-hidden">
                  {l.photos[0] ? (
                    <Image src={l.photos[0]} alt={l.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
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
                  <h3 className="font-heading font-semibold text-slate-900 mb-2">
                    {l.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                    {l.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {l.services.map((s) => (
                      <span key={s} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Photo gallery */}
            <div className="relative h-72 sm:h-80 cursor-pointer" onClick={() => setFullscreen(true)}>
              {selected.photos[photoIdx] ? (
                <Image src={selected.photos[photoIdx]} alt={selected.title} fill className="object-cover rounded-t-2xl" />
              ) : (
                <div className="h-full bg-gradient-to-br from-green-400 to-green-600 rounded-t-2xl" />
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
                  <button key={i} onClick={() => setPhotoIdx(i)} className={`h-16 w-16 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer ${i === photoIdx ? "border-green-500" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <Image src={p} alt={`Foto ${i + 1}`} width={64} height={64} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="p-6">
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">{selected.title}</h3>
              <span className="flex items-center gap-1 text-sm text-slate-400 mb-3">
                <MapPin className="h-4 w-4" /> {selected.location}
              </span>
              <p className="text-slate-600 leading-relaxed mb-4">{selected.description}</p>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">Servicii efectuate:</p>
                <div className="flex flex-wrap gap-2">
                  {selected.services.map((s) => (
                    <span key={s} className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
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
