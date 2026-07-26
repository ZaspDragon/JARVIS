-- JARVIS core schema
create extension if not exists pgcrypto;

create type public.jarvis_action_risk as enum ('read', 'prepare', 'approve', 'blocked');
create type public.jarvis_action_status as enum ('pending', 'approved', 'rejected', 'running', 'completed', 'failed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone text not null default 'America/New_York',
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  enabled boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  module_slug text,
  summary text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  content text not null,
  source text,
  confidence numeric(4,3) check (confidence between 0 and 1),
  approved_by_user boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  module_slug text,
  due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  action_name text not null,
  risk public.jarvis_action_risk not null,
  status public.jarvis_action_status not null default 'pending',
  target text,
  input_summary text,
  payload jsonb not null default '{}'::jsonb,
  approved_at timestamptz,
  executed_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  module_slug text,
  action_name text not null,
  risk public.jarvis_action_risk not null,
  status public.jarvis_action_status not null,
  target text,
  input_summary text,
  result_summary text,
  error_code text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  module_slug text,
  priority smallint not null default 0,
  read_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index conversations_user_updated_idx on public.conversations(user_id, updated_at desc);
create index memories_user_category_idx on public.memories(user_id, category);
create index tasks_user_due_idx on public.tasks(user_id, due_at);
create index approvals_user_status_idx on public.approval_requests(user_id, status, created_at desc);
create index audit_user_created_idx on public.audit_events(user_id, created_at desc);
create index notifications_user_created_idx on public.notifications(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.memories enable row level security;
alter table public.tasks enable row level security;
alter table public.approval_requests enable row level security;
alter table public.audit_events enable row level security;
alter table public.notifications enable row level security;

create policy "profiles_own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "conversations_own" on public.conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "memories_own" on public.memories for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks_own" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "approvals_own" on public.approval_requests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "audit_read_own" on public.audit_events for select using (auth.uid() = user_id);
create policy "notifications_own" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into public.modules (slug, name, description, enabled) values
('core', 'JARVIS Core', 'Chat, memory, tasks, approvals, notifications, and audit history', true),
('warehouse', 'Warehouse', 'Operations, reports, production, inventory, receiving, and exceptions', false),
('github', 'GitHub Operator', 'Repository health, issue intake, proposed fixes, CI, and releases', false),
('briefing', 'Daily Briefing', 'Personalized research and priority briefings', false),
('trading', 'Trading Analyst', 'Market context and trading journal without autonomous execution', false),
('finance', 'Finance', 'Personal finance analysis with explicit permissions', false),
('real_estate', 'Real Estate', 'Property pipeline and deal analysis', false),
('communications', 'Communications', 'Calendar, email, tasks, and drafts', false)
on conflict (slug) do nothing;
