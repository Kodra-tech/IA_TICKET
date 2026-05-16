-- =============================================
-- DENTISPORTAL - Esquema de Base de Datos
-- =============================================

-- Extensiones
create extension if not exists "uuid-ossp";

-- =============================================
-- TABLAS
-- =============================================

-- Clientes
create table clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  clinica text not null,
  email text unique not null,
  telefono text,
  created_at timestamptz default now()
);

-- Ingenieros
create table ingenieros (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text unique not null,
  created_at timestamptz default now()
);

-- Equipos dentales
create table equipos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id) on delete cascade,
  nombre text not null,
  marca text not null check (marca in ('3Shape', 'SprintRay', 'VHF', 'Profeta')),
  modelo text not null,
  numero_serie text unique,
  fecha_instalacion date,
  estado text default 'Activo' check (estado in ('Activo', 'En servicio', 'Dado de baja')),
  created_at timestamptz default now()
);

-- Tickets
create table tickets (
  id text primary key,
  equipo_id uuid references equipos(id) on delete cascade,
  cliente_id uuid references clientes(id) on delete cascade,
  ingeniero_id uuid references ingenieros(id) on delete set null,
  titulo text not null,
  descripcion text not null,
  categoria text default 'Otro',
  frecuencia text default 'Siempre',
  estado text default 'abierto' check (estado in ('abierto', 'asignado', 'en_progreso', 'en_espera', 'finalizado', 'cancelado')),
  prioridad text default 'media' check (prioridad in ('baja', 'media', 'alta', 'critica')),
  resuelto_por_ia boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Comentarios de tickets
create table comentarios (
  id uuid primary key default gen_random_uuid(),
  ticket_id text references tickets(id) on delete cascade,
  autor text not null,
  texto text not null,
  created_at timestamptz default now()
);

-- Mantenimientos
create table mantenimientos (
  id uuid primary key default gen_random_uuid(),
  equipo_id uuid references equipos(id) on delete cascade,
  tipo text not null check (tipo in ('Preventivo', 'Correctivo')),
  descripcion text,
  realizado_por uuid references ingenieros(id) on delete set null,
  fecha date not null,
  created_at timestamptz default now()
);

-- Historial del chat IA por ticket
create table chat_ia_historial (
  id uuid primary key default gen_random_uuid(),
  ticket_id text references tickets(id) on delete cascade,
  rol text not null check (rol in ('user', 'assistant')),
  contenido text not null,
  created_at timestamptz default now()
);

-- =============================================
-- ÍNDICES
-- =============================================
create index idx_equipos_cliente on equipos(cliente_id);
create index idx_equipos_marca on equipos(marca);
create index idx_tickets_cliente on tickets(cliente_id);
create index idx_tickets_ingeniero on tickets(ingeniero_id);
create index idx_tickets_estado on tickets(estado);
create index idx_tickets_prioridad on tickets(prioridad);
create index idx_comentarios_ticket on comentarios(ticket_id);
create index idx_mantenimientos_equipo on mantenimientos(equipo_id);

-- =============================================
-- SEED DATA
-- =============================================

-- Clientes
insert into clientes (id, nombre, clinica, email, telefono) values
  ('00000000-0000-0000-0000-000000000001', 'Dra. García', 'Clínica Sonrisas', 'dra.garcia@sonrisas.com', '+52 555 123 4567'),
  ('00000000-0000-0000-0000-000000000002', 'Dr. Pérez', 'Clínica Dental+', 'dr.perez@dentalplus.com', '+52 555 234 5678');

-- Ingenieros
insert into ingenieros (id, nombre, email) values
  ('00000000-0000-0000-0000-000000000010', 'Carlos Mendoza', 'carlos.mendoza@dentisportal.com'),
  ('00000000-0000-0000-0000-000000000011', 'Ana Torres', 'ana.torres@dentisportal.com'),
  ('00000000-0000-0000-0000-000000000012', 'Luis Rivera', 'luis.rivera@dentisportal.com'),
  ('00000000-0000-0000-0000-000000000013', 'Marta Jiménez', 'marta.jimenez@dentisportal.com');

-- Equipos
insert into equipos (id, cliente_id, nombre, marca, modelo, numero_serie, fecha_instalacion, estado) values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Scanner TRIOS 5', '3Shape', 'TRIOS 5', '3S-2024-00421', '2023-03-12', 'Activo'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Impresora SprintRay Pro 95', 'SprintRay', 'Pro 95', 'SP-2023-00102', '2023-06-20', 'En servicio'),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Fresadora VHF K5', 'VHF', 'K5', 'VHF-2022-00889', '2022-09-05', 'Activo'),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'Equipo Profeta X1', 'Profeta', 'X1', 'PRO-2024-00056', '2024-02-02', 'Activo'),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000002', 'Scanner TRIOS 4', '3Shape', 'TRIOS 4', '3S-2023-00112', '2023-08-08', 'Activo'),
  ('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0000-000000000002', 'Impresora SprintRay Pro', 'SprintRay', 'Pro', 'SP-2022-00892', '2022-11-15', 'Activo');

