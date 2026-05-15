import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { getTickets, getStats } from "@/lib/data";

export default function IngenieroDashboard() {
  const stats = getStats();
  const misTickets = getTickets({ ingenieroId: "ing-1" }).slice(0, 5);
  const actividad = getTickets().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Ingeniero</h1>
        <p className="mt-1 text-gray-500">Bienvenido, Carlos Mendoza</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Card><p className="text-sm text-gray-500">Total Tickets</p><p className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</p></Card>
        <Card><p className="text-sm text-gray-500">Abiertos</p><p className="mt-1 text-2xl font-bold text-yellow-600">{stats.abiertos}</p></Card>
        <Card><p className="text-sm text-gray-500">Asignados</p><p className="mt-1 text-2xl font-bold text-blue-600">{stats.asignados}</p></Card>
        <Card><p className="text-sm text-gray-500">En espera</p><p className="mt-1 text-2xl font-bold text-orange-600">{stats.enEspera}</p></Card>
        <Card><p className="text-sm text-gray-500">Finalizados</p><p className="mt-1 text-2xl font-bold text-green-600">{stats.finalizados}</p></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mis Tickets</h2>
            <Link href="/ingeniero/tickets" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">Ver todos →</Link>
          </div>
          <div className="mt-4 space-y-3">
            {misTickets.length === 0 ? (
              <p className="text-sm text-gray-400">No tienes tickets asignados</p>
            ) : (
              misTickets.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.id} — {t.titulo}</p>
                    <p className="text-xs text-gray-500">{t.created_at}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label={t.prioridad} />
                    <Badge label={t.estado} />
                    <Link href={"/cliente/ticket/" + t.id} className="rounded bg-cyan-600 px-3 py-1 text-xs text-white hover:bg-cyan-700">Ver</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Actividad Reciente</h2>
          <div className="mt-4 space-y-3">
            {actividad.map((a) => {
              const eq = a.equipo_id; // We don't have equipo name directly in tickets
              return (
                <div key={a.id} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-mono text-xs text-gray-400">{a.created_at.split(" ")[2] || a.created_at}</span>
                  <span className="text-gray-700">
                    {a.id} — {a.titulo} ({a.estado})
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}