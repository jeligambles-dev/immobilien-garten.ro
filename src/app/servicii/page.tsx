import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import ServicesView from "@/components/services/ServicesView";
import { getPrices } from "@/lib/content.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Servicii & Prețuri",
  description:
    "Pavaje, tuns gazon, scarificare, gazon rulou și artificial, gard viu, toaletare pomi, plantări și irigații în Timișoara. Prețuri afișate și calculator de preț.",
  alternates: { canonical: "/servicii" },
};

export default async function ServiciiPage() {
  const prices = await getPrices();
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
        <ServicesView prices={prices} />
      </div>
    </section>
  );
}
