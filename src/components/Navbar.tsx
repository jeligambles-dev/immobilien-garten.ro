"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { SocialLinks, AJ_URL } from "@/components/SocialLinks";

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
      <div className="glass !rounded-full !bg-[rgba(7,20,13,.62)] flex items-center justify-between py-2 pl-2 pr-2.5 [text-shadow:0_1px_2px_rgba(0,0,0,.35)]">
        <Link href="/" className="flex items-center rounded-full px-3 py-1" aria-label="Immobilien Garten Service — Acasă">
          <Image src="/logo-light.png" alt="Immobilien Garten Service" width={152} height={46} className="h-[46px] w-[152px]" loading="eager" fetchPriority="high" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, l.href) ? "bg-white/15 text-white" : "text-ink/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SocialLinks size={36} className="hidden lg:flex" />
          <a
            href={AJ_URL}
            target="_blank"
            rel="noopener"
            className="hidden lg:flex flex-col items-center rounded-full px-2 py-0.5 text-center leading-[1.05] text-ink/55 transition-colors hover:text-accent"
            title="Site realizat de A&J Digital Solutions"
          >
            <span className="text-[9px] uppercase tracking-[.14em]">made by</span>
            <span className="font-heading text-[13px] font-bold text-ink/80">A&amp;J</span>
          </a>
          <a href="tel:0747469681" className="btn-cta !hidden sm:!inline-flex">
            <Phone className="h-4 w-4" /> 0747 469 681
          </a>
          <a href="tel:0747469681" className="btn-cta sm:!hidden !p-3" aria-label="Sună: 0747 469 681">
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-white/10"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass lg:hidden mt-2 flex flex-col gap-1 p-3 !bg-[rgba(10,28,18,.85)]">
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
          <div className="mt-3 flex items-center justify-between border-t border-white/10 px-2 pt-3">
            <SocialLinks size={44} className="-ml-2" />
            <Link href="/politica-cookies" className="text-[13px] text-ink/55 hover:text-white">Politica cookies</Link>
          </div>
          <a
            href={AJ_URL}
            target="_blank"
            rel="noopener"
            className="px-2 pt-1 pb-1 text-[13px] text-ink/50 hover:text-accent"
          >
            Made by <span className="font-medium text-ink/75">A&amp;J Digital Solutions</span>
          </a>
        </nav>
      )}
    </header>
  );
}
