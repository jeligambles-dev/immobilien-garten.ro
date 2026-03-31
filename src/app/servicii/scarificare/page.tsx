import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Scarificare & Aerisire Gazon Timișoara",
  description: "Scarificare și aerisire profesională a gazonului în Timișoara. Eliminăm mușchiul și regenerăm gazonul. De la 1 leu/mp. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Scarificare & Aerisire"
      description="Regenerăm gazonul prin eliminarea mușchiului, a feltru-lui și a resturilor vegetale acumulate. Aerisirea permite rădăcinilor să respire și să absoarbă nutrienții eficient."
      image="/uploads/portfolio/gazon-2.jpg"
      price="De la 1 leu/mp până la 2.50 lei/mp"
      features={[
        "Scarificare mecanică profesională",
        "Aerisire prin perforare la adâncime",
        "Eliminare completă a mușchiului",
        "Îndepărtare strat de feltru acumulat",
        "Recomandări pentru supraînsămânțare",
        "Rezultate vizibile în 2-3 săptămâni",
      ]}
      process={[
        { step: "Diagnostic", desc: "Evaluăm starea gazonului și gradul de compactare." },
        { step: "Scarificare", desc: "Trecem cu scarificatorul pentru a elimina mușchiul și feltru-l." },
        { step: "Aerisire", desc: "Perforăm solul pentru a permite circulația aerului." },
        { step: "Finalizare", desc: "Colectăm deșeurile și recomandăm pașii următori." },
      ]}
      faq={[
        { q: "Când este cel mai bun moment pentru scarificare?", a: "Primăvara (martie-aprilie) și toamna (septembrie-octombrie) sunt perioadele ideale, când gazonul crește activ." },
        { q: "Cât durează recuperarea gazonului?", a: "Gazonul poate arăta mai rău în primele 7-10 zile, dar se regenerează complet în 2-4 săptămâni cu udare regulată." },
        { q: "Trebuie să supraînsămânțez după scarificare?", a: "Recomandăm supraînsămânțarea pentru a umple zonele rare. Putem face acest lucru ca serviciu adițional." },
      ]}
    />
  );
}
