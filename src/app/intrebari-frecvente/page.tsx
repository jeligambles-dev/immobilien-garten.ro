import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/services";
import { getGeneralFaq, getServiceContent } from "@/lib/content.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description:
    "Răspunsuri la cele mai frecvente întrebări despre tuns gazon, gazon rulou și artificial, irigații, pavaje, plantări și toaletare pomi în Timișoara.",
  alternates: { canonical: "/intrebari-frecvente" },
};

export default async function FaqPage() {
  const [general, perService] = await Promise.all([
    getGeneralFaq(),
    Promise.all(SERVICES.map((s) => getServiceContent(s.slug))),
  ]);
  const groups = [
    { id: "general", title: "Generale", href: null as string | null, faq: general },
    ...SERVICES.map((s, i) => ({ id: s.slug, title: s.title, href: `/servicii/${s.slug}`, faq: perService[i].faq })),
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    ),
  };
  return (
    <div className="glow-bg pb-28 pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <SectionHead as="h1" eyebrow="Întrebări frecvente" title={<>Bine de <em>știut</em>.</>} lead="Nu găsești răspunsul? Sună-ne la 0747 469 681." />

        <nav className="mb-16 flex flex-wrap gap-2" aria-label="Categorii">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="glass !rounded-full px-4 py-2 text-sm text-ink/85 hover:text-white">
              {g.title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-20">
          {groups.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-32">
              <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-[clamp(26px,3vw,36px)] font-black">{g.title}</h2>
                {g.href && (
                  <Link href={g.href} className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                    Vezi serviciul <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Reveal>
              <div className="flex flex-col gap-3">
                {g.faq.map((f) => (
                  <details key={f.q} className="faq-item glass !rounded-[20px] px-6">
                    <summary>{f.q}</summary>
                    <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
