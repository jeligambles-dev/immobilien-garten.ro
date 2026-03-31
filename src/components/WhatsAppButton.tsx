"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/40747469681?text=Bun%C4%83%20ziua!%20A%C8%99%20dori%20mai%20multe%20informa%C8%9Bii%20despre%20serviciile%20dumneavoastr%C4%83."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 h-14 w-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg shadow-green-600/30 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
      aria-label="Contactează-ne pe WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
