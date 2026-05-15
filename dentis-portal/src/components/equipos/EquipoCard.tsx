import Badge from "@/components/ui/Badge";

interface Equipo {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  instalacion: string;
  estado: string;
  mantenimientos: { fecha: string; tipo: string; estado: string }[];
}

export default function EquipoCard({ equipo }: { equipo: Equipo }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🦷</span>
            <h3 className="font-semibold text-gray-900">{equipo.nombre}</h3>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{equipo.marca}</span>
            <Badge label={equipo.estado} />
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-1 text-sm text-gray-600">
        <p><span className="font-medium text-gray-900">Modelo:</span> {equipo.modelo}</p>
        <p><span className="font-medium text-gray-900">Serie:</span> {equipo.serie}</p>
        <p><span className="font-medium text-gray-900">Instalado:</span> {equipo.instalacion}</p>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Historial de mantenimientos</p>
        {equipo.mantenimientos.length === 0 ? (
          <p className="text-sm text-gray-400">Sin mantenimientos registrados</p>
        ) : (
          <div className="space-y-1.5">
            {equipo.mantenimientos.map((m, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{m.fecha} — {m.tipo}</span>
                <span className="text-green-600">{m.estado}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-lg border border-cyan-600 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50">
          Ver historial completo
        </button>
        <button className="flex-1 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700">
          Reportar falla
        </button>
      </div>
    </div>
  );
}