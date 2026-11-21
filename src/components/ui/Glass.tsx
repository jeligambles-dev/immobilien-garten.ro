import type { ElementType, ReactNode } from "react";

export default function Glass({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: { as?: ElementType; className?: string; children?: ReactNode } & Record<string, unknown>) {
  return (
    <Tag className={`glass ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
