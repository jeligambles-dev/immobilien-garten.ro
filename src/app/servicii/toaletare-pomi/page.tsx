import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Toaletare Pomi și Arbuști Timișoara",
  description: "Toaletare profesională a pomilor și arbuștilor în Timișoara. Tăiere de formare, eliminare ramuri uscate. De la 50 lei/buc. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Toaletare Pomi & Arbuști"
      description="Tăiere profesională, modelare și întreținere a pomilor și arbuștilor pentru un aspect sănătos și estetic. Lucrăm cu echipament specializat și respectăm perioadele optime de tăiere."
      image="/uploads/portfolio/pomi-1.jpg"
      price="De la 50 lei/buc până la 200 lei/buc (în funcție de dimensiune)"
      features={[
        "Tăiere de formare și întreținere",
        "Eliminare ramuri uscate sau bolnave",
        "Modelare estetică a coroanei",
        "Echipament profesional (drujbe, foarfece telescopice)",
        "Curățare completă după lucrare",
        "Consultanță pentru îngrijire ulterioară",
      ]}
      process={[
        { step: "Inspecție", desc: "Evaluăm starea pomilor și stabilim tipul de tăiere necesar." },
        { step: "Planificare", desc: "Discutăm cu clientul forma dorită și securizăm zona." },
        { step: "Tăiere", desc: "Efectuăm tăierile cu echipament profesional, respectând tehnica corectă." },
        { step: "Curățenie", desc: "Colectăm toate ramurile tăiate și lăsăm zona curată." },
      ]}
      faq={[
        { q: "Când este cel mai bun moment pentru toaletare?", a: "Pomii fructiferi se taie iarna (ianuarie-martie). Arbuștii ornamentali se pot tăia primăvara sau toamna." },
        { q: "Puteți tăia pomi foarte înalți?", a: "Da, avem echipament pentru lucru la înălțime (scări, platforme, echipament de alpinism). Contactați-ne pentru evaluare." },
        { q: "Colectați și ramurile tăiate?", a: "Da, colectarea și evacuarea resturilor vegetale sunt incluse în preț." },
      ]}
    />
  );
}
