// Map coordinates for coverage areas (approximate village centres). No imports (unit-tested with node --test).

export const AREA_COORDS: Record<string, [number, number]> = {
  Timișoara: [45.7537, 21.2257],
  Dumbrăvița: [45.7963, 21.2395],
  Ghiroda: [45.7640, 21.2985],
  Giroc: [45.6943, 21.2370],
  Moșnița: [45.7188, 21.3128],
  "Moșnița Nouă": [45.7188, 21.3128],
  "Moșnița Veche": [45.7322, 21.3292],
  Săcălaz: [45.7590, 21.1166],
  "Sânmihaiu Român": [45.7070, 21.0893],
  Chișoda: [45.7058, 21.2122],
  "Dudeștii Noi": [45.8400, 21.0972],
  "Remetea Mare": [45.7820, 21.3720],
  Sânandrei: [45.8580, 21.1630],
};

export interface Pin {
  name: string;
  lat: number;
  lng: number;
}

/** Pins for the admin-edited area names; unknown names are skipped (they still show as chips). */
export function pinsFor(names: string[]): Pin[] {
  return names.filter((n) => AREA_COORDS[n]).map((n) => ({ name: n, lat: AREA_COORDS[n][0], lng: AREA_COORDS[n][1] }));
}
