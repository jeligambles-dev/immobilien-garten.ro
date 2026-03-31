import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "cum-sa-intretii-gazonul-vara",
    title: "Cum Să Întreții Gazonul Vara — Ghid Complet",
    excerpt: "Vara este perioada cea mai solicitantă pentru gazon. Află cum să menții un gazon verde și sănătos chiar și la temperaturi de 35°C+.",
    date: "25 Martie 2026",
    readTime: "5 min",
  },
  {
    slug: "ghid-sistem-irigatii",
    title: "Ghid: Cum Să Alegi Sistemul de Irigații Potrivit",
    excerpt: "Aspersoare, picurare sau sistem inteligent? Află care este soluția ideală pentru grădina ta și cum economisești apă.",
    date: "20 Martie 2026",
    readTime: "6 min",
  },
  {
    slug: "cand-sa-plantezi-gazon-rulou",
    title: "Când Și Cum Să Plantezi Gazon Rulou — Tot Ce Trebuie Să Știi",
    excerpt: "Gazonul rulou oferă rezultate instantanee, dar montajul corect face diferența. Află când este momentul ideal și ce pași trebuie urmați.",
    date: "15 Martie 2026",
    readTime: "5 min",
  },
  {
    slug: "toaletarea-pomilor-ghid-complet",
    title: "Toaletarea Pomilor: Când, Cum Și De Ce Este Importantă",
    excerpt: "Tăierea corectă a pomilor le prelungește viața și îmbunătățește aspectul grădinii. Ghid complet pentru toaletare profesională.",
    date: "10 Martie 2026",
    readTime: "5 min",
  },
];

export default function Blog() {
  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Blog & Sfaturi
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Articole practice despre îngrijirea grădinii, sfaturi de la
            profesioniști și ghiduri pas cu pas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group bg-white rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-200 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span>{a.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {a.readTime}
                </span>
              </div>
              <h2 className="font-heading font-semibold text-slate-900 text-lg mb-2 group-hover:text-green-600 transition-colors duration-200">
                {a.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">
                {a.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                Citește mai mult
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
