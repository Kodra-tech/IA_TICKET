import { NextRequest, NextResponse } from "next/server";
import { getTicket, updateTicket, addComentario, getEquipo } from "@/lib/data";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ticket = getTicket(id);
  if (!ticket) return NextResponse.json({ error: "Ticket no encontrado" }, { status: 404 });

  return NextResponse.json({ ticket });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  if (body.nuevoComentario) {
    const updated = addComentario(id, body.nuevoComentario.autor, body.nuevoComentario.texto);
    if (!updated) return NextResponse.json({ error: "Ticket no encontrado" }, { status: 404 });
    return NextResponse.json({ ticket: updated });
  }

  const updated = updateTicket(id, body);
  if (!updated) return NextResponse.json({ error: "Ticket no encontrado" }, { status: 404 });
  return NextResponse.json({ ticket: updated });
}