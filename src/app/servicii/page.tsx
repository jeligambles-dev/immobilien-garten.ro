import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import ServicesView from "@/components/services/ServicesView";

export const metadata: Metadata = {
  title: "Servicii & Prețuri",
  description:
    "Pavaje, tuns gazon, scarificare, gazon rulou și artificial, gard viu, toaletare pomi, plantări și irigații în Timișoara. Prețuri afișate și calculator de preț.",
  alternates: { canonical: "/servicii" },
};

export default function ServiciiPage() {
  return (
    <section className="glow-bg pb-28 pt-40">
      <div className="wrap">
        <SectionHead
          as="h1"
          eyebrow="Servicii & prețuri"
          title={<>Tot ce are nevoie <em>grădina ta</em>, de la o singură echipă.</>}
          lead={
            <>
              Prețuri clare, afișate de la început. Cauți materiale?{" "}
              <Link href="/produse" className="text-accent underline underline-offset-4">Vezi produsele →</Link>
            </>
          }
        />
        <ServicesView />
      </div>
    </section>
  );
}
