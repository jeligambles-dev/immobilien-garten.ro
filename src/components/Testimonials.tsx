import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    name: "Maria P.",
    location: "Timișoara",
    text: "Echipă foarte profesionistă! Au transformat complet curtea noastră în doar 2 zile. Gazonul arată perfect, recomand cu încredere!",
  },
  {
    name: "Andrei D.",
    location: "Dumbrăvița",
    text: "Am apelat la ei pentru sistemul de irigații și tuns gazon lunar. Punctuali, curați și prețuri corecte. Colaborăm de peste un an.",
  },
  {
    name: "Elena S.",
    location: "Giroc",
    text: "Toaletarea pomilor a fost impecabilă. Au venit cu echipament profesional și au lăsat totul curat. Cu siguranță voi reveni!",
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 80}>
          <figure className="glass flex h-full flex-col gap-5 p-8">
            <div className="tracking-[3px] text-accent" aria-label="5 din 5 stele">★★★★★</div>
            <blockquote className="text-lg leading-relaxed">„{t.text}”</blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-leaf to-[#2f7a4a] font-extrabold text-night">{t.name[0]}</span>
              <span>
                <b className="block">{t.name}</b>
                <small className="text-muted">{t.location}</small>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
