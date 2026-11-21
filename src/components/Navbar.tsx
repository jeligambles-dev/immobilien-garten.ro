"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/servicii", label: "Servicii" },
  { href: "/portofoliu", label: "Lucrări" },
  { href: "/despre", label: "Despre" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 w-[min(1160px,calc(100%-24px))]">
      <div className="glass !rounded-full flex items-center justify-between py-2 pl-2 pr-2.5">
        <Link href="/" className="flex items-center rounded-full px-3 py-1" aria-label="Immobilien Garten Service — Acasă">
          <Image src="/logo-light.png" alt="Immobilien Garten Service" width={152} height={46} className="h-[46px] w-[152px]" loading="eager" fetchPriority="high" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, l.href) ? "bg-white/15 text-white" : "text-ink/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="tel:0747469681" className="btn-cta !hidden sm:!inline-flex">
            <Phone className="h-4 w-4" /> 0747 469 681
          </a>
          <a href="tel:0747469681" className="btn-cta sm:!hidden !p-3" aria-label="Sună: 0747 469 681">
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-white/10"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass md:hidden mt-2 flex flex-col gap-1 p-3 !bg-[rgba(10,28,18,.85)]">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-2xl px-4 py-3 text-base font-medium ${isActive(pathname, l.href) ? "bg-white/15 text-white" : "text-ink/85"}`}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:0747469681" className="btn-cta mt-2 !py-3.5">
            <Phone className="h-4 w-4" /> Sună: 0747 469 681
          </a>
        </nav>
      )}
    </header>
  );
}
