"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function ComentarioForm({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setEnviando(true);
    await fetch("/api/tickets/" + ticketId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nuevoComentario: { autor: "Dra. García", texto: texto.trim() },
      }),
    });
    setTexto("");
    setEnviando(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Agregar comentario..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
      <Button size="sm" type="submit" disabled={!texto.trim() || enviando}>
        {enviando ? "..." : "Enviar"}
      </Button>
    </form>
  );
}