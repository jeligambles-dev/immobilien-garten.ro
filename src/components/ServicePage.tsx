import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { SERVICES, serviceBySlug, type ServiceSlug } from "@/lib/services";
import { SERVICE_CONTENT } from "@/lib/serviceContent";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import LivePrice from "@/components/services/LivePrice";
import LoopVideo from "@/components/services/LoopVideo";

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const c = SERVICE_CONTENT[slug];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/servicii/${slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, images: [serviceBySlug(slug)!.poster] },
  };
}

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const def = serviceBySlug(slug)!;
  const c = SERVICE_CONTENT[slug];
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const others = [1, 2, 3].map((k) => SERVICES[(idx + k) % SERVICES.length]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden pb-16 pt-36">
        <LoopVideo src={def.clip} poster={def.poster} className="absolute inset-0 -z-20 h-full w-full max-w-none object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,16,10,.78)_0%,rgba(5,16,10,.25)_55%,transparent),linear-gradient(0deg,#07140d,transparent_45%)]" />
        <div className="wrap w-full">
          <Link href="/servicii" className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Toate serviciile
          </Link>
          <div className="glass max-w-[620px] p-8 sm:p-10">
            <div className="eyebrow">{def.eyebrow}</div>
            <h1 className="h-hero !text-[clamp(38px,5vw,64px)]">{def.title}</h1>
            <p className="lead mt-5">{c.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <LivePrice slug={slug} className="!border !border-accent/50 !bg-accent/15 !px-4 !py-2.5 !text-base !text-accent" />
              <a href="tel:0747469681" className="btn-cta">
                <Phone className="h-4 w-4" /> Sună acum
              </a>
              <Link href={`/contact?serviciu=${slug}`} className="btn-ghost glass">
                Cere ofertă <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink/55">{c.priceNote}</p>
          </div>
        </div>
      </section>

      <div className="glow-bg pb-28">
        {/* Features */}
        <section className="wrap pt-20">
          <Reveal>
            <div className="eyebrow">Ce include</div>
            <h2 className="h-sec mb-12">
              Ce primești, <em>concret</em>.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f, i) => (
              <Reveal key={f} delay={(i % 3) * 80}>
                <div className="glass flex h-full items-start gap-4 p-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="pt-1.5 leading-relaxed">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="wrap pt-28">
          <Reveal>
            <div className="eyebrow">Cum lucrăm</div>
            <h2 className="h-sec mb-12">
              Patru pași, <em>fără surprize</em>.
            </h2>
          </Reveal>
          <ol className="relative grid gap-5 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 md:block" aria-hidden />
            {c.process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 100} className="relative">
                <div className="glass h-full p-6">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-accent font-heading text-lg font-black text-accent-ink shadow-[0_0_0_6px_rgba(245,184,61,.18)]">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-extrabold">{p.step}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="wrap pt-28">
          <Reveal className="text-center">
            <div className="eyebrow justify-center">Întrebări frecvente</div>
            <h2 className="h-sec mb-12">Bine de știut.</h2>
          </Reveal>
          <div className="mx-auto flex max-w-[860px] flex-col gap-3">
            {c.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="faq-item glass !rounded-[20px] px-6" open={i === 0}>
                  <summary>{f.q}</summary>
                  <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Other services */}
        <section className="wrap pt-28">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Alte servicii</div>
              <h2 className="h-sec">Totul, de la aceeași echipă.</h2>
            </div>
            <Link href="/servicii" className="btn-ghost glass">
              Toate serviciile <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 80}>
                <TiltCard className="h-[260px] overflow-hidden rounded-[26px]">
                  <Link href={`/servicii/${o.slug}`} className="group block h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.poster} alt={o.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(5,16,10,.85)]" />
                    <span className="glass absolute inset-x-3.5 bottom-3.5 flex items-center justify-between !rounded-[18px] px-5 py-4">
                      <span className="font-heading text-xl font-extrabold">{o.title}</span>
                      <ArrowRight className="h-5 w-5 text-accent" />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
