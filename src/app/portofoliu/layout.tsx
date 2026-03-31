import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofoliu",
  description:
    "Vezi lucrările noastre: amenajări grădini, gazon, gard viu, sisteme irigații. Portofoliu Immobilien Garten Service Timișoara.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
