import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const equipos = [
  { nombre: "Scanner TRIOS 5", marca: "3Shape", estado: "Activo", ultimoTicket: "Hace 3 días" },
  { nombre: "Impresora SprintRay Pro 95", marca: "SprintRay", estado: "En servicio", ultimoTicket: "Abierto" },
  { nombre: "Fresadora VHF K5", marca: "VHF", estado: "Activo", ultimoTicket: "Hace 1 mes" },
  { nombre: "Equipo Profeta X1", marca: "Profeta", estado: "Activo", ultimoTicket: "Hace 2 semanas" },
];

export default function ClienteDashboard() {
  const equiposActivos = equipos.filter((e) => e.estado === "Activo").length;
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
          <p className="mt-1 text-3xl font-bold text-gray-900">{equiposActivos}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Tickets Abiertos</p>
          <p className="mt-1 text-3xl font-bold text-yellow-600">2</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Tickets Resueltos</p>
          <p className="mt-1 text-3xl font-bold text-green-600">8</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Último Mantenimiento</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">15d</p>
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
                <th className="px-4 py-3">Último ticket</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((eq) => (
                <tr key={eq.nombre} className="border-b border-gray-100 transition hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{eq.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{eq.marca}</td>
                  <td className="px-4 py-3"><Badge label={eq.estado} /></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{eq.ultimoTicket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}