import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";

const BLOG = [
  "cum-sa-intretii-gazonul-vara",
  "ghid-sistem-irigatii",
  "cand-sa-plantezi-gazon-rulou",
  "toaletarea-pomilor-ghid-complet",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://immobilien-garten.ro";
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly") => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/servicii", 0.9, "weekly"),
    page("/portofoliu", 0.9, "weekly"),
    page("/produse", 0.8, "weekly"),
    page("/despre", 0.7, "monthly"),
    page("/intrebari-frecvente", 0.7, "monthly"),
    page("/contact", 0.8, "monthly"),
    page("/blog", 0.8, "weekly"),
    ...SERVICES.map((s) => page(`/servicii/${s.slug}`, 0.7, "monthly")),
    ...BLOG.map((b) => page(`/blog/${b}`, 0.6, "monthly")),
  ];
}
