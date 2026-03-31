"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Calculator } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
  type?: "text" | "calculator";
}

const quickReplies = [
  "Ce servicii oferiți?",
  "Estimare preț",
  "Vreau o programare",
  "Aveți gazon artificial?",
];

const prices: Record<string, { unit: string; min: number; max: number }> = {
  "Tuns gazon": { unit: "mp", min: 0.5, max: 1.5 },
  "Scarificare & aerisire": { unit: "mp", min: 1, max: 2.5 },
  "Toaletare pomi": { unit: "buc", min: 50, max: 200 },
  "Tuns gard viu": { unit: "ml", min: 5, max: 15 },
  "Plantări profesionale": { unit: "mp", min: 15, max: 40 },
  "Montaj gazon rulou": { unit: "mp", min: 20, max: 35 },
  "Gazon artificial": { unit: "mp", min: 40, max: 80 },
  "Sistem irigații": { unit: "mp", min: 8, max: 20 },
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("servicii") || lower.includes("oferiti") || lower.includes("faceți"))
    return "Oferim: tuns gazon, scarificare & aerisire, toaletare pomi & arbuști, tuns gard viu, plantări profesionale, montaj gazon natural/artificial și sisteme de irigații. Scrie \"Estimare preț\" pentru un calcul rapid!";
  if (lower.includes("pret") || lower.includes("preț") || lower.includes("cost") || lower.includes("cât") || lower.includes("estimare"))
    return "CALCULATOR";
  if (lower.includes("programare") || lower.includes("programez") || lower.includes("vreau"))
    return "Pentru programări, sună-ne la 0747 469 681 sau completează formularul de pe pagina de Contact. Te contactăm în cel mai scurt timp!";
  if (lower.includes("gazon artificial"))
    return "Da! Montăm gazon artificial premium (40-80 lei/mp), cu durabilitate 10+ ani, rezistent UV și fără întreținere. Include pregătire teren + montaj. Sună la 0747 469 681 pentru ofertă exactă!";
  if (lower.includes("gazon") || lower.includes("iarba") || lower.includes("iarbă"))
    return "Tuns gazon: 0.50-1.50 lei/mp. Montaj gazon rulou: 20-35 lei/mp (include pregătire teren). Scrie \"Estimare preț\" pentru un calcul personalizat!";
  if (lower.includes("irigat"))
    return "Sisteme de irigații: 8-20 lei/mp, în funcție de complexitate. Include proiectare, montaj și programare. Sună la 0747 469 681 pentru consultanță gratuită!";
  return "Mulțumim pentru mesaj! Pentru informații detaliate sau o ofertă personalizată, sună-ne la 0747 469 681 sau scrie \"Estimare preț\" pentru un calcul rapid.";
}

function PriceCalculator({ onResult }: { onResult: (text: string) => void }) {
  const [service, setService] = useState("");
  const [qty, setQty] = useState("");

  function calculate() {
    if (!service || !qty) return;
    const p = prices[service];
    const q = parseFloat(qty);
    if (!p || isNaN(q) || q <= 0) return;
    const min = Math.round(p.min * q);
    const max = Math.round(p.max * q);
    onResult(
      `Estimare pentru ${service} (${q} ${p.unit}):\n💰 ${min} - ${max} lei\n\nPrețul exact depinde de teren și complexitate. Sună la 0747 469 681 pentru ofertă finală!`
    );
  }

  return (
    <div className="bg-green-50 rounded-xl p-3 space-y-2">
      <p className="text-xs font-semibold text-green-800 flex items-center gap-1">
        <Calculator className="h-3.5 w-3.5" />
        Estimare Preț
      </p>
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="w-full text-xs rounded-lg border border-green-200 px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        <option value="">Alege serviciul...</option>
        {Object.entries(prices).map(([name, p]) => (
          <option key={name} value={name}>
            {name} ({p.min}-{p.max} lei/{p.unit})
          </option>
        ))}
      </select>
      {service && (
        <div className="flex gap-2">
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder={`Câți ${prices[service]?.unit || "mp"}?`}
            className="flex-1 text-xs rounded-lg border border-green-200 px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
            min="1"
          />
          <button
            onClick={calculate}
            disabled={!qty}
            className="bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200"
          >
            Calculează
          </button>
        </div>
      )}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bună! Sunt asistentul Immobilien Garten Service. Cu ce te pot ajuta? Poți cere și o estimare de preț!",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = getBotResponse(text);
      if (response === "CALCULATOR") {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Completează formularul de mai jos pentru o estimare rapidă:",
            type: "calculator",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: response }]);
      }
    }, 600);
  }

  function handleCalculatorResult(text: string) {
    setMessages((prev) => [...prev, { role: "bot", text }]);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg shadow-green-600/30 flex items-center justify-center transition-colors duration-200 hover:scale-110 cursor-pointer"
          aria-label="Deschide chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-green-100 flex flex-col overflow-hidden"
          style={{ height: "min(560px, calc(100vh - 6rem))" }}
        >
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Asistent Virtual</p>
                <p className="text-xs text-green-200">
                  Immobilien Garten Service
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-green-500 p-1.5 rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="Închide chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <div className="h-7 w-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-green-600 text-white rounded-br-md"
                        : "bg-green-50 text-slate-700 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {msg.type === "calculator" && (
                  <div className="ml-9 mt-2">
                    <PriceCalculator onResult={handleCalculatorResult} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-green-100 p-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrie un mesaj..."
                className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-10 w-10 bg-green-600 hover:bg-green-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors duration-200 cursor-pointer"
                aria-label="Trimite"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
