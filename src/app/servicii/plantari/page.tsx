import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Plantări Profesionale Timișoara",
  description: "Plantări profesionale de flori, arbuști și copaci în Timișoara. Design peisagistic complet. De la 15 lei/mp. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Plantări Profesionale"
      description="Serviciu complet de plantare: de la design peisagistic până la plantarea efectivă de flori, arbuști, copaci și plante ornamentale. Creăm grădina visurilor tale cu plante selectate pentru clima Timișoarei."
      image="/uploads/portfolio/plantari-1.jpg"
      price="De la 15 lei/mp până la 40 lei/mp (include plante + manoperă)"
      features={[
        "Design peisagistic personalizat",
        "Selecție plante adaptate climei locale",
        "Pregătire teren și substrat nutritiv",
        "Plantare profesională cu fixare",
        "Mulcire cu scoarță decorativă",
        "Sfaturi detaliate pentru întreținere",
      ]}
      process={[
        { step: "Consultanță", desc: "Discutăm preferințele, evaluăm terenul și expunerea la soare." },
        { step: "Design", desc: "Propunem un plan de plantare cu specii și aranjament." },
        { step: "Plantare", desc: "Pregătim solul, plantăm și fixăm fiecare plantă." },
        { step: "Finisare", desc: "Aplicăm mulci, udăm și oferim instrucțiuni de îngrijire." },
      ]}
      faq={[
        { q: "Ce plante recomandați pentru Timișoara?", a: "Lavandă, rozmarin, tuia, buxus, hortensie, ierburi ornamentale — toate rezistente la clima continentală." },
        { q: "Includeți și plantele în preț?", a: "Da, prețul include plantele, substratul și manopera. Putem lucra și cu plante cumpărate de client." },
        { q: "Oferiți garanție pentru plante?", a: "Oferim garanție pentru plantele achiziționate de noi, cu condiția respectării instrucțiunilor de îngrijire." },
      ]}
    />
  );
}
