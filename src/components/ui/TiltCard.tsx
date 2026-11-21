"use client";

import type { ReactNode, PointerEvent } from "react";
import { prefersReducedMotion } from "./useInView";

export default function TiltCard({
  className = "",
  children,
  max = 10,
}: {
  className?: string;
  children?: ReactNode;
  max?: number;
}) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1200px) rotateY(${(x - 0.5) * max}deg) rotateX(${(0.5 - y) * max}deg) translateZ(10px)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };
  return (
    <div className={`tilt relative ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
      <i className="shine" aria-hidden />
    </div>
  );
}
