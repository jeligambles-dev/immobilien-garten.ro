import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { Clock, ArrowRight } from "lucide-react";

const IMG: Record<string, string> = {
  "cum-sa-intretii-gazonul-vara": "/img/services/tuns-gazon-poster.webp",
  "ghid-sistem-irigatii": "/img/services/irigatii-poster.webp",
  "cand-sa-plantezi-gazon-rulou": "/img/services/gazon-rulou-poster.webp",
  "toaletarea-pomilor-ghid-complet": "/img/services/toaletare-pomi-poster.webp",
};

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
    <section className="glow-bg pb-28 pt-40">
      <div className="wrap">
        <SectionHead
          as="h1"
          eyebrow="Blog & sfaturi"
          title={<>Sfaturi de la <em>profesioniști</em>.</>}
          lead="Articole practice despre îngrijirea grădinii și ghiduri pas cu pas."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 2) * 80}>
              <Link href={`/blog/${a.slug}`} className="glass group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <span className="relative block aspect-[16/8] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG[a.slug]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col p-7">
                  <span className="mb-3 flex items-center gap-3 text-xs text-ink/55">
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.readTime}</span>
                  </span>
                  <h2 className="mb-3 text-2xl font-extrabold leading-tight">{a.title}</h2>
                  <span className="mb-5 flex-1 leading-relaxed text-muted">{a.excerpt}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Citește mai mult <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
