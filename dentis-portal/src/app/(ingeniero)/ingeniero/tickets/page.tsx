"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const initialTickets = [
  { id: "TK-047", cliente: "Clínica Sonrisas", equipo: "TRIOS 5", marca: "3Shape", prioridad: "alta", estado: "asignado" },
  { id: "TK-043", cliente: "Dr. Pérez", equipo: "SprintRay 95", marca: "SprintRay", prioridad: "media", estado: "en_espera" },
  { id: "TK-039", cliente: "Clínica Dental+", equipo: "VHF K5", marca: "VHF", prioridad: "baja", estado: "en_progreso" },
  { id: "TK-051", cliente: "Dr. López", equipo: "Profeta X1", marca: "Profeta", prioridad: "critica", estado: "abierto" },
  { id: "TK-044", cliente: "Clínica Dental+", equipo: "TRIOS 4", marca: "3Shape", prioridad: "media", estado: "finalizado" },
];

export default function MisTickets() {
  const [tickets, setTickets] = useState(initialTickets);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroPrioridad, setFiltroPrioridad] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [notas, setNotas] = useState("");

  const filtered = tickets.filter((t) => {
    if (filtroEstado && t.estado !== filtroEstado) return false;
    if (filtroPrioridad && t.prioridad !== filtroPrioridad) return false;
    if (filtroMarca && t.marca !== filtroMarca) return false;
    if (busqueda && !t.cliente.toLowerCase().includes(busqueda.toLowerCase()) && !t.id.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const handleUpdate = () => {
    if (!selectedTicket || !nuevoEstado) return;
    setTickets((prev) =>
      prev.map((t) => (t.id === selectedTicket ? { ...t, estado: nuevoEstado } : t))
    );
    setModalOpen(false);
    setNuevoEstado("");
    setNotas("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Tickets</h1>
        <p className="mt-1 text-gray-500">Gestiona los tickets asignados a ti</p>
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
        <select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
          <option value="">Todas las marcas</option>
          <option value="3Shape">3Shape</option>
          <option value="SprintRay">SprintRay</option>
          <option value="VHF">VHF</option>
          <option value="Profeta">Profeta</option>
        </select>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar..."
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
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
                <th className="px-4 py-3">Prioridad</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 transition hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-cyan-700">{t.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.cliente}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.equipo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.marca}</td>
                  <td className="px-4 py-3"><Badge label={t.prioridad} /></td>
                  <td className="px-4 py-3"><Badge label={t.estado} /></td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedTicket(t.id);
                        setModalOpen(true);
                      }}
                    >
                      Actualizar estado
                    </Button>
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
        title={`Actualizar estado - ${selectedTicket}`}
      >
        <div className="space-y-4">
          <select
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">Seleccionar estado</option>
            <option value="en_progreso">En progreso</option>
            <option value="en_espera">En espera de refacción</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={3}
            placeholder="Notas de la visita..."
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdate} disabled={!nuevoEstado}>Guardar cambios</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}