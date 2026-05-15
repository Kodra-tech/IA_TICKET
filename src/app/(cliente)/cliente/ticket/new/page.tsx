"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const equiposList = [
  { id: "eq-1", nombre: "Scanner TRIOS 5 (3Shape)", serie: "3S-2024-00421" },
  { id: "eq-2", nombre: "Impresora SprintRay Pro 95", serie: "SP-2023-00102" },
  { id: "eq-3", nombre: "Fresadora VHF K5", serie: "VHF-2022-00889" },
  { id: "eq-4", nombre: "Equipo Profeta X1", serie: "PRO-2024-00056" },
];

type Step = 1 | 2 | 3 | 4;

export default function NuevoTicket() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [equipoId, setEquipoId] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [creando, setCreando] = useState(false);
  const [ticketCreado, setTicketCreado] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hola, soy el asistente técnico especialista. Cuéntame más detalles sobre lo que está sucediendo con tu equipo.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const selectedEquipo = equiposList.find((e) => e.id === equipoId);

  const handleChatSend = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userText = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", content: userText }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { role: "user", content: userText }].slice(1),
          equipo: selectedEquipo?.nombre || "",
          marca: selectedEquipo?.nombre?.match(/\((.*?)\)/)?.[1] || "",
          problema: descripcion,
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply || "¿Puedes darme más detalles?" }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleCrearTicket = async () => {
    setCreando(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipo_id: equipoId,
          cliente_id: "cliente-1",
          titulo: descripcion.split("\n")[0].slice(0, 60),
          descripcion,
          categoria,
          frecuencia,
          prioridad,
          resuelto_por_ia: false,
        }),
      });
      const data = await res.json();
      if (data.ticket) {
        setTicketCreado(data.ticket.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreando(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportar problema</h1>
        <p className="mt-1 text-gray-500">Paso {step} de 4</p>
      </div>

      <div className="flex gap-2">
        {([1, 2, 3, 4] as Step[]).map((s) => (
          <div key={s} className={`h-2 flex-1 rounded-full transition ${s <= step ? "bg-cyan-600" : "bg-gray-200"}`} />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">¿Qué equipo tiene el problema?</h2>
          <div className="space-y-3">
            {equiposList.map((eq) => (
              <label key={eq.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${equipoId === eq.id ? "border-cyan-500 bg-cyan-50" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="equipo" value={eq.id} checked={equipoId === eq.id} onChange={(e) => setEquipoId(e.target.value)} className="h-4 w-4 text-cyan-600" />
                <div>
                  <p className="font-medium text-gray-900">{eq.nombre}</p>
                  <p className="text-sm text-gray-500">Serie: {eq.serie}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!equipoId}>Siguiente →</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Describe el problema</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option value="">Selecciona una categoría</option>
                <option>Software</option><option>Hardware</option><option>Conectividad</option><option>Calibración</option><option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={4} placeholder="Ej: El scanner no enciende desde esta mañana..." className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Cuándo inició?</label>
              <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Con qué frecuencia ocurre?</label>
              <select value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option value="">Selecciona</option>
                <option>Siempre</option><option>Intermitente</option><option>Solo una vez</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(1)}>← Atrás</Button>
            <Button onClick={() => setStep(3)} disabled={!categoria || !descripcion}>Consultar con IA →</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <div className="mb-4 rounded-lg bg-cyan-50 p-3">
            <p className="text-sm font-medium text-cyan-800">Asistente técnico — {selectedEquipo?.nombre}</p>
          </div>
          <div className="mb-4 h-80 space-y-4 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${msg.role === "user" ? "bg-cyan-600 text-white" : "bg-white text-gray-800 shadow-sm"}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-400 shadow-sm">Analizando...</div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleChatSend(); }} placeholder="Escribe tu respuesta..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" disabled={chatLoading} />
            <Button onClick={handleChatSend} disabled={chatLoading || !chatInput.trim()}>Enviar</Button>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(2)}>← Atrás</Button>
            <Button onClick={() => setStep(4)} variant="danger">No se resolvió — Escalar</Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <div className="mb-6 rounded-lg bg-amber-50 p-4 text-center">
            <p className="text-lg font-medium text-amber-800">🔄 Vamos a conectarte con un técnico</p>
            <p className="mt-1 text-sm text-amber-600">La IA no pudo resolver el problema. Crearemos un ticket formal.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prioridad</label>
              <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option value="">Selecciona prioridad</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica (equipo detenido)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(3)}>← Atrás</Button>
            <Button onClick={handleCrearTicket} disabled={!prioridad || creando}>
              {creando ? "Creando..." : "📋 Crear ticket y notificar a soporte"}
            </Button>
          </div>

          {ticketCreado && (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-center">
              <p className="text-sm font-medium text-green-700">Ticket {ticketCreado} creado con éxito</p>
              <p className="mt-1 text-xs text-green-600">Recibirás notificaciones por correo</p>
              <Button
                className="mt-3"
                size="sm"
                onClick={() => router.push("/cliente/ticket/" + ticketCreado)}
              >
                Ver seguimiento del ticket
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}