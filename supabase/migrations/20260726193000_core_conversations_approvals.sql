create extension if not exists pgcrypto;

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  division text not null check (division in ('business','home','work','hobby','fact')),
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant','tool','system')),
  content text not null,
  evidence jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scope text not null check (scope in ('private','household','work','business','hobby')),
  content text not null,
  source_message_id uuid references public.conversation_messages(id) on delete set null,
  approved_by_user boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  action_kind text not null,
  summary text not null,
  reason text not null,
  risk text not null,
  expected_outcome text not null,
  alternative text,
  payload jsonb not null,
  payload_fingerprint text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','expired','cancelled')),
  expires_at timestamptz not null,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.conversations enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.memories enable row level security;
alter table public.approval_requests enable row level security;

create policy "users manage own conversations" on public.conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own messages" on public.conversation_messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own memories" on public.memories for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own approvals" on public.approval_requests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists conversations_user_updated_idx on public.conversations(user_id, updated_at desc);
create index if not exists messages_conversation_created_idx on public.conversation_messages(conversation_id, created_at);
create index if not exists memories_user_scope_idx on public.memories(user_id, scope, created_at desc);
create index if not exists approvals_user_status_idx on public.approval_requests(user_id, status, created_at desc);
