"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/40747469681?text=Bun%C4%83%20ziua!%20A%C8%99%20dori%20mai%20multe%20informa%C8%9Bii%20despre%20serviciile%20dumneavoastr%C4%83."
      target="_blank"
      rel="noopener noreferrer"
      className="glass fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center !rounded-full text-[#25D366] transition-transform duration-200 hover:scale-110"
      aria-label="Contactează-ne pe WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
