import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const LINKS = [
  { href: "/servicii", k: "Servicii & prețuri", t: "9 servicii, prețuri afișate", d: "De la tuns gazon la irigații — plus un calculator de preț." },
  { href: "/portofoliu", k: "Lucrări", t: "Înainte & după", d: "Grădini reale din Timișoara și împrejurimi." },
  { href: "/despre", k: "Despre noi", t: "O singură echipă", d: "Echipamente proprii, programare în 2–5 zile." },
  { href: "/contact", k: "Contact", t: "Ofertă gratuită", d: "Evaluare la tine acasă, fără obligații." },
];

export default function HomeLinks() {
  return (
    <section className="glow-bg relative z-[2] py-28">
      <div className="pointer-events-none absolute inset-x-0 -top-[220px] h-[220px] bg-gradient-to-b from-transparent to-night" />
      <div className="wrap">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((l, i) => (
            <Reveal key={l.href} delay={i * 80}>
              <TiltCard className="h-full">
                <Link href={l.href} className="glass flex h-full flex-col gap-3 p-7 transition-colors hover:bg-white/[.13]">
                  <span className="eyebrow !mb-1">{l.k}</span>
                  <span className="font-heading text-2xl font-extrabold leading-tight">{l.t}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{l.d}</span>
                  <ArrowRight className="mt-auto h-5 w-5 text-accent" />
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative isolate mt-24 overflow-hidden rounded-[36px] px-8 py-16 sm:px-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/services/irigatii-poster.webp" alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(5,16,10,.92)] to-[rgba(5,16,10,.5)]" />
          <div className="eyebrow">Ofertă gratuită</div>
          <h2 className="h-sec max-w-[640px]">
            Pregătit să-ți transformi <em>grădina</em>?
          </h2>
          <p className="lead mt-5 mb-8 max-w-[520px]">Sună-ne sau lasă-ne un mesaj — venim la evaluare și primești oferta exactă.</p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:0747469681" className="btn-cta">
              <Phone className="h-4 w-4" /> 0747 469 681
            </a>
            <Link href="/contact" className="btn-ghost glass">
              Cere ofertă <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
