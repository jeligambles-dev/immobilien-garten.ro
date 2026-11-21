// Merge admin overrides over code defaults. Pure, no runtime imports (unit-tested with node --test).
import type { ServiceContent } from "./serviceContent";

export type QA = { q: string; a: string };
export type Step = { step: string; desc: string };
export interface StoryVideo {
  desktop: string;
  mobile: string;
  poster: string;
}

export const DEFAULT_STORY_VIDEO: StoryVideo = {
  desktop: "/video/story-1440.mp4",
  mobile: "/video/story-720.mp4",
  poster: "/img/story-poster.webp",
};

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

const strings = (v: unknown): string[] | null => {
  if (!Array.isArray(v)) return null;
  const out = v.map(str).filter(Boolean);
  return out.length ? out : null;
};

const qas = (v: unknown): QA[] | null => {
  if (!Array.isArray(v)) return null;
  const out = v
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({ q: str(x.q), a: str(x.a) }))
    .filter((x) => x.q && x.a);
  return out.length ? out : null;
};

const steps = (v: unknown): Step[] | null => {
  if (!Array.isArray(v)) return null;
  const out = v
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({ step: str(x.step), desc: str(x.desc) }))
    .filter((x) => x.step && x.desc);
  return out.length ? out : null;
};

/** Non-empty override fields replace defaults; blank/invalid ones fall back. */
export function mergeServiceContent(def: ServiceContent, o: Partial<Record<keyof ServiceContent, unknown>> | undefined): ServiceContent {
  if (!o || typeof o !== "object") return def;
  return {
    metaTitle: str(o.metaTitle) || def.metaTitle,
    metaDescription: str(o.metaDescription) || def.metaDescription,
    intro: str(o.intro) || def.intro,
    priceNote: str(o.priceNote) || def.priceNote,
    features: strings(o.features) ?? def.features,
    process: steps(o.process) ?? def.process,
    faq: qas(o.faq) ?? def.faq,
  };
}

export function resolveFaq(def: QA[], o: unknown): QA[] {
  return qas(o) ?? def;
}

/** Only same-site paths are accepted (bundled /video, /img or admin uploads). */
const safeUrl = (v: unknown): string => {
  const s = str(v);
  return /^\/(video|img|api\/uploads)\/[\w./-]+$/.test(s) && !s.includes("..") ? s : "";
};

export function resolveStoryVideo(o: unknown): StoryVideo {
  const x = (o && typeof o === "object" ? o : {}) as Record<string, unknown>;
  return {
    desktop: safeUrl(x.desktop) || DEFAULT_STORY_VIDEO.desktop,
    mobile: safeUrl(x.mobile) || DEFAULT_STORY_VIDEO.mobile,
    poster: safeUrl(x.poster) || DEFAULT_STORY_VIDEO.poster,
  };
}
