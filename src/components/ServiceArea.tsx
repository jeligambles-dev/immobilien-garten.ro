"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useInView } from "@/components/ui/useInView";
import bundled from "../../data/site-content.json";

const FALLBACK: string[] = (bundled as { coveringAreas?: string[] }).coveringAreas ?? ["Timișoara"];

/** Approximate positions (% of the map box) around Timișoara. */
const POS: Record<string, [number, number]> = {
  Timișoara: [50, 50],
  Dumbrăvița: [58, 30],
  Ghiroda: [74, 40],
  Giroc: [58, 72],
  Moșnița: [75, 66],
  Săcălaz: [22, 40],
  "Sânmihaiu Român": [26, 72],
};

function place(areas: string[]) {
  const unknown = areas.filter((a) => !POS[a]);
  return areas.map((a) => {
    if (POS[a]) return { a, x: POS[a][0], y: POS[a][1] };
    // unknown names: spread evenly on the outer ring
    const k = unknown.indexOf(a);
    const ang = (k / Math.max(1, unknown.length)) * Math.PI * 2 - Math.PI / 2;
    return { a, x: 50 + Math.cos(ang) * 32.5, y: 50 + Math.sin(ang) * 32.5 };
  });
}

export function useAreas() {
  const [areas, setAreas] = useState<string[]>(FALLBACK);
  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (Array.isArray(d?.coveringAreas) && d.coveringAreas.length) setAreas(d.coveringAreas);
      })
      .catch(() => {});
  }, []);
  return areas;
}

export function AreaChips({ areas }: { areas: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {areas.map((a) => (
        <span key={a} className="chip inline-flex items-center gap-1.5 !px-3.5 !py-2 !text-sm">
          <MapPin className="h-3.5 w-3.5" /> {a}
        </span>
      ))}
    </div>
  );
}

export default function ServiceArea({ areas }: { areas: string[] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="area-glow">
            <stop offset="0" stopColor="#8fe0a6" stopOpacity=".35" />
            <stop offset="1" stopColor="#8fe0a6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#area-glow)" />
        <g fill="none" stroke="rgba(143,224,166,.25)" strokeDasharray="3 6">
          <circle cx="200" cy="200" r="70" />
          <circle cx="200" cy="200" r="130" />
          <circle cx="200" cy="200" r="185" />
        </g>
        <circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="#f5b83d"
          strokeWidth="1.5"
          strokeDasharray="820"
          strokeDashoffset={inView ? 0 : 820}
          style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
      {place(areas).map(({ a, x, y }) => (
        <span
          key={a}
          className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
            a === "Timișoara" ? "bg-accent text-sm text-accent-ink" : "glass !rounded-full"
          }`}
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          {a}
        </span>
      ))}
    </div>
  );
}
