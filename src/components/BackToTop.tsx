"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // home is one long scroll story with its own chapter rail
  if (!visible || pathname === "/") return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="glass fixed bottom-24 right-6 z-30 grid h-11 w-11 place-items-center !rounded-full text-ink transition-transform duration-200 hover:scale-110 cursor-pointer"
      aria-label="Înapoi sus"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
