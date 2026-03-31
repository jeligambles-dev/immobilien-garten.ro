import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Tuns Gard Viu Timișoara",
  description: "Tuns și modelare gard viu profesional în Timișoara. Forme geometrice perfecte. De la 5 lei/ml. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Tuns Gard Viu"
      description="Modelare precisă a gardurilor vii, de la forme simple la geometrice complexe. Menținem înălțimea uniformă și densitatea optimă pentru un aspect impecabil tot anul."
      image="/uploads/portfolio/gard-viu-1.jpg"
      price="De la 5 lei/ml până la 15 lei/ml (în funcție de înălțime)"
      features={[
        "Modelare geometrică precisă",
        "Tundere la înălțime uniformă",
        "Echipament profesional (foarfece de gard viu motorizate)",
        "Lucru la înălțime cu scări profesionale",
        "Curățare completă după tundere",
        "Întreținere periodică cu abonament",
      ]}
      process={[
        { step: "Măsurare", desc: "Evaluăm lungimea, înălțimea și starea gardului viu." },
        { step: "Pregătire", desc: "Protejăm zonele adiacente și pregătim echipamentul." },
        { step: "Tundere", desc: "Modelăm gardul viu la forma și înălțimea dorită." },
        { step: "Finisare", desc: "Curățăm resturile și verificăm uniformitatea." },
      ]}
      faq={[
        { q: "Cât de des trebuie tuns gardul viu?", a: "De 2-3 ori pe an: primăvara (aprilie-mai), vara (iulie) și opțional toamna (septembrie). Speciile viguroase pot necesita tunderi mai frecvente." },
        { q: "Ce specii de gard viu tăiați?", a: "Toate speciile: tuia, leyland cypress, laur, buxus, ligustrum, carpinus și multe altele." },
        { q: "Puteți tunde garduri vii foarte înalte?", a: "Da, avem echipament telescopic și scări profesionale pentru garduri de până la 5-6 metri." },
      ]}
    />
  );
}
