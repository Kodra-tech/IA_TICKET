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
  onEscalar: (resumen: string) => void;
}

const nivelEtiquetas = ["", "Diagnóstico básico", "Soluciones guiadas", "Diagnóstico avanzado"];

export default function ChatWidget({ equipo, marca, problema, onEscalar }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🦷 **Soporte técnico " + marca + "**\n\nHola, soy el asistente especialista en " + equipo + ". Voy a ayudarte a resolver este problema paso a paso.\n\nPara empezar, cuéntame:\n1. ¿El equipo enciende? ¿Ves alguna luz o pantalla?\n2. ¿Aparece algún mensaje de error?\n3. ¿Desde cuándo ocurre?\n4. ¿Ocurre siempre o a veces?\n5. ¿Hubo algún cambio reciente?\n6. ¿Qué has intentado?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [nivel, setNivel] = useState(1);
  const [intentos, setIntentos] = useState(0);
  const [solucionesIntentadas, setSolucionesIntentadas] = useState<string[]>([]);
  const [resumenCaso, setResumenCaso] = useState("");
  const [mostrarEscalar, setMostrarEscalar] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buildResumen = () => {
    const historial = messages.map((m) => m.role + ": " + m.content.slice(0, 200)).join("\n");
    return "=== RESUMEN DEL CASO ===\nEquipo: " + equipo + "\nMarca: " + marca + "\nProblema inicial: " + problema +
      "\nNivel alcanzado: " + nivelEtiquetas[nivel] + "\nIntentos de solución: " + intentos +
      "\nSoluciones intentadas: " + solucionesIntentadas.join(", ") +
      "\n\nHistorial:\n" + historial;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const userText = input;
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
          problema: problema + (solucionesIntentadas.length > 0 ? " (ya se intentó: " + solucionesIntentadas.join(", ") + ")" : ""),
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Lo siento, no pude procesar tu mensaje. ¿Puedes intentar de nuevo?";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      if (userText.toLowerCase().includes("no funcion") || userText.toLowerCase().includes("no sirvi") || userText.toLowerCase().includes("no se pudo") || userText.toLowerCase().includes("no resuelve")) {
        setIntentos((prev) => {
          const newCount = prev + 1;
          setSolucionesIntentadas((s) => [...s, "Intento " + newCount]);
          if (newCount >= 3) {
            setNivel(3);
            setMostrarEscalar(true);
            setResumenCaso(buildResumen());
          } else if (newCount >= 1) {
            setNivel(Math.min(newCount + 1, 3));
          }
          return newCount;
        });
      }

      if (userText.toLowerCase().includes("si funcion") || userText.toLowerCase().includes("funciona") || userText.toLowerCase().includes("se resolvi")) {
        setIntentos(0);
        setNivel(1);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleEscalar = () => {
    const resumen = buildResumen();
    setResumenCaso(resumen);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "🔄 **Escalando al equipo técnico humano**\n\nHe preparado un resumen completo del caso para el ingeniero:\n\n```\n" + resumen + "\n```\n\nUn técnico especializado te contactará pronto. Gracias por tu paciencia.",
      },
    ]);

    setTimeout(() => onEscalar(resumen), 1500);
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="rounded-t-xl bg-cyan-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Asistente técnico — {equipo}</p>
            <p className="text-xs text-cyan-100">{marca}</p>
          </div>
          <span className="rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-medium text-white">
            Nivel {nivel}/3
          </span>
        </div>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 flex-1 rounded-full transition ${
                n <= nivel ? "bg-white" : "bg-cyan-400"
              }`}
            />
          ))}
        </div>
        <p className="mt-1 text-xs text-cyan-200">{nivelEtiquetas[nivel]}</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "420px" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-50 text-gray-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-500">
              Analizando el problema...
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
            placeholder={nivel === 1 ? "Ej: No enciende, la luz parpadea..." : "Describe el resultado..."}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            Enviar
          </Button>
        </div>

        <div className="mt-2 flex gap-2 text-xs text-gray-400">
          <button
            className="rounded px-2 py-1 hover:bg-gray-100"
            onClick={() => setInput(prev => (prev ? prev + " No funcionó, ¿qué más puedo hacer?" : "No funcionó, ¿qué más puedo hacer?"))}
          >
            ❌ No funcionó
          </button>
          <button
            className="rounded px-2 py-1 hover:bg-gray-100"
            onClick={() => setInput(prev => (prev ? prev + " Sí, funcionó" : "Sí, funcionó"))}
          >
            ✅ Funcionó
          </button>
        </div>

        {mostrarEscalar && (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="mb-2 text-sm font-medium text-amber-800">
              Ya intentamos varias soluciones sin éxito.
            </p>
            <p className="mb-3 text-xs text-amber-600">
              Al escalar, el ingeniero recibirá un resumen completo de lo que ya probamos para que no tengas que repetir nada.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" size="sm" onClick={handleEscalar}>
                Escalar a técnico humano
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setMostrarEscalar(false)}>
                Seguir intentando
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}