"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/hero-1.jpg",
    label: "Gazon Profesional",
    desc: "Tuns gazon cu dungi perfecte",
  },
  {
    src: "/hero-2.jpg",
    label: "Întreținere Completă",
    desc: "Gazon și gard viu impecabil",
  },
  {
    src: "/hero-3.jpg",
    label: "Amenajare Curte",
    desc: "Pavaje, plantări, design peisagistic",
  },
  {
    src: "/hero-4.jpg",
    label: "Echipă Profesionistă",
    desc: "Lucrăm rapid, curat și cu atenție",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.label}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Label */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="text-white font-heading font-bold text-lg drop-shadow-lg">
            {slide.label}
          </p>
          <p className="text-white/80 text-sm drop-shadow-lg">{slide.desc}</p>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
          aria-label="Următor"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "w-6 bg-amber-400"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
