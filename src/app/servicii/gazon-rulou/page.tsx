import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Montaj Gazon Rulou și Artificial Timișoara",
  description: "Montaj gazon rulou natural și artificial premium în Timișoara. Pregătire teren inclusă. De la 20 lei/mp. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Montaj Gazon Rulou & Artificial"
      description="Montaj profesional de gazon rulou natural sau gazon artificial premium. Pregătirea terenului este inclusă: nivelare, substrat, compactare. Rezultat instant — gazon verde din prima zi."
      image="/uploads/portfolio/echipament-1.jpg"
      price="Gazon rulou: 20-35 lei/mp | Gazon artificial: 40-80 lei/mp"
      features={[
        "Gazon rulou natural — soi rezistent, grosime uniformă",
        "Gazon artificial premium — UV rezistent, 10+ ani durabilitate",
        "Pregătire completă a terenului (nivelare, substrat, compactare)",
        "Montaj profesional fără rosturi vizibile",
        "Sistem drenaj integrat (gazon artificial)",
        "Transport inclus în Timișoara și împrejurimi",
      ]}
      process={[
        { step: "Măsurare", desc: "Venim la fața locului, măsurăm suprafața și evaluăm terenul." },
        { step: "Pregătire", desc: "Săpăm, nivelăm, adăugăm substrat și compactăm." },
        { step: "Montaj", desc: "Montăm gazonul rulou/artificial cu precizie, fără rosturi." },
        { step: "Predare", desc: "Udăm abundent (rulou) și oferim instrucțiuni de îngrijire." },
      ]}
      faq={[
        { q: "Cât durează montajul?", a: "Pentru 100-200 mp, lucrarea se finalizează în 1-2 zile, inclusiv pregătirea terenului." },
        { q: "Gazonul rulou prinde ușor?", a: "Da, cu udare corectă (de 2 ori pe zi în primele 2 săptămâni), gazonul se înrădăcinează complet în 2-3 săptămâni." },
        { q: "Ce avantaje are gazonul artificial?", a: "Zero întreținere, fără udare, aspect verde tot anul, durabilitate 10+ ani. Ideal pentru zone cu umbră sau trafic intens." },
      ]}
    />
  );
}
