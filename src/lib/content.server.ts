// Server-side reader for admin-edited content (persistent volume on Railway), with the bundled JSON as fallback.
import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";
import { DATA_DIR } from "./paths";
import bundled from "../../data/site-content.json";
import { SERVICE_CONTENT, type ServiceContent } from "./serviceContent";
import type { PriceRow, ServiceSlug } from "./services";
import { GENERAL_FAQ } from "./faq";
import { mergeServiceContent, resolveFaq, resolveStoryVideo, type QA, type StoryVideo } from "./contentMerge";

type Raw = Record<string, unknown>;

export const getSiteContent = cache(async (): Promise<Raw> => {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, "site-content.json"), "utf-8")) as Raw;
  } catch {
    return bundled as Raw;
  }
});

export async function getPrices(): Promise<PriceRow[]> {
  const c = await getSiteContent();
  return Array.isArray(c.services) ? (c.services as PriceRow[]) : ((bundled as Raw).services as PriceRow[]);
}

export async function getServiceContent(slug: ServiceSlug): Promise<ServiceContent> {
  const c = await getSiteContent();
  const all = (c.serviceContent ?? {}) as Record<string, Partial<Record<keyof ServiceContent, unknown>>>;
  return mergeServiceContent(SERVICE_CONTENT[slug], all[slug]);
}

export async function getGeneralFaq(): Promise<QA[]> {
  return resolveFaq(GENERAL_FAQ, (await getSiteContent()).generalFaq);
}

export async function getStoryVideo(): Promise<StoryVideo> {
  return resolveStoryVideo((await getSiteContent()).storyVideo);
}
