import type { Metadata } from "next";
import ScrollStory from "@/components/home/ScrollStory";
import HomeLinks from "@/components/home/HomeLinks";

import { getPrices, getStoryVideo } from "@/lib/content.server";

export const metadata: Metadata = { alternates: { canonical: "/" } };
export const dynamic = "force-dynamic";

export default async function Home() {
  const [video, prices] = await Promise.all([getStoryVideo(), getPrices()]);
  return (
    <>
      <ScrollStory video={video} prices={prices} />
      <HomeLinks />
    </>
  );
}
