import EquipoCard from "@/components/equipos/EquipoCard";

const equipos = [
  {
    id: "1",
    nombre: "Scanner TRIOS 5",
    marca: "3Shape",
    modelo: "TRIOS 5",
    serie: "3S-2024-00421",
    instalacion: "12 Mar 2023",
    estado: "Activo",
    mantenimientos: [
      { fecha: "10 Ene 2025", tipo: "Preventivo", estado: "✅" },
      { fecha: "05 Oct 2024", tipo: "Correctivo (motor)", estado: "✅" },
    ],
  },
  {
    id: "2",
    nombre: "Impresora SprintRay Pro 95",
    marca: "SprintRay",
    modelo: "Pro 95",
    serie: "SP-2023-00102",
    instalacion: "20 Jun 2023",
    estado: "En servicio",
    mantenimientos: [
      { fecha: "15 Feb 2025", tipo: "Preventivo", estado: "✅" },
    ],
  },
  {
    id: "3",
    nombre: "Fresadora VHF K5",
    marca: "VHF",
    modelo: "K5",
    serie: "VHF-2022-00889",
    instalacion: "5 Sep 2022",
    estado: "Activo",
    mantenimientos: [],
  },
  {
    id: "4",
    nombre: "Equipo Profeta X1",
    marca: "Profeta",
    modelo: "X1",
    serie: "PRO-2024-00056",
    instalacion: "2 Feb 2024",
    estado: "Activo",
    mantenimientos: [
      { fecha: "20 Mar 2025", tipo: "Preventivo", estado: "✅" },
      { fecha: "10 Dic 2024", tipo: "Preventivo", estado: "✅" },
    ],
  },
];

export default function MisEquipos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Equipos</h1>
        <p className="mt-1 text-gray-500">Gestiona y da seguimiento a tus equipos dentales</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
          <option>Todas las marcas</option>
          <option>3Shape</option>
          <option>SprintRay</option>
          <option>VHF</option>
          <option>Profeta</option>
        </select>
        <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
          <option>Todos los estados</option>
          <option>Activo</option>
          <option>En servicio</option>
          <option>Dado de baja</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por modelo..."
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {equipos.map((eq) => (
          <EquipoCard key={eq.id} equipo={eq} />
        ))}
      </div>
    </div>
  );
}