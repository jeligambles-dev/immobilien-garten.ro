import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de cookie-uri",
  description: "Ce cookie-uri folosește site-ul Immobilien Garten Service și cum le poți controla.",
  alternates: { canonical: "/politica-cookies" },
};

export default function PoliticaCookies() {
  return (
    <section className="glow-bg pt-36 pb-28">
      <div className="mx-auto max-w-[760px] px-5">
        <h1 className="font-heading font-bold text-ink text-3xl sm:text-4xl mb-8">
          Politica de Cookie-uri
        </h1>

        <div className="space-y-6 rounded-[28px] border border-white/10 bg-white/[.04] p-6 sm:p-10 text-ink/80 leading-relaxed">
          <h2 className="font-heading font-semibold text-ink text-xl mt-8">
            Ce sunt cookie-urile?
          </h2>
          <p>
            Cookie-urile sunt fișiere mici de text stocate pe dispozitivul
            dumneavoastră atunci când vizitați un site web. Acestea ajută site-ul
            să funcționeze corect și să ofere o experiență personalizată.
          </p>

          <h2 className="font-heading font-semibold text-ink text-xl mt-8">
            Cookie-uri utilizate
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cookie-uri esențiale:</strong> Necesare pentru
              funcționarea site-ului (preferințe cookie, sesiune).
            </li>
            <li>
              <strong>Cookie-uri analitice:</strong> Ne ajută să înțelegem cum
              este utilizat site-ul (Google Analytics).
            </li>
          </ul>

          <h2 className="font-heading font-semibold text-ink text-xl mt-8">
            Cum puteți controla cookie-urile?
          </h2>
          <p>
            Puteți configura browser-ul să blocheze sau să șteargă cookie-urile.
            Rețineți că dezactivarea cookie-urilor poate afecta funcționalitatea
            site-ului.
          </p>

          <h2 className="font-heading font-semibold text-ink text-xl mt-8">
            Contact
          </h2>
          <p>
            Pentru întrebări legate de politica de cookie-uri, ne puteți
            contacta la{" "}
            <a
              href="mailto:contact@immobilien-garten.ro"
              className="text-accent underline underline-offset-4"
            >
              contact@immobilien-garten.ro
            </a>{" "}
            sau la telefon{" "}
            <a href="tel:0747469681" className="text-accent underline underline-offset-4">
              0747 469 681
            </a>
            .
          </p>

          <p className="text-ink/45 text-xs mt-8">
            Ultima actualizare: Martie 2026
          </p>
        </div>
      </div>
    </section>
  );
}
