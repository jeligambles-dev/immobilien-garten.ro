import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Shield, Sparkles, ArrowRight, Phone } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Immobilien Garten Service — echipă de întreținere și amenajare grădini din Timișoara. Peste 50 de grădini transformate, echipamente proprii, programare în 2–5 zile.",
  alternates: { canonical: "/despre" },
};

const stats = [
  { big: <CountUp to={50} suffix="+" />, b: "grădini transformate", p: "Curți rezidențiale din Timișoara și împrejurimi." },
  { big: "24h", b: "ofertă de preț", p: "Evaluare gratuită, răspuns rapid." },
  { big: "2–5", b: "zile până la start", p: "Programare rapidă, chiar și în sezon." },
  { big: "100%", b: "echipamente proprii", p: "Profesionale, întreținute, de ultimă generație." },
];

const strengths = [
  { icon: Clock, t: "Rapid & eficient", d: "Livrăm la timp, fără compromisuri." },
  { icon: Shield, t: "Profesionalism", d: "Echipamente moderne, echipă cu experiență." },
  { icon: Sparkles, t: "Atenție la detalii", d: "Fiecare proiect primește grija pe care o merită." },
];

export default function DesprePage() {
  return (
    <div className="glow-bg pb-28 pt-40">
      <section className="wrap">
        <SectionHead
          as="h1"
          eyebrow="Despre noi"
          title={<>Grădina ta, <em>cartea noastră</em> de vizită.</>}
          lead="Transformăm orice spațiu verde într-un loc perfect pentru relaxare și confort. Lucrăm rapid, curat și profesionist — de la tuns gazon până la amenajări complete, cu o singură echipă."
        />
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.b} delay={i * 80}>
              <div className="glass h-full px-7 py-8">
                <div className="mb-3 font-heading text-[clamp(44px,5vw,64px)] font-black leading-none text-accent">{s.big}</div>
                <b className="mb-1.5 block text-lg">{s.b}</b>
                <p className="text-[15px] leading-relaxed text-muted">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pt-28">
        <SectionHead eyebrow="De ce noi" title={<>Alege calitatea. Alege <em>experiența</em>.</>} />
        <div className="grid gap-5 md:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="glass h-full p-8">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-2xl font-extrabold">{s.t}</h3>
                <p className="leading-relaxed text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pt-28">
        <SectionHead eyebrow="Recenzii" title={<>Ce spun <em>clienții</em>.</>} lead="Păreri de la clienți din Timișoara și împrejurimi." />
        <Testimonials />
      </section>

      <section className="wrap pt-28">
        <Reveal className="glass flex flex-wrap items-center justify-between gap-6 p-8 sm:p-12">
          <div>
            <div className="eyebrow">Hai să vorbim</div>
            <h2 className="h-sec !text-[clamp(30px,3.4vw,44px)]">Vino cu grădina, noi venim cu echipa.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:0747469681" className="btn-cta"><Phone className="h-4 w-4" /> 0747 469 681</a>
            <Link href="/contact" className="btn-ghost glass">Cere ofertă <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
