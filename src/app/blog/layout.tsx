import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Sfaturi Grădinărit",
  description: "Sfaturi practice de grădinărit, ghiduri și articole utile de la Immobilien Garten Service Timișoara.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
