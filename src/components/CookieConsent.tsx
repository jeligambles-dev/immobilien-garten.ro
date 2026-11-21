"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="glass mx-auto max-w-4xl !bg-[rgba(10,28,18,.82)] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-ink/85 leading-relaxed">
            Folosim cookie-uri pentru a îmbunătăți experiența pe site. Prin
            continuarea navigării, ești de acord cu{" "}
            <a href="/politica-cookies" className="text-accent underline">
              politica noastră de cookie-uri
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-ink/80 hover:text-white border border-white/20 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Refuz
          </button>
          <button
            onClick={accept}
            className="btn-cta !py-2"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="p-1.5 text-ink/50 hover:text-ink cursor-pointer"
            aria-label="Închide"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
