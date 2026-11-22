"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="site">
      <Navbar />
      <main>{children}</main>
      <Chatbot />
      <WhatsAppButton />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}
