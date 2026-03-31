import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Sisteme de Irigații Timișoara",
  description: "Proiectare și montaj sisteme de irigații automate în Timișoara. Aspersoare, picurare, programatoare smart. De la 8 lei/mp. Sună: 0747 469 681",
};

export default function Page() {
  return (
    <ServicePage
      title="Sisteme de Irigații"
      description="Proiectare, montaj și întreținere sisteme automate de irigații. De la aspersoare pop-up până la sisteme de picurare inteligente cu senzori de umiditate. Economisești apă și timp."
      image="/uploads/portfolio/irigatii-1.jpg"
      price="De la 8 lei/mp până la 20 lei/mp (în funcție de complexitate)"
      features={[
        "Proiectare personalizată pe zone de udare",
        "Aspersoare pop-up și rotative",
        "Sisteme de picurare pentru straturi",
        "Programatoare automate cu mai multe zone",
        "Senzori de umiditate și ploaie",
        "Garanție și service post-montaj",
      ]}
      process={[
        { step: "Proiectare", desc: "Analizăm grădina, zonele de soare/umbră și tipul plantelor." },
        { step: "Instalare", desc: "Săpăm tranșee, montăm conducte, aspersoare și programator." },
        { step: "Programare", desc: "Configurăm zonele de udare, durata și frecvența." },
        { step: "Testare", desc: "Testăm fiecare zonă și instruim clientul pentru utilizare." },
      ]}
      faq={[
        { q: "Cât durează montajul?", a: "Pentru o grădină de 200-500 mp, montajul durează 2-4 zile, în funcție de complexitate și numărul de zone." },
        { q: "Ce marcă de echipamente folosiți?", a: "Lucrăm cu branduri de top: Hunter, Rain Bird, Gardena. Toate componentele vin cu garanție." },
        { q: "Pot controla irigația de pe telefon?", a: "Da, putem instala programatoare smart WiFi (Hunter HC, Rain Bird ESP-TM2) controlabile din aplicație." },
      ]}
    />
  );
}
