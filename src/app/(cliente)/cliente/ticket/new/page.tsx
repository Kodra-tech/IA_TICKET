"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const equipos = [
  { id: "1", nombre: "Scanner TRIOS 5 (3Shape)", serie: "3S-2024-00421" },
  { id: "2", nombre: "Impresora SprintRay Pro 95", serie: "SP-2023-00102" },
  { id: "3", nombre: "Fresadora VHF K5", serie: "VHF-2022-00889" },
  { id: "4", nombre: "Equipo Profeta X1", serie: "PRO-2024-00056" },
];

type Step = 1 | 2 | 3 | 4;

export default function NuevoTicket() {
  const [step, setStep] = useState<Step>(1);
  const [equipo, setEquipo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [pacientesAfectados, setPacientesAfectados] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hola, voy a ayudarte a resolver el problema con tu equipo. Cuéntame más detalles sobre lo que está sucediendo.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const selectedEquipo = equipos.find((e) => e.id === equipo);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Gracias por los detalles. Intenta lo siguiente:\n1. Verifica que el cable USB esté bien conectado\n2. Reinicia el equipo por completo\n3. Si el problema persiste, avísame",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportar problema</h1>
        <p className="mt-1 text-gray-500">Paso {step} de 4</p>
      </div>

      <div className="flex gap-2">
        {([1, 2, 3, 4] as Step[]).map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition ${
              s <= step ? "bg-cyan-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">¿Qué equipo tiene el problema?</h2>
          <div className="space-y-3">
            {equipos.map((eq) => (
              <label
                key={eq.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                  equipo === eq.id
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="equipo"
                  value={eq.id}
                  checked={equipo === eq.id}
                  onChange={(e) => setEquipo(e.target.value)}
                  className="h-4 w-4 text-cyan-600"
                />
                <div>
                  <p className="font-medium text-gray-900">{eq.nombre}</p>
                  <p className="text-sm text-gray-500">Serie: {eq.serie}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!equipo}>
              Siguiente →
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Describe el problema</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="">Selecciona una categoría</option>
                <option>Software</option>
                <option>Hardware</option>
                <option>Conectividad</option>
                <option>Calibración</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
                placeholder="Ej: El scanner no enciende desde esta mañana..."
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Cuándo inició?</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Con qué frecuencia ocurre?</label>
              <select
                value={frecuencia}
                onChange={(e) => setFrecuencia(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="">Selecciona</option>
                <option>Siempre</option>
                <option>Intermitente</option>
                <option>Solo una vez</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(1)}>← Atrás</Button>
            <Button onClick={() => setStep(3)} disabled={!categoria || !descripcion}>
              Consultar con IA →
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <div className="mb-4 rounded-lg bg-cyan-50 p-3">
            <p className="text-sm font-medium text-cyan-800">
              Asistente técnico — {selectedEquipo?.nombre}
            </p>
          </div>

          <div className="mb-4 h-80 space-y-4 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleChatSend(); }}
              placeholder="Escribe tu respuesta..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <Button onClick={handleChatSend}>Enviar</Button>
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(2)}>← Atrás</Button>
            <Button onClick={() => setStep(4)} variant="danger">
              No se resolvió — Escalar
            </Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <div className="mb-6 rounded-lg bg-amber-50 p-4 text-center">
            <p className="text-lg font-medium text-amber-800">🔄 Vamos a conectarte con un técnico</p>
            <p className="mt-1 text-sm text-amber-600">
              La IA no pudo resolver el problema. Crearemos un ticket formal.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prioridad</label>
              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="">Selecciona prioridad</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica (equipo detenido)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">¿Hay pacientes afectados actualmente?</label>
              <div className="mt-1 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="pacientes"
                    value="si"
                    checked={pacientesAfectados === "si"}
                    onChange={(e) => setPacientesAfectados(e.target.value)}
                  />
                  <span className="text-sm">Sí</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="pacientes"
                    value="no"
                    checked={pacientesAfectados === "no"}
                    onChange={(e) => setPacientesAfectados(e.target.value)}
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(3)}>← Atrás</Button>
            <Button disabled={!prioridad}>📋 Crear ticket y notificar a soporte</Button>
          </div>

          <div className="mt-4 rounded-lg bg-green-50 p-4 text-center">
            <p className="text-sm text-green-700">
              Ticket #TK-2025-0047 — Recibirás notificaciones por correo
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}