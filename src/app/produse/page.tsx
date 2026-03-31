"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  TreePine,
  Sprout,
  Droplets,
  Leaf,
  Package,
  Phone,
  Wrench,
  ArrowRight,
} from "lucide-react";

const tabs = ["Servicii", "Produse"];

const servicii = [
  {
    icon: Scissors,
    title: "Tuns Gazon",
    price: "De la 0.50 lei/mp",
    desc: "Tundere profesională cu echipamente de ultimă generație. Include colectarea resturilor vegetale.",
    features: ["Echipament profesional", "Colectare resturi", "Contur curat la margini"],
    href: "/servicii/tuns-gazon",
  },
  {
    icon: Leaf,
    title: "Scarificare & Aerisire",
    price: "De la 1 leu/mp",
    desc: "Regenerarea gazonului prin eliminarea mușchiului și a stratului de feltru acumulat.",
    features: ["Eliminare mușchi", "Aerisire profundă", "Rezultate vizibile rapid"],
    href: "/servicii/scarificare",
  },
  {
    icon: TreePine,
    title: "Toaletare Pomi & Arbuști",
    price: "De la 50 lei/buc",
    desc: "Tăiere profesională, modelare și întreținere pentru un aspect sănătos și estetic.",
    features: ["Tăiere de formare", "Eliminare ramuri uscate", "Modelare"],
    href: "/servicii/toaletare-pomi",
  },
  {
    icon: Sprout,
    title: "Tuns Gard Viu",
    price: "De la 5 lei/ml",
    desc: "Modelare precisă a gardurilor vii, de la forme simple la geometrice complexe.",
    features: ["Forme geometrice", "Curățare", "Înălțimi uniforme"],
    href: "/servicii/gard-viu",
  },
  {
    icon: Wrench,
    title: "Plantări Profesionale",
    price: "De la 15 lei/mp",
    desc: "Serviciu complet de plantare: flori, arbuști, copaci, plante ornamentale.",
    features: ["Design peisagistic", "Plantare & fixare", "Sfaturi întreținere"],
    href: "/servicii/plantari",
  },
  {
    icon: Droplets,
    title: "Sisteme de Irigații",
    price: "De la 8 lei/mp",
    desc: "Proiectare, montaj și întreținere sisteme automate de irigații.",
    features: ["Proiectare personalizată", "Montaj profesional", "Garanție"],
    href: "/servicii/irigatii",
  },
];

const produse = [
  {
    icon: Package,
    title: "Îngrășământ Universal",
    price: "Preț la cerere",
    desc: "Îngrășământ NPK de calitate superioară pentru gazon, flori și legume.",
    features: ["Eliberare lentă", "Eficient 3 luni", "Ecologic"],
  },
  {
    icon: Leaf,
    title: "Gazon Rulou Natural",
    price: "Preț/mp la cerere",
    desc: "Gazon natural premium, pregătit pentru montaj imediat.",
    features: [
      "Soi rezistent",
      "Grosime uniformă",
      "Transport inclus*",
    ],
  },
  {
    icon: Leaf,
    title: "Gazon Artificial Premium",
    price: "Preț/mp la cerere",
    desc: "Gazon artificial de înaltă densitate, aspect natural, durabilitate 10+ ani.",
    features: ["UV rezistent", "Drenaj integrat", "Fără întreținere"],
  },
  {
    icon: Sprout,
    title: "Pământ Vegetal & Substrat",
    price: "Preț la cerere",
    desc: "Pământ vegetal cernut și substrat nutritiv pentru plantări de calitate.",
    features: ["Cernut fin", "Bogat în nutrienți", "Livrare"],
  },
  {
    icon: Droplets,
    title: "Componente Irigații",
    price: "Preț la cerere",
    desc: "Aspersoare, electrovalve, programatoare și țevi pentru sisteme de irigații.",
    features: ["Branduri de top", "Consultanță", "Montaj opțional"],
  },
  {
    icon: Package,
    title: "Scoarță Decorativă & Pietriș",
    price: "Preț la cerere",
    desc: "Scoarță de pin, pietriș alb, pietriș decorativ pentru amenajări moderne.",
    features: ["Diverse culori", "Cantități mari", "Transport"],
  },
];

export default function Produse() {
  const [tab, setTab] = useState("Servicii");
  const items = tab === "Servicii" ? servicii : produse;

  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Produse & Servicii
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tot ce ai nevoie pentru o grădină perfectă — de la servicii
            profesionale la materiale de calitate.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
                tab === t
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-200 p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  {item.price}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                {item.desc}
              </p>
              <ul className="space-y-1.5 mb-5">
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <a
                  href="tel:0747469681"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  Solicită Ofertă
                </a>
                {"href" in item && (item as { href?: string }).href ? (
                  <Link
                    href={(item as { href: string }).href}
                    className="flex items-center justify-center gap-1 border border-green-200 hover:border-green-400 text-green-600 font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors duration-200"
                  >
                    Detalii
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
