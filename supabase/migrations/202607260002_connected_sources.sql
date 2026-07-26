create extension if not exists pgcrypto;

create table if not exists public.connected_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  source_kind text not null,
  branch_code text,
  source_url text,
  storage_path text,
  configuration jsonb not null default '{}'::jsonb,
  is_enabled boolean not null default true,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.import_batches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_id uuid references public.connected_sources(id) on delete set null,
  filename text,
  content_hash text,
  business_date date,
  branch_code text,
  status text not null default 'pending',
  row_count integer not null default 0,
  warnings jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create unique index if not exists import_batches_user_hash_unique
  on public.import_batches(user_id, content_hash)
  where content_hash is not null;

create table if not exists public.employee_aliases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  branch_code text,
  canonical_name text not null,
  employee_external_id text,
  alias text not null,
  normalized_alias text generated always as (lower(regexp_replace(alias, '[^a-z0-9]+', '', 'g'))) stored,
  created_at timestamptz not null default now(),
  unique(user_id, branch_code, normalized_alias)
);

create table if not exists public.work_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  import_batch_id uuid references public.import_batches(id) on delete cascade,
  source_id uuid references public.connected_sources(id) on delete set null,
  employee_name text not null,
  employee_external_id text,
  employee_initials text,
  branch_code text,
  business_date date not null,
  category text not null,
  raw_units numeric not null default 0,
  credited_units numeric,
  item_number text,
  location text,
  po_number text,
  batch_number text,
  occurred_at timestamptz,
  confidence text not null default 'medium',
  reconciliation_status text not null default 'informational',
  evidence jsonb not null default '{}'::jsonb,
  fingerprint text,
  created_at timestamptz not null default now()
);

create unique index if not exists work_events_source_fingerprint_unique
  on public.work_events(user_id, source_id, fingerprint)
  where fingerprint is not null;

create table if not exists public.productivity_policies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  branch_code text,
  category text not null,
  weight numeric,
  goal numeric,
  is_official boolean not null default false,
  effective_from date not null default current_date,
  effective_to date,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.connected_sources enable row level security;
alter table public.import_batches enable row level security;
alter table public.employee_aliases enable row level security;
alter table public.work_events enable row level security;
alter table public.productivity_policies enable row level security;

create policy "users manage own connected sources" on public.connected_sources
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own import batches" on public.import_batches
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own employee aliases" on public.employee_aliases
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own work events" on public.work_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own productivity policies" on public.productivity_policies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
