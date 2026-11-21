"use client";

import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "./useInView";

export default function CountUp({ to, suffix = "", ms = 1400 }: { to: number; suffix?: string; ms?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  // server HTML / no-JS show the real number; the count-up starts from 0 once visible
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const f = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, ms]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
