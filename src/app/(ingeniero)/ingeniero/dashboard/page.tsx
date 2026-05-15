import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const misTickets = [
  { id: "TK-047", cliente: "Clínica Sonrisas", equipo: "3Shape TRIOS", prioridad: "Alta", estado: "Asignado" },
  { id: "TK-043", cliente: "Dr. Pérez", equipo: "SprintRay Pro", prioridad: "Media", estado: "En espera" },
  { id: "TK-039", cliente: "Clínica Dental+", equipo: "VHF K5", prioridad: "Baja", estado: "En progreso" },
];

const actividad = [
  { time: "10:23", event: "TK-047 asignado a Carlos Mendoza" },
  { time: "10:15", event: "TK-043 movido a En espera" },
  { time: "09:58", event: "Nuevo ticket TK-052 de Clínica Plus" },
  { time: "09:30", event: "TK-039 actualizado a En progreso" },
];

export default function IngenieroDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Ingeniero</h1>
        <p className="mt-1 text-gray-500">Bienvenido, Carlos</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Card><p className="text-sm text-gray-500">Total Tickets</p><p className="mt-1 text-2xl font-bold text-gray-900">47</p></Card>
        <Card><p className="text-sm text-gray-500">Abiertos</p><p className="mt-1 text-2xl font-bold text-yellow-600">12</p></Card>
        <Card><p className="text-sm text-gray-500">Asignados</p><p className="mt-1 text-2xl font-bold text-blue-600">18</p></Card>
        <Card><p className="text-sm text-gray-500">En espera</p><p className="mt-1 text-2xl font-bold text-orange-600">5</p></Card>
        <Card><p className="text-sm text-gray-500">Finalizados</p><p className="mt-1 text-2xl font-bold text-green-600">12</p></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mis Tickets Hoy</h2>
            <Link href="/ingeniero/tickets" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">Ver todos →</Link>
          </div>
          <div className="mt-4 space-y-3">
            {misTickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.id} — {t.cliente}</p>
                  <p className="text-xs text-gray-500">{t.equipo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={t.prioridad} />
                  <Badge label={t.estado} />
                  <Link href={`/cliente/ticket/${t.id}`} className="rounded bg-cyan-600 px-3 py-1 text-xs text-white hover:bg-cyan-700">Ver</Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Actividad Reciente</h2>
          <div className="mt-4 space-y-3">
            {actividad.map((a, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="shrink-0 font-mono text-xs text-gray-400">{a.time}</span>
                <span className="text-gray-700">{a.event}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}