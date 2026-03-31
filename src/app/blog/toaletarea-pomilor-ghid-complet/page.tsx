import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";

export const metadata: Metadata = {
  title: "Toaletarea Pomilor: Când, Cum Și De Ce Este Importantă",
  description: "Ghid complet pentru toaletarea pomilor. Când se taie, ce tehnici se folosesc și cum să eviți greșelile comune.",
};

export default function Page() {
  return (
    <BlogArticle
      title="Toaletarea Pomilor: Când, Cum Și De Ce Este Importantă"
      date="10 Martie 2026"
      readTime="5 min"
      related={[
        { slug: "cum-sa-intretii-gazonul-vara", title: "Cum Să Întreții Gazonul Vara" },
        { slug: "cand-sa-plantezi-gazon-rulou", title: "Când Și Cum Să Plantezi Gazon Rulou" },
      ]}
    >
      <p>
        Toaletarea pomilor nu este doar o chestiune estetică — este esențială
        pentru sănătatea arborelui, producția de fructe și siguranța proprietății.
        Ramurile uscate pot cădea oricând, iar un pom neîntreținut devine un
        risc în zilele cu vânt puternic.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        De Ce Este Importantă Toaletarea
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Sănătate:</strong> Elimină ramurile bolnave sau uscate care pot răspândi boli.</li>
        <li><strong>Productivitate:</strong> Pomii fructiferi produc mai mult și fructe mai mari după tăiere.</li>
        <li><strong>Siguranță:</strong> Previne căderea ramurilor peste casă, mașini sau persoane.</li>
        <li><strong>Estetică:</strong> Un pom bine modelat transformă aspectul întregii grădini.</li>
        <li><strong>Lumină:</strong> Permite luminii solare să ajungă la gazon și plantele de dedesubt.</li>
      </ul>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Când Se Taie Pomii
      </h2>
      <p>
        Fiecare tip de pom are perioada sa optimă de tăiere:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Pomii fructiferi (măr, păr, cireș):</strong> Iarna, în repaus vegetativ (ianuarie-martie), înainte de înmugurire.</li>
        <li><strong>Conifere (brad, pin, tuia):</strong> Sfârșitul primăverii sau începutul verii (mai-iunie).</li>
        <li><strong>Arbori ornamentali (tei, stejar, platan):</strong> Toamna (octombrie-noiembrie) sau iarna.</li>
        <li><strong>Arbuști cu flori de primăvară (forsythia, liliac):</strong> Imediat după înflorire.</li>
        <li><strong>Arbuști cu flori de vară (hortensie, trandafir):</strong> Sfârșitul iernii (februarie-martie).</li>
      </ul>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Tipuri de Tăiere
      </h2>

      <h3 className="font-heading font-semibold text-slate-900 text-lg mt-6 mb-2">
        Tăierea de formare
      </h3>
      <p>
        Se aplică pomilor tineri în primii 3-5 ani. Scopul este de a crea o
        structură solidă de ramuri principale care va susține coroana matură.
      </p>

      <h3 className="font-heading font-semibold text-slate-900 text-lg mt-6 mb-2">
        Tăierea de întreținere
      </h3>
      <p>
        Se aplică anual pomilor maturi. Include eliminarea ramurilor uscate,
        bolnave, care se încrucișează sau cresc spre interior. Menține forma
        și permite circulația aerului în coroană.
      </p>

      <h3 className="font-heading font-semibold text-slate-900 text-lg mt-6 mb-2">
        Tăierea de rejuvenare
      </h3>
      <p>
        Pentru pomii neglijați timp de mai mulți ani. Este o tăiere mai agresivă
        care se face etapizat, pe parcursul a 2-3 ani, pentru a nu stresa pomul.
      </p>

      <h2 className="font-heading font-bold text-slate-900 text-xl mt-8 mb-3">
        Greșeli De Evitat
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Tăierea prea mult:</strong> Nu eliminați mai mult de 25% din coroană într-un singur an.</li>
        <li><strong>Tăierea la ras:</strong> Lăsați întotdeauna „gulerul" ramurii (umflătura de la bază).</li>
        <li><strong>Unelte neascuțite:</strong> Tăieturile zdrobite se vindecă greu și favorizează infecțiile.</li>
        <li><strong>Tăierea în perioada greșită:</strong> Respectați calendarul fiecărei specii.</li>
      </ul>

      <p className="mt-6">
        Pentru pomi mari sau tăieri complexe, recomandăm apelarea la
        profesioniști. O tăiere greșită poate afecta ireversibil sănătatea
        pomului sau poate fi periculoasă fără echipamentul adecvat.
      </p>
    </BlogArticle>
  );
}
