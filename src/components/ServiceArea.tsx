"use client";

import { useState, useEffect } from "react";
import { Phone, MapPin } from "lucide-react";

const fallbackAreas = ["Timișoara", "Dumbrăvița", "Giroc", "Moșnița", "Ghiroda", "Săcălaz", "Sânmihaiu Român"];

export default function ServiceArea() {
  const [areas, setAreas] = useState<string[]>(fallbackAreas);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => { if (data.coveringAreas?.length) setAreas(data.coveringAreas); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-green-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-3">
              Zona de Acoperire
            </h2>
            <p className="text-green-200 leading-relaxed mb-4">
              Oferim servicii în Timișoara și împrejurimi, inclusiv:
            </p>
            <div className="flex flex-wrap gap-2">
              {areas.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1 text-sm bg-green-700/60 text-green-100 px-3 py-1.5 rounded-full"
                >
                  <MapPin className="h-3 w-3" />
                  {loc}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <a
              href="tel:0747469681"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold px-6 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              Sună Acum
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
