import {
  Leaf,
  Scissors,
  TreePine,
  Sprout,
  Droplets,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Star,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

const services = [
  {
    icon: Scissors,
    title: "Tuns Gazon",
    desc: "Gazon impecabil, tuns cu echipamente profesionale de ultimă generație.",
  },
  {
    icon: Leaf,
    title: "Scarificare & Aerisire",
    desc: "Regenerăm gazonul pentru o creștere sănătoasă și viguroasă.",
  },
  {
    icon: TreePine,
    title: "Toaletare Pomi & Arbuști",
    desc: "Tăiere și modelare profesională pentru un aspect perfect.",
  },
  {
    icon: Sprout,
    title: "Plantări Profesionale",
    desc: "De la flori la copaci, creăm grădina visurilor tale.",
  },
  {
    icon: Leaf,
    title: "Gazon Natural & Artificial",
    desc: "Montaj profesional de gazon rulou sau gazon artificial premium.",
  },
  {
    icon: Droplets,
    title: "Sisteme de Irigații",
    desc: "Instalare și întreținere sisteme automate de udare.",
  },
];

const strengths = [
  {
    icon: Clock,
    title: "Rapid & Eficient",
    desc: "Livrăm la timp, fără compromisuri.",
  },
  {
    icon: Shield,
    title: "Profesionalism",
    desc: "Echipamente moderne, echipă cu experiență.",
  },
  {
    icon: Sparkles,
    title: "Atenție la Detalii",
    desc: "Fiecare proiect primește grija pe care o merită.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-800 via-green-700 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                Grădina ta,
                <br />
                <span className="text-amber-400">cartea noastră</span>
                <br />
                de vizită!
              </h1>
              <p className="text-green-200 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Transformăm orice spațiu verde într-un loc perfect pentru relaxare
                și confort. Lucrăm rapid, curat și profesionist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0747469681"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold px-6 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  <Phone className="h-5 w-5" />
                  Sună: 0747 469 681
                </a>
                <Link
                  href="/portofoliu"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
                >
                  Vezi Lucrările Noastre
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-green-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
              Serviciile Noastre
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              De la întreținerea gazonului până la sisteme de irigații complete —
              acoperim tot ce ai nevoie.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-6 border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-200 group"
              >
                <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
              De Ce Noi?
            </h2>
            <p className="text-slate-600 text-lg">
              Alege calitatea. Alege experiența. Alege Immobilien Garten
              Service!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((s) => (
              <div key={s.title} className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 mx-auto">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-green-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
              Ce Spun Clienții Noștri
            </h2>
            <p className="text-slate-600 text-lg">
              Peste 50 de grădini transformate. Iată ce spun clienții.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria P.",
                location: "Timișoara",
                text: "Echipă foarte profesionistă! Au transformat complet curtea noastră în doar 2 zile. Gazonul arată perfect, recomand cu încredere!",
                rating: 5,
              },
              {
                name: "Andrei D.",
                location: "Dumbrăvița",
                text: "Am apelat la ei pentru sistemul de irigații și tuns gazon lunar. Punctuali, curați și prețuri corecte. Colaborăm de peste un an.",
                rating: 5,
              },
              {
                name: "Elena S.",
                location: "Giroc",
                text: "Toaletarea pomilor a fost impecabilă. Au venit cu echipament profesional și au lăsat totul curat. Cu siguranță voi reveni!",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-green-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-heading font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-slate-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-green-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-3">
                Zona de Acoperire
              </h2>
              <p className="text-green-200 leading-relaxed mb-4">
                Oferim servicii în Timișoara și împrejurimi, inclusiv:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Timișoara",
                  "Dumbrăvița",
                  "Giroc",
                  "Moșnița",
                  "Ghiroda",
                  "Săcălaz",
                  "Sânmihaiu Român",
                  "Lugoj",
                ].map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1 text-sm bg-green-700/60 text-green-100 px-3 py-1.5 rounded-full"
                  >
                    <MapPin className="h-3 w-3" />
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <a
                href="tel:0747469681"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold px-6 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <Phone className="h-5 w-5" />
                Sună Acum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
              Întrebări Frecvente
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Cât costă serviciile de tuns gazon?",
                a: "Prețul depinde de suprafața gazonului și de complexitatea lucrării. Contactați-ne pentru o ofertă personalizată gratuită.",
              },
              {
                q: "Oferiți garanție pentru gazonul montat?",
                a: "Da, oferim garanție pentru gazonul rulou montat de noi, cu condiția respectării instrucțiunilor de îngrijire pe care le furnizăm.",
              },
              {
                q: "În cât timp puteți veni la o lucrare?",
                a: "De regulă, putem programa lucrarea în 2-5 zile lucrătoare, în funcție de sezon și complexitate. Pentru urgențe, sunați-ne direct.",
              },
              {
                q: "Lucrați și în afara Timișoarei?",
                a: "Da, acoperim Timișoara și localitățile din jur: Dumbrăvița, Giroc, Moșnița, Ghiroda, Săcălaz, Recaș, Lugoj și altele.",
              },
              {
                q: "Aveți echipamente proprii?",
                a: "Da, lucrăm exclusiv cu echipamente profesionale proprii, de ultimă generație, pentru rezultate impecabile.",
              },
              {
                q: "Oferiti servicii de întreținere lunară?",
                a: "Da, avem abonamente de întreținere lunară care includ tuns gazon, curățenie, verificare sistem de irigații și alte servicii la cerere.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-green-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-slate-900 hover:bg-green-50 transition-colors duration-200 list-none">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-4">
            Pregătit să-ți transformi grădina?
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            Sună acum și programează o lucrare. Oferim consultanță gratuită!
          </p>
          <a
            href="tel:0747469681"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-green-900 font-bold text-lg px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            <Phone className="h-5 w-5" />
            0747 469 681
          </a>
        </div>
      </section>
    </>
  );
}
