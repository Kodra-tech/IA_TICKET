"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface TicketData {
  id: string;
  cliente_id: string;
  equipo_id: string;
  ingeniero_id: string | null;
  titulo: string;
  estado: string;
  created_at: string;
}

export default function TicketsGlobales() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [reasignarA, setReasignarA] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    const res = await fetch("/api/tickets");
    const data = await res.json();
    setTickets(data.tickets || []);
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleReasignar = async () => {
    if (!selectedTicket || !reasignarA) return;
    const idMap: Record<string, string> = {
      "Carlos Mendoza": "ing-1", "Ana Torres": "ing-2", "Luis Rivera": "ing-3", "Marta Jiménez": "ing-4",
    };
    await fetch("/api/tickets/" + selectedTicket, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingeniero_id: idMap[reasignarA] || "ing-1" }),
    });
    setModalOpen(false);
    setReasignarA("");
    fetchTickets();
  };

  const handleTomarTicket = async (id: string) => {
    await fetch("/api/tickets/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingeniero_id: "ing-1", estado: "asignado" }),
    });
    fetchTickets();
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
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Ingeniero</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">Cargando...</td></tr>
              ) : tickets.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">Sin tickets</td></tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id} className="border-b border-gray-100 transition hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-cyan-700">{t.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{t.titulo}</td>
                    <td className="px-4 py-3"><Badge label={t.estado} /></td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {t.ingeniero_id ? <span>Asignado</span> : <span className="text-yellow-600">Sin asignar</span>}
                    </td>
                    <td className="px-4 py-3">
                      {t.ingeniero_id ? (
                        <Button size="sm" variant="secondary" onClick={() => { setSelectedTicket(t.id); setModalOpen(true); }}>
                          Reasignar
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => handleTomarTicket(t.id)}>Tomarme</Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={"Reasignar " + selectedTicket}>
        <div className="space-y-4">
          <select value={reasignarA} onChange={(e) => setReasignarA(e.target.value)} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            <option value="">Seleccionar ingeniero</option>
            <option value="Ana Torres">Ana Torres</option>
            <option value="Luis Rivera">Luis Rivera</option>
            <option value="Marta Jiménez">Marta Jiménez</option>
          </select>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleReasignar} disabled={!reasignarA}>Confirmar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}