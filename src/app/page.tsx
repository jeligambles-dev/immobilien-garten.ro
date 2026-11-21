import type { Metadata } from "next";
import ScrollStory from "@/components/home/ScrollStory";
import HomeLinks from "@/components/home/HomeLinks";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <ScrollStory />
      <HomeLinks />
    </>
  );
}
