"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickReplies = [
  "Ce servicii oferiți?",
  "Cât costă tuns gazonul?",
  "Vreau o programare",
  "Aveți gazon artificial?",
];

const botResponses: Record<string, string> = {
  servicii:
    "Oferim: tuns gazon, scarificare & aerisire, toaletare pomi & arbuști, tuns gard viu, plantări profesionale, montaj gazon natural/artificial și sisteme de irigații.",
  cost: "Prețurile variază în funcție de suprafață și complexitate. Sună-ne la 0747 469 681 pentru o ofertă personalizată!",
  programare:
    "Pentru programări, sună-ne la 0747 469 681 sau completează formularul de pe pagina de Contact. Te contactăm în cel mai scurt timp!",
  gazon:
    "Da! Montăm atât gazon natural rulou cât și gazon artificial premium, cu durabilitate de peste 10 ani. Contactează-ne pentru detalii!",
  default:
    "Mulțumim pentru mesaj! Pentru informații detaliate, te rugăm să ne suni la 0747 469 681 sau să completezi formularul de contact.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("servicii") || lower.includes("oferiti") || lower.includes("faceți"))
    return botResponses.servicii;
  if (lower.includes("cost") || lower.includes("pret") || lower.includes("preț") || lower.includes("cât"))
    return botResponses.cost;
  if (lower.includes("programare") || lower.includes("programez") || lower.includes("vreau"))
    return botResponses.programare;
  if (lower.includes("gazon") || lower.includes("iarba") || lower.includes("iarbă"))
    return botResponses.gazon;
  return botResponses.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bună! Sunt asistentul Immobilien Garten Service. Cu ce te pot ajuta?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = { role: "bot", text: getBotResponse(text) };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  }

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg shadow-green-600/30 flex items-center justify-center transition-colors duration-200 hover:scale-110 cursor-pointer"
          aria-label="Deschide chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-green-100 flex flex-col overflow-hidden"
          style={{ height: "min(520px, calc(100vh - 6rem))" }}
        >
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover bg-white/20"
              />
              <div>
                <p className="text-sm font-semibold">Asistent Virtual</p>
                <p className="text-xs text-green-200">Immobilien Garten Service</p>
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
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="h-7 w-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
