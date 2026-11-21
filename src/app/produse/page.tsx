import Link from "next/link";
import { Package, Leaf, Sprout, Droplets, ArrowRight, Check } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const produse = [
  {
    icon: Package,
    title: "Îngrășământ Universal",
    price: "Preț la cerere",
    desc: "Îngrășământ NPK de calitate superioară pentru gazon, flori și legume.",
    features: ["Eliberare lentă", "Eficient 3 luni", "Ecologic"],
  },
  {
    icon: Leaf,
    title: "Gazon Rulou Natural",
    price: "Preț/mp la cerere",
    desc: "Gazon natural premium, pregătit pentru montaj imediat.",
    features: [
      "Soi rezistent",
      "Grosime uniformă",
      "Transport inclus*",
    ],
  },
  {
    icon: Leaf,
    title: "Gazon Artificial Premium",
    price: "Preț/mp la cerere",
    desc: "Gazon artificial de înaltă densitate, aspect natural, durabilitate 10+ ani.",
    features: ["UV rezistent", "Drenaj integrat", "Fără întreținere"],
  },
  {
    icon: Sprout,
    title: "Pământ Vegetal & Substrat",
    price: "Preț la cerere",
    desc: "Pământ vegetal cernut și substrat nutritiv pentru plantări de calitate.",
    features: ["Cernut fin", "Bogat în nutrienți", "Livrare"],
  },
  {
    icon: Droplets,
    title: "Componente Irigații",
    price: "Preț la cerere",
    desc: "Aspersoare, electrovalve, programatoare și țevi pentru sisteme de irigații.",
    features: ["Branduri de top", "Consultanță", "Montaj opțional"],
  },
  {
    icon: Package,
    title: "Scoarță Decorativă & Pietriș",
    price: "Preț la cerere",
    desc: "Scoarță de pin, pietriș alb, pietriș decorativ pentru amenajări moderne.",
    features: ["Diverse culori", "Cantități mari", "Transport"],
  },
];

export default function Produse() {
  return (
    <section className="glow-bg pb-28 pt-40">
      <div className="wrap">
        <SectionHead
          as="h1"
          eyebrow="Produse"
          title={<>Materiale de calitate, <em>livrate</em> la tine.</>}
          lead={
            <>
              Gazon, substrat, irigații și decor. Cauți servicii?{" "}
              <Link href="/servicii" className="text-accent underline underline-offset-4">Vezi prețurile →</Link>
            </>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produse.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <TiltCard className="h-full">
                <article className="glass flex h-full flex-col p-7">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-leaf/15 text-leaf">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mb-2 text-2xl font-extrabold">{p.title}</h2>
                  <p className="mb-5 leading-relaxed text-muted">{p.desc}</p>
                  <ul className="mb-6 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[15px]">
                        <Check className="h-4 w-4 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <span className="chip !text-[13px]">{p.price}</span>
                    <Link href={`/contact?produs=${encodeURIComponent(p.title)}`} className="btn-cta">
                      Cere ofertă <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
