import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { getEquipos, getTickets, getClienteStats } from "@/lib/data";

export default function ClienteDashboard() {
  const equipos = getEquipos("cliente-1");
  const stats = getClienteStats("cliente-1");
  const ticketsAbiertos = getTickets().filter(t => t.cliente_id === "cliente-1" && t.estado !== "finalizado");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hola, Dra. García</h1>
          <p className="mt-1 text-gray-500">Bienvenida a tu portal de soporte técnico</p>
        </div>
        <Link
          href="/cliente/ticket/new"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          + Reportar problema
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-gray-500">Equipos Activos</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.equiposActivos}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Tickets Abiertos</p>
          <p className="mt-1 text-3xl font-bold text-yellow-600">{stats.ticketsAbiertos}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Tickets Resueltos</p>
          <p className="mt-1 text-3xl font-bold text-green-600">{stats.ticketsResueltos}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Equipos Registrados</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{equipos.length}</p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Equipos Recientes</h2>
          <Link href="/cliente/equipos" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">
            Ver todos →
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Modelo</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((eq) => (
                <tr key={eq.id} className="border-b border-gray-100 transition hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{eq.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{eq.marca}</td>
                  <td className="px-4 py-3"><Badge label={eq.estado} /></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{eq.modelo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {ticketsAbiertos.length > 0 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Tus tickets activos</h2>
          <div className="space-y-3">
            {ticketsAbiertos.map((t) => (
              <Link key={t.id} href={"/cliente/ticket/" + t.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.id} — {t.titulo}</p>
                  <p className="text-xs text-gray-500">{t.created_at}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={t.prioridad} />
                  <Badge label={t.estado} />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}