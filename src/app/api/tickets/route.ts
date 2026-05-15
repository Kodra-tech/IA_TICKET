import { NextRequest, NextResponse } from "next/server";
import { getTickets, createTicket } from "@/lib/data";

export async function GET(req: NextRequest) {
  const estado = req.nextUrl.searchParams.get("estado") || undefined;
  const prioridad = req.nextUrl.searchParams.get("prioridad") || undefined;
  const marca = req.nextUrl.searchParams.get("marca") || undefined;
  const ingenieroId = req.nextUrl.searchParams.get("ingeniero_id") || undefined;

  const tickets = getTickets({ estado, prioridad, marca, ingenieroId });
  return NextResponse.json({ tickets });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ticket = createTicket({
      equipo_id: body.equipo_id,
      cliente_id: body.cliente_id,
      titulo: body.titulo || "Sin título",
      descripcion: body.descripcion,
      categoria: body.categoria,
      frecuencia: body.frecuencia,
      prioridad: body.prioridad,
      resuelto_por_ia: body.resuelto_por_ia || false,
    });
    return NextResponse.json({ ticket }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear ticket" }, { status: 400 });
  }
}