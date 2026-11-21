"use client";

import { useEffect, useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import ServiceArea, { AreaChips, useAreas } from "@/components/ServiceArea";
import { SERVICES, serviceBySlug } from "@/lib/services";
import { Phone, Mail, Send, Clock, CheckCircle, AlertCircle, Loader2, MessageCircle } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [service, setService] = useState("");
  const [extraOption, setExtraOption] = useState<string | null>(null);
  const areas = useAreas();

  // prefill from /contact?serviciu=<slug> or ?produs=<title>
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const svc = serviceBySlug(q.get("serviciu") ?? "");
    const produs = q.get("produs");
    if (svc) setService(svc.title);
    else if (produs) {
      const label = `Produs: ${produs.slice(0, 80)}`;
      setExtraOption(label);
      setService(label);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setService("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Eroare la trimitere.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Eroare de conexiune. Încercați din nou sau sunați-ne direct.");
      setStatus("error");
    }
  }

  const info = [
    { icon: Phone, k: "Telefon", v: "0747 469 681", href: "tel:0747469681" },
    { icon: MessageCircle, k: "WhatsApp", v: "Scrie-ne pe WhatsApp", href: "https://wa.me/40747469681" },
    { icon: Mail, k: "Email", v: "contact@immobilien-garten.ro", href: "mailto:contact@immobilien-garten.ro" },
    { icon: Clock, k: "Program", v: "Luni - Sâmbătă: 07:00 - 19:00", href: null },
  ];

  return (
    <div className="glow-bg pb-28 pt-40">
      <section className="wrap">
        <SectionHead
          as="h1"
          eyebrow="Contact"
          title={<>Hai să vorbim despre <em>grădina ta</em>.</>}
          lead="Suntem aici pentru tine! Sună, scrie sau completează formularul și te contactăm noi."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {info.map((i) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
                    <i.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[.14em] text-leaf">{i.k}</span>
                    <span className="block break-words font-semibold">{i.v}</span>
                  </span>
                </>
              );
              return i.href ? (
                <a key={i.k} href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="glass flex items-center gap-4 p-5 transition-colors hover:bg-white/[.13]">
                  {inner}
                </a>
              ) : (
                <div key={i.k} className="glass flex items-center gap-4 p-5">{inner}</div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="glass space-y-5 p-6 sm:p-8 lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-muted">Nume complet *</label>
                <input id="name" name="name" type="text" required className="field" placeholder="Ion Popescu" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-muted">Telefon *</label>
                <input id="phone" name="phone" type="tel" required className="field" placeholder="07XX XXX XXX" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted">Email</label>
              <input id="email" name="email" type="email" className="field" placeholder="email@exemplu.ro" />
            </div>
            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-muted">Serviciu dorit</label>
              <select id="service" name="service" className="field" value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Selectează un serviciu</option>
                {SERVICES.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
                {extraOption && <option>{extraOption}</option>}
                <option>Altele</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-muted">Mesaj *</label>
              <textarea id="message" name="message" required rows={4} className="field resize-none" placeholder="Descrie ce ai nevoie..." />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}
            {status === "success" && (
              <div className="flex items-center gap-2 rounded-2xl border border-leaf/40 bg-leaf/10 px-4 py-3 text-sm text-leaf">
                <CheckCircle className="h-4 w-4 shrink-0" />
                Mesajul a fost trimis cu succes! Te vom contacta în curând.
              </div>
            )}

            <button type="submit" disabled={status === "loading"} className="btn-cta w-full !py-4 !text-base disabled:opacity-60">
              {status === "loading" ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Se trimite...</>
              ) : status === "success" ? (
                <><CheckCircle className="h-5 w-5" /> Trimis!</>
              ) : (
                <><Send className="h-5 w-5" /> Trimite mesajul</>
              )}
            </button>
          </form>
        </div>
      </section>

      <section className="wrap grid items-center gap-10 pt-28 lg:grid-cols-2">
        <div>
          <div className="eyebrow">Zona de acoperire</div>
          <h2 className="h-sec mb-5">
            Venim la tine, <em>oriunde în jurul Timișoarei</em>.
          </h2>
          <p className="lead mb-7">
            Oferim servicii în Timișoara și împrejurimi. Pentru alte zone, <a href="tel:0747469681" className="text-accent underline underline-offset-4">sună-ne</a>.
          </p>
          <AreaChips areas={areas} />
        </div>
        <ServiceArea areas={areas} />
      </section>
    </div>
  );
}
