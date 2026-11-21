"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
