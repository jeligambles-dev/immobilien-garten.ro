"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl mb-4">
            Contact
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Suntem aici pentru tine! Sună, scrie sau completează formularul și te
            contactăm noi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-heading font-semibold text-slate-900 mb-5">
                Informații Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:0747469681"
                    className="flex items-center gap-3 text-slate-700 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Telefon</p>
                      <p className="font-semibold">0747 469 681</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@immobilien-garten.ro"
                    className="flex items-center gap-3 text-slate-700 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="font-semibold">contact@immobilien-garten.ro</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Locație</p>
                    <p className="font-semibold">Timișoara, România</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Program</p>
                    <p className="font-semibold">Luni - Sâmbătă: 07:00 - 19:00</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-green-200 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89189.53152579967!2d21.17291655!3d45.74887865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610db46d%3A0xd781b1e9187965c6!2sTimi%C8%99oara!5e0!3m2!1sro!2sro!4v1711800000000!5m2!1sro!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locație Immobilien Garten Service - Timișoara"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-green-100 p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Nume complet *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Telefon *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                    placeholder="07XX XXX XXX"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                  placeholder="email@exemplu.ro"
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Serviciu dorit
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                >
                  <option value="">Selectează un serviciu</option>
                  <option>Tuns gazon</option>
                  <option>Scarificare & aerisire</option>
                  <option>Toaletare pomi și arbuști</option>
                  <option>Tuns gard viu</option>
                  <option>Plantări profesionale</option>
                  <option>Montaj gazon natural/artificial</option>
                  <option>Sisteme de irigații</option>
                  <option>Altele</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200 resize-none"
                  placeholder="Descrie ce ai nevoie..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Mesaj trimis cu succes!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Trimite Mesajul
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
