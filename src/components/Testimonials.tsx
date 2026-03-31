import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria D.",
    location: "Timișoara",
    text: "Echipă foarte profesionistă! Au transformat curtea noastră complet. Gazonul arată superb, iar sistemul de irigații funcționează impecabil.",
    rating: 5,
  },
  {
    name: "Alexandru P.",
    location: "Giroc",
    text: "Am apelat la ei pentru toaletarea pomilor și tuns gard viu. Lucrare rapidă, curată și la un preț corect. Recomand cu încredere!",
    rating: 5,
  },
  {
    name: "Elena S.",
    location: "Dumbrăvița",
    text: "Profesionalismul lor m-a impresionat de la primul contact. Grădina noastră nu a arătat niciodată mai bine. Mulțumim!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-green-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Ce Spun Clienții Noștri
          </h2>
          <p className="text-slate-600 text-lg">
            Încrederea clienților este cea mai bună reclamă.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  {t.name}
                </p>
                <p className="text-slate-400 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