-- Tickets
insert into tickets (id, equipo_id, cliente_id, ingeniero_id, titulo, descripcion, categoria, frecuencia, estado, prioridad, resuelto_por_ia, created_at) values
  ('TK-047', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Scanner no enciende', 'El scanner TRIOS 5 no enciende desde esta mañana. Se intentó solución por IA sin éxito.', 'Hardware', 'Siempre', 'asignado', 'alta', false, now() - interval '3 hours'),
  ('TK-043', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Resina no cura correctamente', 'La resina no cura correctamente en la impresora SprintRay. Ocurre de forma intermitente.', 'Software', 'Intermitente', 'en_espera', 'media', false, now() - interval '1 day'),
  ('TK-039', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'Fresadora vibra excesivamente', 'Vibración excesiva al fresar. Posible desgaste de herramienta.', 'Hardware', 'Siempre', 'en_progreso', 'baja', false, now() - interval '2 days'),
  ('TK-051', '00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000002', null, 'Error de escaneo TRIOS 4', 'Error al escanear con TRIOS 4. Código: ERR-202.', 'Software', 'Siempre', 'abierto', 'critica', false, now() - interval '5 hours'),
  ('TK-052', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Profeta X1 no exporta STL', 'Error al exportar archivos STL desde Profeta Suite. Se resolvió parcialmente con IA.', 'Software', 'Siempre', 'en_espera', 'media', true, now() - interval '1 day');

-- Comentarios
insert into comentarios (ticket_id, autor, texto, created_at) values
  ('TK-047', 'Ing. Carlos Mendoza', 'Revisaré el equipo a las 2pm, por favor tenga acceso a la sala.', now() - interval '2 hours');

-- Mantenimientos
insert into mantenimientos (equipo_id, tipo, descripcion, realizado_por, fecha) values
  ('00000000-0000-0000-0000-000000000101', 'Preventivo', 'Limpieza de espejos y calibración', '00000000-0000-0000-0000-000000000010', '2025-01-10'),
  ('00000000-0000-0000-0000-000000000101', 'Correctivo', 'Reemplazo de motor', '00000000-0000-0000-0000-000000000010', '2024-10-05'),
  ('00000000-0000-0000-0000-000000000102', 'Preventivo', 'Limpieza de tanque y cambio de FEP', '00000000-0000-0000-0000-000000000011', '2025-02-15'),
  ('00000000-0000-0000-0000-000000000104', 'Preventivo', 'Calibración de sensores', '00000000-0000-0000-0000-000000000010', '2025-03-20'),
  ('00000000-0000-0000-0000-000000000104', 'Preventivo', 'Actualización de firmware', '00000000-0000-0000-0000-000000000011', '2024-12-10');