import Link from "next/link";
import { Clock, ArrowLeft, Phone, ArrowRight } from "lucide-react";

interface BlogArticleProps {
  title: string;
  date: string;
  readTime: string;
  children: React.ReactNode;
  related: { slug: string; title: string }[];
}

export default function BlogArticle({ title, date, readTime, children, related }: BlogArticleProps) {
  return (
    <section className="glow-bg pb-28 pt-36">
      <div className="mx-auto max-w-[760px] px-5">
        <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink/75 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Toate articolele
        </Link>
        <h1 className="mb-4 text-[clamp(34px,4.4vw,54px)] font-black leading-[1.04]">{title}</h1>
        <div className="mb-10 flex items-center gap-3 text-sm text-ink/55">
          <span>{date}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{readTime}</span>
        </div>

        {/* calm reading surface: no blur behind long text */}
        <article className="space-y-6 rounded-[28px] border border-white/10 bg-white/[.04] p-6 text-[18px] leading-[1.75] text-ink/85 sm:p-10 [&_li]:marker:text-accent [&_strong]:text-ink">
          {children}
        </article>

        <div className="glass mt-12 p-8 text-center">
          <h3 className="mb-2 text-2xl font-extrabold">Ai nevoie de ajutor profesional?</h3>
          <p className="mb-6 text-muted">Echipa Immobilien Garten Service este la dispoziția ta pentru orice lucrare de grădinărit în Timișoara și împrejurimi.</p>
          <a href="tel:0747469681" className="btn-cta !px-6 !py-3.5"><Phone className="h-5 w-5" /> Sună: 0747 469 681</a>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-4 text-xl font-extrabold">Citește și</h3>
            <div className="space-y-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="glass flex items-center justify-between gap-3 !rounded-2xl px-5 py-4 text-[15px] font-medium hover:bg-white/[.13]">
                  {r.title} <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
