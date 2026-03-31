"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const comparisons = [
  {
    id: 1,
    label: "Amenajare Grădină cu Pietriș",
    desc: "De la teren gol cu barieră anti-buruieni la grădină decorativă cu pietriș, lavandă și elemente ornamentale.",
    before: "/uploads/portfolio/before-gravel.jpg",
    after: "/uploads/portfolio/after-gravel.jpg",
  },
  {
    id: 2,
    label: "Regenerare Gazon",
    desc: "Gazon deteriorat și plin de pete transformate într-un covor verde uniform, tuns profesional.",
    before: "/uploads/portfolio/before-lawn.jpg",
    after: "/uploads/portfolio/after-lawn.jpg",
  },
  {
    id: 3,
    label: "Curățare și Întreținere Curte",
    desc: "Zonă cu buruieni și pietriș neglijat transformată în gazon impecabil cu gard viu.",
    before: "/uploads/portfolio/before-fence.jpg",
    after: "/uploads/portfolio/after-fence.jpg",
  },
];

export default function BeforeAfter() {
  const [current, setCurrent] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const pair = comparisons[current];

  function handleMove(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (!isDragging) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pos)));
  }

  function next() {
    setCurrent((c) => (c + 1) % comparisons.length);
    setSliderPos(50);
  }

  function prev() {
    setCurrent((c) => (c - 1 + comparisons.length) % comparisons.length);
    setSliderPos(50);
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Înainte & După
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Trage slider-ul pentru a vedea transformarea. Rezultate reale, clienți mulțumiți.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Slider container */}
          <div
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl border border-green-100"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* After (full background) */}
            <div className="absolute inset-0">
              <Image
                src={pair.after}
                alt={`După: ${pair.label}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                DUPĂ
              </div>
            </div>

            {/* Before (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image
                src={pair.before}
                alt={`Înainte: ${pair.label}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                ÎNAINTE
              </div>
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                <div className="flex items-center gap-0.5 text-green-700">
                  <ChevronLeft className="h-5 w-5" />
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Info + navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-green-200 hover:border-green-400 text-green-600 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-center flex-1 px-4">
              <h3 className="font-heading font-semibold text-slate-900">
                {pair.label}
              </h3>
              <p className="text-slate-500 text-sm mt-1">{pair.desc}</p>
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-green-200 hover:border-green-400 text-green-600 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Următor"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {comparisons.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setSliderPos(50);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 bg-green-600"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Comparație ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
