import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Immobilien Garten Service Timișoara. Telefon: 0747 469 681. Programează o lucrare sau solicită o ofertă gratuită.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
