"use client";

import { useEffect, useRef, useState } from "react";

/** Muted looping header clip; stays a still image for reduced motion / save-data. */
export default function LoopVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPlay(!reduce && !conn?.saveData);
  }, []);
  useEffect(() => {
    if (play) ref.current?.play().catch(() => {});
  }, [play]);
  return play ? (
    <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={poster} alt="" fetchPriority="high" />
  );
}
