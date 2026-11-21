import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  aside,
  as: H = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  aside?: ReactNode;
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <Reveal className={`mb-14 flex flex-wrap items-end gap-8 ${center ? "justify-center text-center" : "justify-between"}`}>
      <div className={center ? "flex flex-col items-center" : ""}>
        <div className="eyebrow">{eyebrow}</div>
        <H className="h-sec max-w-[780px]">{title}</H>
        {lead && center && <p className="lead mt-5 max-w-[560px]">{lead}</p>}
      </div>
      {lead && !center && <p className="lead max-w-[560px]">{lead}</p>}
      {aside}
    </Reveal>
  );
}
