const badgeStyles: Record<string, string> = {
  abierto: "bg-yellow-100 text-yellow-800 border-yellow-300",
  abierta: "bg-yellow-100 text-yellow-800 border-yellow-300",
  asignado: "bg-blue-100 text-blue-800 border-blue-300",
  en_progreso: "bg-indigo-100 text-indigo-800 border-indigo-300",
  en_espera: "bg-orange-100 text-orange-800 border-orange-300",
  finalizado: "bg-green-100 text-green-800 border-green-300",
  baja: "bg-gray-100 text-gray-600 border-gray-300",
  media: "bg-blue-100 text-blue-800 border-blue-300",
  alta: "bg-orange-100 text-orange-800 border-orange-300",
  critica: "bg-red-100 text-red-800 border-red-300",
  activo: "bg-green-100 text-green-800 border-green-300",
  en_servicio: "bg-orange-100 text-orange-800 border-orange-300",
  dado_de_baja: "bg-red-100 text-red-800 border-red-300",
};

export default function Badge({ label, variant = "default" }: { label: string; variant?: string }) {
  const style = badgeStyles[label.toLowerCase()] || badgeStyles[variant] || "bg-gray-100 text-gray-700 border-gray-300";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}