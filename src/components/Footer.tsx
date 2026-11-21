import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";

const company = [
  { href: "/portofoliu", label: "Lucrări" },
  { href: "/produse", label: "Produse" },
  { href: "/despre", label: "Despre noi" },
  { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const h4 = "mb-4 font-heading text-sm font-bold uppercase tracking-[.14em] text-leaf";
const li = "text-[15px] text-muted transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-night pt-20 pb-10">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-5 inline-flex h-[52px] items-center rounded-full bg-white px-3.5">
              <Image src="/logo1.png" alt="Immobilien Garten Service" width={76} height={76} className="-my-3 h-[76px] w-[76px]" />
            </Link>
            <p className="mb-5 max-w-[300px] leading-relaxed text-muted">
              Grădina ta, cartea noastră de vizită. Întreținere și amenajare grădini în Timișoara și împrejurimi.
            </p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/profile.php?id=61585939142249" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="glass grid h-10 w-10 place-items-center !rounded-full text-ink/80 hover:text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/immobilien.garten" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="glass grid h-10 w-10 place-items-center !rounded-full text-ink/80 hover:text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className={h4}>Servicii</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicii/${s.slug}`} className={li}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={h4}>Companie</h4>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={li}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className={h4}>Contact</h4>
            <ul className="space-y-3">
              <li><a href="tel:0747469681" className={`flex items-center gap-2 ${li}`}><Phone className="h-4 w-4 shrink-0 text-accent" /> 0747 469 681</a></li>
              <li><a href="mailto:contact@immobilien-garten.ro" className={`flex items-center gap-2 break-all ${li}`}><Mail className="h-4 w-4 shrink-0 text-accent" /> contact@immobilien-garten.ro</a></li>
              <li><span className="flex items-center gap-2 text-[15px] text-muted"><MapPin className="h-4 w-4 shrink-0 text-accent" /> Timișoara, România</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 text-[13px] text-ink/45">
          <span>&copy; {new Date().getFullYear()} Immobilien Garten Service. Toate drepturile rezervate.</span>
          <Link href="/politica-cookies" className="hover:text-ink/80">Politica cookies</Link>
        </div>
      </div>
    </footer>
  );
}
