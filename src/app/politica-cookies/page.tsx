export default function PoliticaCookies() {
  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-8">
          Politica de Cookie-uri
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 text-sm leading-relaxed">
          <h2 className="font-heading font-semibold text-slate-900 text-xl mt-8">
            Ce sunt cookie-urile?
          </h2>
          <p>
            Cookie-urile sunt fișiere mici de text stocate pe dispozitivul
            dumneavoastră atunci când vizitați un site web. Acestea ajută site-ul
            să funcționeze corect și să ofere o experiență personalizată.
          </p>

          <h2 className="font-heading font-semibold text-slate-900 text-xl mt-8">
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

          <h2 className="font-heading font-semibold text-slate-900 text-xl mt-8">
            Cum puteți controla cookie-urile?
          </h2>
          <p>
            Puteți configura browser-ul să blocheze sau să șteargă cookie-urile.
            Rețineți că dezactivarea cookie-urilor poate afecta funcționalitatea
            site-ului.
          </p>

          <h2 className="font-heading font-semibold text-slate-900 text-xl mt-8">
            Contact
          </h2>
          <p>
            Pentru întrebări legate de politica de cookie-uri, ne puteți
            contacta la{" "}
            <a
              href="mailto:contact@immobilien-garten.ro"
              className="text-green-600 underline"
            >
              contact@immobilien-garten.ro
            </a>{" "}
            sau la telefon{" "}
            <a href="tel:0747469681" className="text-green-600 underline">
              0747 469 681
            </a>
            .
          </p>

          <p className="text-slate-400 text-xs mt-8">
            Ultima actualizare: Martie 2026
          </p>
        </div>
      </div>
    </section>
  );
}
