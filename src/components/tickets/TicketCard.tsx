import Badge from "@/components/ui/Badge";

interface Ticket {
  id: string;
  cliente: string;
  equipo: string;
  marca: string;
  prioridad: string;
  estado: string;
  ingeniero?: string;
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <tr className="border-b border-gray-100 transition hover:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-cyan-700">{ticket.id}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">{ticket.cliente}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{ticket.equipo}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{ticket.marca}</td>
      <td className="whitespace-nowrap px-4 py-3">
        <Badge label={ticket.prioridad} />
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <Badge label={ticket.estado} />
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{ticket.ingeniero || "Sin asignar"}</td>
      <td className="whitespace-nowrap px-4 py-3">
        <button className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-cyan-700">
          Ver
        </button>
      </td>
    </tr>
  );
}