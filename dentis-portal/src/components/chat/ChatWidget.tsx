"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatWidgetProps {
  equipo: string;
  marca: string;
  problema: string;
  onEscalar: () => void;
}

export default function ChatWidget({ equipo, marca, problema, onEscalar }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hola, soy el asistente técnico de " + marca + ". Voy a ayudarte a resolver el problema con tu " + equipo + ". ¿Qué está sucediendo exactamente?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          equipo,
          marca,
          problema,
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Lo siento, no pude procesar tu mensaje. ¿Puedes intentar de nuevo?";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIntentos((prev) => prev + 1);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="rounded-t-xl bg-cyan-600 px-4 py-3">
        <p className="font-medium text-white">
          Asistente técnico — {equipo}
        </p>
        <p className="text-xs text-cyan-100">{marca}</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "400px" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-500">
              Pensando...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Describe el problema..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            Enviar
          </Button>
        </div>
        {intentos >= 3 && (
          <div className="mt-3 text-center">
            <p className="mb-2 text-sm text-gray-500">
              Ya intentamos varias soluciones sin éxito.
            </p>
            <Button variant="danger" size="sm" onClick={onEscalar}>
              Escalar a técnico humano
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}