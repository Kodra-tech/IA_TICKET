"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const initialTickets = [
  { id: "TK-047", cliente: "Clínica Sonrisas", equipo: "TRIOS 5", marca: "3Shape", ingeniero: "Carlos Mendoza", estado: "asignado" },
  { id: "TK-051", cliente: "Dr. López", equipo: "VHF K5", marca: "VHF", ingeniero: null, estado: "abierto" },
  { id: "TK-052", cliente: "Clínica Plus", equipo: "Profeta", marca: "Profeta", ingeniero: "Ana Torres", estado: "en_espera" },
  { id: "TK-043", cliente: "Dr. Pérez", equipo: "SprintRay 95", marca: "SprintRay", ingeniero: "Carlos Mendoza", estado: "en_espera" },
  { id: "TK-039", cliente: "Clínica Dental+", equipo: "VHF K5", marca: "VHF", ingeniero: null, estado: "abierto" },
];

const ingenieros = ["Carlos Mendoza", "Ana Torres", "Luis Rivera", "Marta Jiménez"];

export default function TicketsGlobales() {
  const [tickets, setTickets] = useState(initialTickets);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [reasignarA, setReasignarA] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleReasignar = () => {
    if (!selectedTicket || !reasignarA) return;
    setTickets((prev) =>
      prev.map((t) => (t.id === selectedTicket ? { ...t, ingeniero: reasignarA, estado: "asignado" } : t))
    );
    setModalOpen(false);
    setReasignarA("");
    setMotivo("");
  };

  const handleTomarTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ingeniero: "Carlos Mendoza", estado: "asignado" } : t))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Todos los Tickets</h1>
        <p className="mt-1 text-gray-500">Visualiza y reasigna tickets de todos los ingenieros</p>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Ingeniero</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 transition hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-cyan-700">{t.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.cliente}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.equipo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.marca}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.ingeniero || <span className="text-yellow-600">Sin asignar</span>}</td>
                  <td className="px-4 py-3"><Badge label={t.estado} /></td>
                  <td className="px-4 py-3">
                    {t.ingeniero ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSelectedTicket(t.id);
                          setModalOpen(true);
                        }}
                      >
                        Reasignar
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleTomarTicket(t.id)}>
                        Tomarme
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Reasignar ticket ${selectedTicket}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Reasignar a:</label>
            <select
              value={reasignarA}
              onChange={(e) => setReasignarA(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Seleccionar ingeniero</option>
              {ingenieros.filter((i) => i !== "Carlos Mendoza").map((ing) => (
                <option key={ing} value={ing}>{ing}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo (opcional)</label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Motivo de reasignación..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleReasignar} disabled={!reasignarA}>Confirmar reasignación</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}