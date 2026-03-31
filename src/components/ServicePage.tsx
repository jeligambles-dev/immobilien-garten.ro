import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft, Check } from "lucide-react";

interface ServicePageProps {
  title: string;
  description: string;
  image: string;
  price: string;
  features: string[];
  process: { step: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export default function ServicePage({
  title,
  description,
  image,
  price,
  features,
  process,
  faq,
}: ServicePageProps) {
  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/produse"
          className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Toate Serviciile
        </Link>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div>
            <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
              {title}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {description}
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 inline-block mb-6">
              <p className="text-amber-800 font-semibold text-sm">{price}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0747469681"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <Phone className="h-5 w-5" />
                Sună: 0747 469 681
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 border border-green-200 text-green-700 font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Solicită Ofertă
              </Link>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-slate-900 text-2xl mb-6">
            Ce Include
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-start gap-3 bg-green-50 rounded-xl px-4 py-3"
              >
                <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-slate-700 text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-slate-900 text-2xl mb-6">
            Cum Lucrăm
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-green-100 rounded-xl p-5"
              >
                <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  {p.step}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl">
          <h2 className="font-heading font-bold text-slate-900 text-2xl mb-6">
            Întrebări Frecvente
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group bg-white border border-green-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-slate-900 hover:bg-green-50 transition-colors duration-200 list-none">
                  {f.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
