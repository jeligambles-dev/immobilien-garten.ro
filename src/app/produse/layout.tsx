import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produse & Servicii",
  description:
    "Servicii profesionale de grădinărit și produse de calitate: îngrășăminte, gazon rulou, gazon artificial, sisteme irigații. Timișoara.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
