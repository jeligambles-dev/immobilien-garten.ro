"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { AREA_COORDS, pinsFor } from "@/lib/areas";
import { MapPin } from "lucide-react";
import { useInView } from "@/components/ui/useInView";
import bundled from "../../data/site-content.json";
import { fetchSiteContent } from "./siteContent";

const FALLBACK: string[] = (bundled as { coveringAreas?: string[] }).coveringAreas ?? ["Timișoara"];

export function useAreas() {
  const [areas, setAreas] = useState<string[]>(FALLBACK);
  useEffect(() => {
    fetchSiteContent().then((d) => {
      if (Array.isArray(d?.coveringAreas) && d.coveringAreas.length) setAreas(d.coveringAreas as string[]);
    });
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
  const box = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  useEffect(() => {
    if (!inView || !box.current) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !box.current) return;
      const pins = pinsFor(areas);
      const center = AREA_COORDS["Timișoara"];
      map = L.map(box.current, {
        center,
        zoom: 11,
        scrollWheelZoom: false, // page scroll must never get trapped by the map
        dragging: !L.Browser.mobile,
        zoomControl: true,
        attributionControl: true,
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 16,
        minZoom: 9,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      L.circle(center, {
        radius: 14000,
        color: "#f5b83d",
        weight: 1.5,
        dashArray: "6 8",
        fillColor: "#8fe0a6",
        fillOpacity: 0.06,
      }).addTo(map);
      for (const p of pins) {
        const main = p.name === "Timișoara";
        L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            className: "garten-pin",
            html: `<span class="garten-pin__dot${main ? " garten-pin__dot--main" : ""}"></span><span class="garten-pin__label${main ? " garten-pin__label--main" : ""}">${p.name}</span>`,
            iconSize: [0, 0],
          }),
          keyboard: false,
        }).addTo(map);
      }
      if (pins.length > 1) map.fitBounds(L.latLngBounds(pins.map((p) => [p.lat, p.lng] as [number, number])).pad(0.25));
    })();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [inView, areas]);

  return (
    <div ref={ref} className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-white/15 shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)] lg:aspect-square">
      <div ref={box} className="garten-map absolute inset-0" role="img" aria-label={`Hartă zona de acoperire: ${areas.join(", ")}`} />
    </div>
  );
}
