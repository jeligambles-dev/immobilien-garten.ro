// Service catalog — order follows the home story video. No imports (unit-tested with node --test).

export type ServiceSlug =
  | "pavaje"
  | "tuns-gazon"
  | "scarificare"
  | "gazon-rulou"
  | "gazon-artificial"
  | "gard-viu"
  | "toaletare-pomi"
  | "plantari"
  | "irigatii";

export interface ServiceDef {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  blurb: string;
  /** id of the matching row in site-content `services` (admin-editable price); null = never priced */
  dataId: string | null;
  /** second in the story video where this service starts */
  segmentStart: number;
  still: string;
  clip: string;
  poster: string;
}

/** Hard cuts in the story video: arrival + 9 services. */
export const STORY_STARTS: number[] = [0, 2.96, 6, 9, 11.79, 14.79, 17.83, 20.71, 23.63, 26.54];

const def = (
  slug: ServiceSlug,
  title: string,
  eyebrow: string,
  blurb: string,
  dataId: string | null,
  segmentStart: number,
): ServiceDef => ({
  slug,
  title,
  eyebrow,
  blurb,
  dataId,
  segmentStart,
  still: `/img/services/${slug}.webp`,
  clip: `/video/services/${slug}.mp4`,
  poster: `/img/services/${slug}-poster.webp`,
});

export const SERVICES: ServiceDef[] = [
  def("pavaje", "Pavaje & alei", "Amenajare curte", "Alei, terase și intrări din pavele, compactate pe pat de nisip.", null, 2.96),
  def("tuns-gazon", "Tuns gazon", "Întreținere", "Gazon impecabil, cu dungi perfecte, tuns cu echipamente profesionale.", "1", 6),
  def("scarificare", "Scarificare & aerisire", "Regenerare", "Scoatem mușchiul și pâsla, ca gazonul să respire și să crească des.", "2", 9),
  def("gazon-rulou", "Gazon rulou", "Gazon nou", "Gazon gata crescut, montat pe teren nivelat — verde din prima zi.", "6", 11.79),
  def("gazon-artificial", "Gazon artificial", "Tot anul verde", "Terase și locuri de joacă verzi tot anul, montate la milimetru.", "7", 14.79),
  def("gard-viu", "Tuns gard viu", "Tuns drept", "Thuja, tuia și gard viu tunse drept, cu resturile strânse.", "4", 17.83),
  def("toaletare-pomi", "Toaletare pomi", "Pomi & arbuști", "Tăiere și modelare pentru pomi sănătoși și coroane aerisite.", "3", 20.71),
  def("plantari", "Plantări profesionale", "Peisagistică", "Flori, arbuști și copaci aleși pentru grădina ta, plantați corect.", "5", 23.63),
  def("irigatii", "Sisteme de irigații", "Automatizare", "Udare automată, ca toată grădina să rămână verde fără efort.", "8", 26.54),
];

export const serviceBySlug = (slug: string): ServiceDef | undefined => SERVICES.find((s) => s.slug === slug);

export interface PriceRow {
  id: string;
  title: string;
  price: string;
  priceMin?: number;
  priceMax?: number;
  unit?: string;
}

export interface ServicePrice {
  label: string;
  min: number | null;
  max: number | null;
  unit: string | null;
}

const CUSTOM: ServicePrice = { label: "Ofertă personalizată", min: null, max: null, unit: null };

export function priceFor(def: ServiceDef, rows: PriceRow[] | undefined): ServicePrice {
  if (!def.dataId || !rows) return CUSTOM;
  const row = rows.find((r) => r.id === def.dataId);
  if (!row || !row.price) return CUSTOM;
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  return {
    label: "de la " + row.price.replace(/^de la\s+/i, ""),
    min: num(row.priceMin),
    max: num(row.priceMax),
    unit: row.unit ?? null,
  };
}
