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
  titulo: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  created_at: string;
}

export default function MisTickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [notas, setNotas] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    const params = new URLSearchParams({ ingeniero_id: "ing-1" });
    if (filtroEstado) params.set("estado", filtroEstado);
    if (filtroPrioridad) params.set("prioridad", filtroPrioridad);
    const res = await fetch("/api/tickets?" + params.toString());
    const data = await res.json();
    setTickets(data.tickets || []);
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, [filtroEstado, filtroPrioridad]);

  const filtered = busqueda
    ? tickets.filter((t) => t.titulo.toLowerCase().includes(busqueda.toLowerCase()) || t.id.toLowerCase().includes(busqueda.toLowerCase()))
    : tickets;

  const handleUpdate = async () => {
    if (!selectedTicket || !nuevoEstado) return;
    await fetch("/api/tickets/" + selectedTicket, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    setModalOpen(false);
    setNuevoEstado("");
    setNotas("");
    fetchTickets();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Tickets</h1>
        <p className="mt-1 text-gray-500">Tickets asignados a ti</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
          <option value="">Todos los estados</option>
          <option value="abierto">Abierto</option>
          <option value="asignado">Asignado</option>
          <option value="en_progreso">En progreso</option>
          <option value="en_espera">En espera</option>
          <option value="finalizado">Finalizado</option>
        </select>
        <select value={filtroPrioridad} onChange={(e) => setFiltroPrioridad(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
          <option value="">Todas las prioridades</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar..." className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Prioridad</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Creado</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">Cargando...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">Sin tickets</td></tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-b border-gray-100 transition hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-cyan-700">{t.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{t.titulo}</td>
                    <td className="px-4 py-3"><Badge label={t.prioridad} /></td>
                    <td className="px-4 py-3"><Badge label={t.estado} /></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{t.created_at}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" onClick={() => { setSelectedTicket(t.id); setModalOpen(true); }}>Actualizar</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={"Actualizar estado - " + selectedTicket}>
        <div className="space-y-4">
          <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            <option value="">Seleccionar estado</option>
            <option value="en_progreso">En progreso</option>
            <option value="en_espera">En espera de refacción</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={3} placeholder="Notas de la visita..." className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdate} disabled={!nuevoEstado}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}