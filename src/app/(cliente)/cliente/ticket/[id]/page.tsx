import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getTicket, getEquipo } from "@/lib/data";
import { redirect } from "next/navigation";
import ComentarioForm from "./ComentarioForm";

export default async function TicketDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const ticket = getTicket(id);
  if (!ticket) redirect("/cliente/dashboard");

  const eq = getEquipo(ticket.equipo_id);
  const estadoColor = ticket.estado === "abierto" ? "Amarillo" : ticket.estado === "asignado" ? "Azul" : ticket.estado === "en_progreso" ? "Índigo" : ticket.estado === "en_espera" ? "Naranja" : "Verde";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticket {id}</h1>
          <p className="mt-1 text-gray-500">{ticket.titulo}</p>
        </div>
        <Badge label={ticket.estado} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Detalles del ticket</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Equipo</dt>
              <dd className="font-medium text-gray-900">{eq?.nombre || ticket.equipo_nombre}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Marca</dt>
              <dd className="font-medium text-gray-900">{eq?.marca || ticket.equipo_marca}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Prioridad</dt>
              <dd><Badge label={ticket.prioridad} /></dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Categoría</dt>
              <dd className="text-gray-900">{ticket.categoria}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Frecuencia</dt>
              <dd className="text-gray-900">{ticket.frecuencia}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Ingeniero</dt>
              <dd className="text-gray-900">{ticket.ingeniero?.nombre || "Sin asignar"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Creado</dt>
              <dd className="text-gray-900">{ticket.created_at}</dd>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <dt className="mb-1 text-gray-500">Descripción</dt>
              <dd className="text-gray-900">{ticket.descripcion}</dd>
            </div>
            {ticket.resuelto_por_ia && (
              <div className="border-t border-gray-100 pt-3">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Resuelto por IA</span>
              </div>
            )}
          </dl>
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Mensajes</h2>
          {ticket.comentarios.length === 0 ? (
            <p className="text-sm text-gray-400">Sin comentarios aún</p>
          ) : (
            <div className="mb-4 space-y-3">
              {ticket.comentarios.map((c, i) => (
                <div key={i} className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{c.autor}</span>
                    <span className="text-xs text-gray-400">{c.fecha}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{c.texto}</p>
                </div>
              ))}
            </div>
          )}
          <ComentarioForm ticketId={id} />
        </Card>
      </div>
    </div>
  );
}