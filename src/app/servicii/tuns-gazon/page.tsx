import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Tuns Gazon Profesional Timișoara",
  description: "Servicii profesionale de tuns gazon în Timișoara. Echipamente moderne, rezultate impecabile. De la 0.50 lei/mp. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Tuns Gazon Profesional"
      description="Gazon impecabil, tuns cu echipamente profesionale de ultimă generație. Oferim servicii regulate de întreținere sau intervenții punctuale, cu colectarea completă a resturilor vegetale."
      image="/uploads/portfolio/gazon-1.jpg"
      price="De la 0.50 lei/mp (suprafețe mari) până la 1.50 lei/mp"
      features={[
        "Echipament ride-on profesional Viking/Stihl",
        "Tundere cu efect de dungi (striping)",
        "Colectare completă a resturilor vegetale",
        "Contur curat la margini cu trimmer",
        "Abonamente lunare cu preț redus",
        "Intervenții rapide — programare în 2-3 zile",
      ]}
      process={[
        { step: "Evaluare", desc: "Măsurăm suprafața și evaluăm starea gazonului." },
        { step: "Pregătire", desc: "Curățăm zona de obiecte și verificăm echipamentul." },
        { step: "Tundere", desc: "Tundem la înălțimea optimă cu echipament profesional." },
        { step: "Finisare", desc: "Conturăm marginile, colectăm resturile și curățăm." },
      ]}
      faq={[
        { q: "Cât de des trebuie tuns gazonul?", a: "În sezon (aprilie-octombrie), ideal o dată pe săptămână sau la 10-14 zile. Iarna, gazonul nu necesită tundere." },
        { q: "La ce înălțime tundeți?", a: "Recomandăm 3-5 cm în funcție de tipul gazonului și anotimp. Vara menținem mai înalt (5 cm) pentru a proteja rădăcinile." },
        { q: "Oferiți abonamente?", a: "Da! Abonamentele lunare includ 2-4 tunderi pe lună la preț preferențial. Contactați-ne pentru o ofertă personalizată." },
      ]}
    />
  );
}
