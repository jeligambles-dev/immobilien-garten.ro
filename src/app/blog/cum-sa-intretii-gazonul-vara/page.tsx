import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";

export const metadata: Metadata = {
  title: "Cum Să Întreții Gazonul Vara — Ghid Complet",
  description: "Sfaturi practice pentru un gazon verde și sănătos vara. Udare, tundere, fertilizare — totul pas cu pas.",
};

export default function Page() {
  return (
    <BlogArticle
      title="Cum Să Întreții Gazonul Vara — Ghid Complet"
      date="25 Martie 2026"
      readTime="5 min"
      related={[
        { slug: "cand-sa-plantezi-gazon-rulou", title: "Când Și Cum Să Plantezi Gazon Rulou" },
        { slug: "ghid-sistem-irigatii", title: "Cum Să Alegi Sistemul de Irigații Potrivit" },
      ]}
    >
      <p>
        Vara este perioada cea mai dificilă pentru gazon. Temperaturile ridicate,
        lipsa precipitațiilor și utilizarea intensă pot transforma un covor verde
        într-un teren ars în doar câteva săptămâni. Cu câteva reguli simple însă,
        gazonul tău poate rămâne sănătos și atractiv pe toată durata verii.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Udarea Corectă — Regula De Aur
      </h2>
      <p>
        Cea mai frecventă greșeală este udarea superficială și frecventă. În loc
        să uzi puțin în fiecare zi, este mult mai eficient să uzi abundent de 2-3
        ori pe săptămână. Apa trebuie să pătrundă cel puțin 10-15 cm în sol pentru
        a stimula rădăcinile să crească în adâncime.
      </p>
      <p>
        Cel mai bun moment pentru udare este dimineața devreme (6:00-9:00). Udarea
        seara favorizează apariția bolilor fungice, iar la prânz apa se evaporă
        prea rapid. Un sistem de irigații automat programat dimineața este soluția
        ideală.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Tunderea Vara — Nu Tunde Prea Scurt
      </h2>
      <p>
        Vara, gazonul trebuie menținut la o înălțime de minimum 5 cm. Un gazon mai
        înalt face umbră solului, reduce evaporarea apei și descurajează creșterea
        buruienilor. Evitați să tăiați mai mult de o treime din înălțimea firului
        de iarbă la o singură tundere.
      </p>
      <p>
        Tundeți preferabil seara sau în zile noroase. Tunderea în căldura zilei
        stresează gazonul și poate cauza arsuri pe vârfurile tăiate.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Fertilizarea De Vară
      </h2>
      <p>
        Aplicați un îngrășământ cu eliberare lentă la începutul verii (iunie).
        Evitați fertilizarea în perioadele de caniculă extremă (peste 35°C), deoarece
        poate arde gazonul. Alegeți un îngrășământ bogat în potasiu, care ajută
        iarba să reziste mai bine la secetă și căldură.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Probleme Frecvente Vara
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Pete galbene:</strong> De obicei din cauza udării insuficiente sau neuniforme. Verificați sistemul de irigații.</li>
        <li><strong>Buruieni:</strong> Un gazon dens și sănătos este cea mai bună apărare. Extrageți buruienile manual sau aplicați erbicid selectiv.</li>
        <li><strong>Ciuperci:</strong> Apar din cauza umidității excesive. Reduceți frecvența udării și asigurați aerisire bună.</li>
        <li><strong>Zone compactate:</strong> Aerisirea (cu furca sau scarificatorul) ajută apa și nutrienții să ajungă la rădăcini.</li>
      </ul>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Rezumat — Checklist Vara
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Udați abundent de 2-3 ori pe săptămână, dimineața</li>
        <li>Mențineți înălțimea de tundere la minimum 5 cm</li>
        <li>Fertilizați cu îngrășământ cu eliberare lentă în iunie</li>
        <li>Nu tundeți în căldura maximă a zilei</li>
        <li>Aerisirea ajută în zonele compactate</li>
      </ul>
    </BlogArticle>
  );
}
