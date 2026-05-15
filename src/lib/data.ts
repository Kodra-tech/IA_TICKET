// Data store funcional con datos de ejemplo
// Cuando se configure Supabase, se reemplaza por consultas a la BD

export interface Cliente {
  id: string;
  nombre: string;
  clinica: string;
}

export interface Equipo {
  id: string;
  cliente_id: string;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  instalacion: string;
  estado: string;
  mantenimientos: { fecha: string; tipo: string; estado: string }[];
}

export interface Ticket {
  id: string;
  equipo_id: string;
  cliente_id: string;
  ingeniero_id: string | null;
  titulo: string;
  descripcion: string;
  categoria: string;
  frecuencia: string;
  estado: string;
  prioridad: string;
  resuelto_por_ia: boolean;
  created_at: string;
  updated_at: string;
  comentarios: { autor: string; texto: string; fecha: string }[];
}

let currentUserId = "cliente-1";

export function setCurrentUser(id: string) {
  currentUserId = id;
}

export function getCurrentUserId() {
  return currentUserId;
}

// ---- CLIENTES ----
const clientes: Cliente[] = [
  { id: "cliente-1", nombre: "Dra. García", clinica: "Clínica Sonrisas" },
  { id: "cliente-2", nombre: "Dr. Pérez", clinica: "Clínica Dental+ " },
];

// ---- EQUIPOS ----
const equipos: Equipo[] = [
  { id: "eq-1", cliente_id: "cliente-1", nombre: "Scanner TRIOS 5", marca: "3Shape", modelo: "TRIOS 5", serie: "3S-2024-00421", instalacion: "12 Mar 2023", estado: "Activo", mantenimientos: [
    { fecha: "10 Ene 2025", tipo: "Preventivo", estado: "✅" }, { fecha: "05 Oct 2024", tipo: "Correctivo (motor)", estado: "✅" },
  ]},
  { id: "eq-2", cliente_id: "cliente-1", nombre: "Impresora SprintRay Pro 95", marca: "SprintRay", modelo: "Pro 95", serie: "SP-2023-00102", instalacion: "20 Jun 2023", estado: "En servicio", mantenimientos: [
    { fecha: "15 Feb 2025", tipo: "Preventivo", estado: "✅" },
  ]},
  { id: "eq-3", cliente_id: "cliente-1", nombre: "Fresadora VHF K5", marca: "VHF", modelo: "K5", serie: "VHF-2022-00889", instalacion: "5 Sep 2022", estado: "Activo", mantenimientos: []},
  { id: "eq-4", cliente_id: "cliente-1", nombre: "Equipo Profeta X1", marca: "Profeta", modelo: "X1", serie: "PRO-2024-00056", instalacion: "2 Feb 2024", estado: "Activo", mantenimientos: [
    { fecha: "20 Mar 2025", tipo: "Preventivo", estado: "✅" }, { fecha: "10 Dic 2024", tipo: "Preventivo", estado: "✅" },
  ]},
  { id: "eq-5", cliente_id: "cliente-2", nombre: "Scanner TRIOS 4", marca: "3Shape", modelo: "TRIOS 4", serie: "3S-2023-00112", instalacion: "8 Ago 2023", estado: "Activo", mantenimientos: [
    { fecha: "10 Ene 2025", tipo: "Preventivo", estado: "✅" },
  ]},
  { id: "eq-6", cliente_id: "cliente-2", nombre: "Impresora SprintRay Pro", marca: "SprintRay", modelo: "Pro", serie: "SP-2022-00892", instalacion: "15 Nov 2022", estado: "Activo", mantenimientos: []},
];

// ---- TICKETS ----
const tickets: Ticket[] = [
  { id: "TK-047", equipo_id: "eq-1", cliente_id: "cliente-1", ingeniero_id: "ing-1", titulo: "Scanner no enciende", descripcion: "El scanner TRIOS 5 no enciende desde esta mañana. Se intentó solución por IA sin éxito.", categoria: "Hardware", frecuencia: "Siempre", estado: "asignado", prioridad: "alta", resuelto_por_ia: false, created_at: "15 Mayo 2025 10:23", updated_at: "15 Mayo 2025 10:45", comentarios: [
    { autor: "Ing. Carlos Mendoza", texto: "Revisaré el equipo a las 2pm, por favor tenga acceso a la sala.", fecha: "15 Mayo 2025 11:30" },
  ]},
  { id: "TK-043", equipo_id: "eq-2", cliente_id: "cliente-1", ingeniero_id: "ing-1", titulo: "Resina no cura", descripcion: "La resina no cura correctamente en la impresora SprintRay.", categoria: "Software", frecuencia: "Intermitente", estado: "en_espera", prioridad: "media", resuelto_por_ia: false, created_at: "14 Mayo 2025 09:15", updated_at: "14 Mayo 2025 14:30", comentarios: []},
  { id: "TK-039", equipo_id: "eq-3", cliente_id: "cliente-1", ingeniero_id: "ing-1", titulo: "Fresadora vibra", descripcion: "Vibración excesiva al fresar.", categoria: "Hardware", frecuencia: "Siempre", estado: "en_progreso", prioridad: "baja", resuelto_por_ia: false, created_at: "12 Mayo 2025 16:00", updated_at: "13 Mayo 2025 10:00", comentarios: []},
  { id: "TK-051", equipo_id: "eq-5", cliente_id: "cliente-2", ingeniero_id: null, titulo: "Error de escaneo TRIOS 4", descripcion: "Error al escanear con TRIOS 4.", categoria: "Software", frecuencia: "Siempre", estado: "abierto", prioridad: "critica", resuelto_por_ia: false, created_at: "15 Mayo 2025 08:30", updated_at: "15 Mayo 2025 08:30", comentarios: []},
  { id: "TK-052", equipo_id: "eq-4", cliente_id: "cliente-1", ingeniero_id: "ing-2", titulo: "Profeta X1 no exporta STL", descripcion: "Error al exportar archivos STL desde Profeta Suite.", categoria: "Software", frecuencia: "Siempre", estado: "en_espera", prioridad: "media", resuelto_por_ia: true, created_at: "14 Mayo 2025 11:00", updated_at: "14 Mayo 2025 12:00", comentarios: []},
];

