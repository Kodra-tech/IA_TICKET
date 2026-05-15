import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default async function TicketDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const timeline = [
    { time: "15 Mayo 10:23", event: "Ticket creado (IA no resolvió)", done: true },
    { time: "15 Mayo 10:45", event: "Asignado a Ing. Carlos Mendoza", done: true },
    { time: "15 Mayo 11:00", event: "Ingeniero en camino 🚗", done: true },
    { time: "Pendiente", event: "Diagnóstico físico", done: false },
    { time: "Pendiente", event: "Resolución y cierre", done: false },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{id}</h1>
          <p className="mt-1 text-gray-500">Scanner TRIOS 5 (3Shape)</p>
        </div>
        <Badge label="En progreso" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Timeline</h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      item.done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {item.done ? "✓" : "○"}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="mt-1 w-0.5 flex-1 bg-gray-200" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-gray-900">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Mensajes del técnico</h2>
          <div className="mb-4 rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Ing. Carlos Mendoza:</span> Revisaré el equipo a las 2pm, por favor tenga acceso a la sala.
            </p>
            <p className="mt-1 text-xs text-blue-500">15 Mayo 11:30</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Agregar comentario..." />
            <Button size="sm">Enviar</Button>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Detalles del ticket</h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Equipo</dt>
            <dd className="text-gray-900">Scanner TRIOS 5</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Marca</dt>
            <dd className="text-gray-900">3Shape</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Prioridad</dt>
            <dd><Badge label="Alta" /></dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Ingeniero asignado</dt>
            <dd className="text-gray-900">Carlos Mendoza</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Descripción</dt>
            <dd className="text-gray-900">El scanner no enciende desde esta mañana. Se intentó solución por IA sin éxito.</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}