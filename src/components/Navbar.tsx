"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/portofoliu", label: "Portofoliu" },
  { href: "/produse", label: "Produse & Servicii" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 sm:h-28 lg:h-36 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo1.png"
              alt="Immobilien Garten Service"
              width={180}
              height={50}
              className="h-16 sm:h-24 lg:h-32 w-auto mix-blend-multiply"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-green-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:0747469681"
              className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              0747 469 681
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-slate-700 hover:text-green-600 cursor-pointer"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-green-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-green-600 hover:bg-green-50 px-3 py-2.5 rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:0747469681"
              className="flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg mt-2 cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              Sună: 0747 469 681
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
