import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";

export const metadata: Metadata = {
  title: "Când Și Cum Să Plantezi Gazon Rulou — Tot Ce Trebuie Să Știi",
  description: "Ghid complet pentru montajul gazonului rulou. Când este momentul ideal, cum pregătești terenul și cum îngrijești gazonul nou.",
};

export default function Page() {
  return (
    <BlogArticle
      title="Când Și Cum Să Plantezi Gazon Rulou"
      date="15 Martie 2026"
      readTime="5 min"
      related={[
        { slug: "cum-sa-intretii-gazonul-vara", title: "Cum Să Întreții Gazonul Vara" },
        { slug: "ghid-sistem-irigatii", title: "Cum Să Alegi Sistemul de Irigații Potrivit" },
      ]}
    >
      <p>
        Gazonul rulou este cea mai rapidă metodă de a obține un covor verde
        perfect. Spre deosebire de semănat, unde aștepți 6-8 săptămâni, gazonul
        rulou oferă rezultate din prima zi. Însă montajul corect face diferența
        între un gazon care prinde și unul care se usucă.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Când Este Momentul Ideal
      </h2>
      <p>
        Cele mai bune perioade pentru montaj sunt primăvara (martie-mai) și toamna
        (septembrie-octombrie). Temperaturile moderate și precipitațiile naturale
        ajută gazonul să se înrădăcineze rapid.
      </p>
      <p>
        Montajul se poate face și vara, dar necesită udare mult mai frecventă
        (de 2-3 ori pe zi în primele 2 săptămâni). Evitați montajul când
        temperaturile depășesc 35°C.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Pregătirea Terenului — Pasul Cel Mai Important
      </h2>
      <p>
        80% din succesul gazonului rulou depinde de pregătirea terenului. Iată pașii:
      </p>
      <ol className="list-decimal pl-5 space-y-2">
        <li><strong>Curățare:</strong> Eliminați pietre, rădăcini, buruieni și resturi vegetale.</li>
        <li><strong>Nivelare:</strong> Nivelați terenul cu grebla, asigurând o ușoară pantă de scurgere (1-2%) dinspre casă.</li>
        <li><strong>Substrat:</strong> Adăugați un strat de 3-5 cm de pământ vegetal cernut sau amestec special pentru gazon.</li>
        <li><strong>Compactare:</strong> Rulați terenul cu un rulou de grădină pentru a elimina buzunarele de aer.</li>
        <li><strong>Udare:</strong> Udați ușor terenul cu o zi înainte de montaj.</li>
      </ol>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Montajul Propriu-Zis
      </h2>
      <p>
        Gazonul rulou trebuie montat în ziua livrării — nu îl lăsați rulat mai
        mult de 24 de ore. Începeți de la marginea cea mai dreaptă și montați
        fâșiile în rânduri paralele, decalate (ca cărămizile). Apăsați bine
        marginile pentru a elimina spațiile dintre fâșii.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Îngrijirea În Primele 3 Săptămâni
      </h2>
      <p>
        Aceasta este perioada critică. Respectați aceste reguli:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Săptămâna 1-2:</strong> Udați de 2 ori pe zi (dimineața și seara), 15-20 min per zonă.</li>
        <li><strong>Săptămâna 3:</strong> Reduceți la o dată pe zi. Testați dacă gazonul s-a prins trăgând ușor de un colț.</li>
        <li><strong>După 3 săptămâni:</strong> Treceți la programul normal (2-3 ori/săptămână).</li>
        <li><strong>Prima tundere:</strong> Când gazonul atinge 7-8 cm (de obicei după 2-3 săptămâni). Tundeți la 5 cm.</li>
        <li><strong>Nu călcați:</strong> Evitați traficul pe gazon în primele 2 săptămâni.</li>
      </ul>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Costuri Orientative
      </h2>
      <p>
        În zona Timișoarei, montajul complet (pregătire teren + gazon + montaj)
        costă între 20-35 lei/mp. Pentru o curte de 200 mp, bugetul orientativ
        este de 4.000-7.000 lei.
      </p>
    </BlogArticle>
  );
}
