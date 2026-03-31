import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Immobilien Garten Service | Amenajări Grădini Timișoara",
    template: "%s | Immobilien Garten Service",
  },
  description:
    "Grădina ta, cartea noastră de vizită! Servicii profesionale de amenajare grădini, tuns gazon, sisteme de irigații în Timișoara. Sună: 0747 469 681",
  keywords: [
    "amenajare gradini Timisoara",
    "tuns gazon",
    "sisteme irigatii",
    "gazon rulou",
    "toaletare pomi",
    "gard viu",
    "peisagistica",
    "landscaping Timisoara",
    "intretinere spatii verzi",
  ],
  authors: [{ name: "Immobilien Garten Service" }],
  creator: "Immobilien Garten Service",
  metadataBase: new URL("https://immobilien-garten.ro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://immobilien-garten.ro",
    siteName: "Immobilien Garten Service",
    title: "Immobilien Garten Service | Amenajări Grădini Timișoara",
    description:
      "Transformăm orice spațiu verde într-un loc perfect. Tuns gazon, plantări, sisteme irigații, gazon rulou. Sună: 0747 469 681",
    images: [
      {
        url: "/logo1.png",
        width: 512,
        height: 512,
        alt: "Immobilien Garten Service Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immobilien Garten Service | Amenajări Grădini Timișoara",
    description:
      "Servicii profesionale de amenajare grădini în Timișoara. Sună: 0747 469 681",
    images: ["/logo1.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <GoogleAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
        <WhatsAppButton />
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
