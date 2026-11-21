import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produse",
  description:
    "Produse pentru grădină în Timișoara: îngrășăminte, gazon rulou, gazon artificial, pământ vegetal, componente irigații, scoarță și pietriș decorativ.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