// ---- INGENIEROS ----
const ingenieros = [
  { id: "ing-1", nombre: "Carlos Mendoza" },
  { id: "ing-2", nombre: "Ana Torres" },
  { id: "ing-3", nombre: "Luis Rivera" },
  { id: "ing-4", nombre: "Marta Jiménez" },
];

// ---- FUNCIONES CRUD ----
export function getClientes() { return clientes; }
export function getCliente(id: string) { return clientes.find(c => c.id === id); }

export function getEquipos(clienteId?: string) {
  if (clienteId) return equipos.filter(e => e.cliente_id === clienteId);
  return equipos;
}
export function getEquipo(id: string) { return equipos.find(e => e.id === id); }

export function getTickets(filtros?: { estado?: string; prioridad?: string; marca?: string; ingenieroId?: string }) {
  let result = [...tickets];
  if (filtros?.estado) result = result.filter(t => t.estado === filtros.estado);
  if (filtros?.prioridad) result = result.filter(t => t.prioridad === filtros.prioridad);
  if (filtros?.marca) result = result.filter(t => getEquipo(t.equipo_id)?.marca === filtros.marca);
  if (filtros?.ingenieroId) result = result.filter(t => t.ingeniero_id === filtros.ingenieroId);
  return result.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getTicket(id: string) {
  const t = tickets.find(t => t.id === id);
  if (!t) return null;
  const eq = getEquipo(t.equipo_id);
  return {
    ...t,
    equipo_nombre: eq?.nombre || "",
    equipo_marca: eq?.marca || "",
    cliente: getCliente(t.cliente_id) || null,
    ingeniero: t.ingeniero_id ? ingenieros.find(i => i.id === t.ingeniero_id) || null : null,
  };
}

export function createTicket(data: {
  equipo_id: string;
  cliente_id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  frecuencia: string;
  prioridad: string;
  resuelto_por_ia: boolean;
}) {
  const now = new Date();
  const ticket: Ticket = {
    id: "TK-" + (100 + tickets.length + 1),
    equipo_id: data.equipo_id,
    cliente_id: data.cliente_id,
    ingeniero_id: null,
    titulo: data.titulo,
    descripcion: data.descripcion,
    categoria: data.categoria,
    frecuencia: data.frecuencia,
    estado: "abierto",
    prioridad: data.prioridad,
    resuelto_por_ia: data.resuelto_por_ia,
    created_at: now.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) + " " + now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0"),
    updated_at: now.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) + " " + now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0"),
    comentarios: [],
  };
  tickets.unshift(ticket);
  return ticket;
}

export function updateTicket(id: string, data: Partial<Ticket>) {
  const idx = tickets.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tickets[idx] = { ...tickets[idx], ...data, updated_at: new Date().toLocaleString("es-ES") };
  return tickets[idx];
}

export function addComentario(ticketId: string, autor: string, texto: string) {
  const t = tickets.find(t => t.id === ticketId);
  if (!t) return null;
  t.comentarios.push({
    autor,
    texto,
    fecha: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) + " " + new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0"),
  });
  t.updated_at = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) + " " + new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0");
  return t;
}

export function getIngenieros() { return ingenieros; }

export function getStats() {
  return {
    total: tickets.length,
    abiertos: tickets.filter(t => t.estado === "abierto").length,
    asignados: tickets.filter(t => t.estado === "asignado").length,
    enEspera: tickets.filter(t => t.estado === "en_espera").length,
    finalizados: tickets.filter(t => t.estado === "finalizado").length,
  };
}

export function getClienteStats(clienteId: string) {
  const clienteTickets = tickets.filter(t => t.cliente_id === clienteId);
  return {
    equiposActivos: equipos.filter(e => e.cliente_id === clienteId && e.estado === "Activo").length,
    ticketsAbiertos: clienteTickets.filter(t => t.estado !== "finalizado").length,
    ticketsResueltos: clienteTickets.filter(t => t.estado === "finalizado" || t.resuelto_por_ia).length,
  };
}