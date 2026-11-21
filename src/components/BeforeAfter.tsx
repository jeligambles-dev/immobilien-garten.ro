"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import bundled from "../../data/site-content.json";
import { fetchSiteContent } from "./siteContent";

interface Comparison {
  id: string;
  label: string;
  desc: string;
  before: string;
  after: string;
}

const FALLBACK = ((bundled as { beforeAfter?: Comparison[] }).beforeAfter ?? []) as Comparison[];

export default function BeforeAfter() {
  const [items, setItems] = useState<Comparison[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    fetchSiteContent().then((d) => {
      if (Array.isArray(d?.beforeAfter) && d.beforeAfter.length) setItems(d.beforeAfter as Comparison[]);
    });
  }, []);

  const pair = items[Math.min(current, items.length - 1)];
  if (!pair) return null;

  const setFrom = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFrom(e);
        }}
        onPointerMove={(e) => dragging.current && setFrom(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        role="slider"
        aria-label="Comparație înainte și după"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        <Image src={pair.before} alt={`Înainte — ${pair.label}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={pair.after} alt={`După — ${pair.label}`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" draggable={false} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md">Înainte</span>
        <span className="absolute right-4 top-4 rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-accent-ink">După</span>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,.4)]" style={{ left: `${pos}%` }}>
          <span className="glass absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center !rounded-full">
            <MoveHorizontal className="h-6 w-6" />
          </span>
        </div>
      </div>

      <div className="glass flex flex-col gap-3 p-6 sm:p-8">
        {items.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              setCurrent(i);
              setPos(50);
            }}
            className={`rounded-[18px] border px-5 py-4 text-left transition-colors ${
              i === current ? "border-accent/60 bg-white/10" : "border-white/10 hover:bg-white/5"
            }`}
          >
            <b className="mb-1 block font-heading text-lg">{c.label}</b>
            {i === current && <span className="block text-sm leading-relaxed text-muted">{c.desc}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
