"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";

interface Lucrare {
  id: string;
  title: string;
  description: string;
  photos: string[];
  services: string[];
  location: string;
}

export default function LucrariCarousel() {
  const [lucrari, setLucrari] = useState<Lucrare[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/lucrari")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setLucrari(data); })
      .catch(() => {});
  }, []);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (lucrari.length === 0) return null;

  return (
    <section className="py-20 bg-green-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-2">
              Lucrările Noastre
            </h2>
            <p className="text-slate-600 text-lg">
              Cele mai recente proiecte finalizate de echipa noastră.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll("left")} className="h-10 w-10 rounded-full border border-green-200 hover:border-green-400 bg-white text-green-600 flex items-center justify-center cursor-pointer" aria-label="Anterior">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll("right")} className="h-10 w-10 rounded-full border border-green-200 hover:border-green-400 bg-white text-green-600 flex items-center justify-center cursor-pointer" aria-label="Următor">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {lucrari.map((l) => (
            <Link
              key={l.id}
              href={`/portofoliu#lucrare-${l.id}`}
              className="group flex-shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 overflow-hidden snap-start"
            >
              {/* Photo */}
              <div className="h-48 relative overflow-hidden">
                {l.photos[0] ? (
                  <Image src={l.photos[0]} alt={l.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="h-full bg-gradient-to-br from-green-400 to-green-600" />
                )}
                {l.photos.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    +{l.photos.length - 1} foto
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                  {l.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                  {l.description}
                </p>

                {/* Services tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {l.services.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                  {l.services.length > 3 && (
                    <span className="text-xs text-slate-400">+{l.services.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3 w-3" /> {l.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 group-hover:translate-x-1 transition-transform duration-200">
                    Vezi detalii <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/portofoliu" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200">
            Vezi Toate Lucrările
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
