-- Clientes
create table clientes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  clinica text not null,
  email text unique not null,
  telefono text,
  created_at timestamptz default now()
);

-- Equipos dentales
create table equipos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id),
  marca text check (marca in ('3Shape', 'SprintRay', 'VHF', 'Profeta')),
  modelo text not null,
  numero_serie text unique,
  fecha_instalacion date,
  estado text default 'activo' check (estado in ('activo', 'en_servicio', 'dado_de_baja'))
);

-- Tickets
create table tickets (
  id uuid primary key default gen_random_uuid(),
  equipo_id uuid references equipos(id),
  cliente_id uuid references clientes(id),
  ingeniero_id uuid references auth.users(id),
  titulo text not null,
  descripcion text not null,
  estado text default 'abierto' check (estado in ('abierto', 'asignado', 'en_espera', 'finalizado')),
  prioridad text default 'media' check (prioridad in ('baja', 'media', 'alta', 'critica')),
  resuelto_por_ia boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Historial del chat IA por ticket
create table chat_ia_historial (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references tickets(id),
  rol text check (rol in ('user', 'assistant')),
  contenido text not null,
  created_at timestamptz default now()
);

-- Mantenimientos
create table mantenimientos (
  id uuid primary key default gen_random_uuid(),
  equipo_id uuid references equipos(id),
  tipo text check (tipo in ('preventivo', 'correctivo')),
  descripcion text,
  realizado_por uuid references auth.users(id),
  fecha date not null
);