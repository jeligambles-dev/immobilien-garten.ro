import Link from "next/link";
import { Clock, ArrowLeft, Phone } from "lucide-react";

interface BlogArticleProps {
  title: string;
  date: string;
  readTime: string;
  children: React.ReactNode;
  related: { slug: string; title: string }[];
}

export default function BlogArticle({
  title,
  date,
  readTime,
  children,
  related,
}: BlogArticleProps) {
  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Toate Articolele
        </Link>

        <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
          {title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-slate-400 mb-10">
          <span>{date}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readTime}
          </span>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
          {children}
        </div>

        {/* CTA */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-12 text-center">
          <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
            Ai nevoie de ajutor profesional?
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Echipa Immobilien Garten Service este la dispoziția ta pentru orice
            lucrare de grădinărit în Timișoara și împrejurimi.
          </p>
          <a
            href="tel:0747469681"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            <Phone className="h-5 w-5" />
            Sună: 0747 469 681
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading font-semibold text-slate-900 text-lg mb-4">
              Citește și
            </h3>
            <div className="space-y-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block bg-white border border-green-100 hover:border-green-300 rounded-xl px-5 py-3 text-sm font-medium text-slate-700 hover:text-green-600 transition-colors duration-200"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
