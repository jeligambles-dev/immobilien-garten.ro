import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";

export const metadata: Metadata = {
  title: "Ghid: Cum Să Alegi Sistemul de Irigații Potrivit",
  description: "Aspersoare, picurare sau smart? Ghid complet pentru alegerea sistemului de irigații perfect pentru grădina ta.",
};

export default function Page() {
  return (
    <BlogArticle
      title="Cum Să Alegi Sistemul de Irigații Potrivit"
      date="20 Martie 2026"
      readTime="6 min"
      related={[
        { slug: "cum-sa-intretii-gazonul-vara", title: "Cum Să Întreții Gazonul Vara" },
        { slug: "cand-sa-plantezi-gazon-rulou", title: "Când Și Cum Să Plantezi Gazon Rulou" },
      ]}
    >
      <p>
        Un sistem de irigații bine proiectat nu este un lux — este o investiție
        care economisește apă, timp și bani pe termen lung. În clima Timișoarei,
        cu veri tot mai calde și perioade lungi fără precipitații, irigarea
        automată face diferența între o grădină verde și una uscată.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Tipuri de Sisteme de Irigații
      </h2>

      <h3 className="font-heading font-semibold text-slate-900 text-lg mt-6 mb-2">
        1. Aspersoare Pop-Up
      </h3>
      <p>
        Ideale pentru gazon și suprafețe mari deschise. Se ridică din pământ doar
        în timpul funcționării și acoperă raze de 3-15 metri. Sunt cele mai
        populare pentru grădinile rezidențiale și oferă o acoperire uniformă.
      </p>

      <h3 className="font-heading font-semibold text-slate-900 text-lg mt-6 mb-2">
        2. Sistem de Picurare (Drip)
      </h3>
      <p>
        Perfect pentru straturi de flori, arbuști, grădini de legume și jardiniere.
        Livrează apa direct la rădăcina plantei, cu pierderi minime prin evaporare.
        Economisește până la 50% din apă comparativ cu aspersoarele.
      </p>

      <h3 className="font-heading font-semibold text-slate-900 text-lg mt-6 mb-2">
        3. Micro-aspersoare
      </h3>
      <p>
        Un compromis între aspersoare și picurare. Acoperă zone mici (1-5 mp)
        și sunt ideale pentru straturi mixte cu plante de dimensiuni diferite.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Cum Proiectezi Corect
      </h2>
      <p>
        Un sistem eficient se bazează pe împărțirea grădinii în zone cu nevoi
        similare de apă. Gazonul, straturile de flori și arbuștii au nevoi diferite
        și nu trebuie udate în același circuit.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Zona gazon:</strong> Aspersoare pop-up, 20-30 min/sesiune, 3x/săptămână</li>
        <li><strong>Zona arbuști:</strong> Picurare sau micro-aspersoare, 45-60 min, 2x/săptămână</li>
        <li><strong>Zona flori:</strong> Picurare, 15-20 min, zilnic vara</li>
        <li><strong>Zona umbră:</strong> Reducere cu 30-50% față de zona însorită</li>
      </ul>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Smart Irrigation — Merită?
      </h2>
      <p>
        Programatoarele WiFi (Hunter HC, Rain Bird ESP-TM2) permit controlul de pe
        telefon și ajustare automată în funcție de vreme. Senzorii de ploaie opresc
        sistemul automat când plouă, economisind apă și bani. Pentru o grădină
        medie, investiția se recuperează în 1-2 sezoane prin economia de apă.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Costuri Orientative (Timișoara)
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Sistem complet pentru 200 mp gazon: 2.500-4.000 lei</li>
        <li>Adăugare zone picurare: +500-1.000 lei/zonă</li>
        <li>Programator smart WiFi: 400-800 lei</li>
        <li>Senzor de ploaie: 150-300 lei</li>
        <li>Întreținere anuală (pornire primăvară + iernare): 200-400 lei</li>
      </ul>
    </BlogArticle>
  );
}
