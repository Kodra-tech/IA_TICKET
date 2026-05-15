import { NextRequest, NextResponse } from "next/server";
import { getEquipos } from "@/lib/data";

export async function GET(req: NextRequest) {
  const clienteId = req.nextUrl.searchParams.get("cliente_id");
  const equipos = getEquipos(clienteId || undefined);

  const result = equipos.map((e) => ({
    id: e.id,
    nombre: e.nombre,
    marca: e.marca,
    modelo: e.modelo,
    serie: e.serie,
    instalacion: e.instalacion,
    estado: e.estado,
    mantenimientos: e.mantenimientos,
  }));

  return NextResponse.json({ equipos: result });
}