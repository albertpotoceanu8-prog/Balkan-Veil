create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  project_type text,
  budget text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

drop policy if exists "anon_insert_inquiries" on public.inquiries;
create policy "anon_insert_inquiries"
on public.inquiries for insert to anon, authenticated with check (true);

drop policy if exists "authenticated_read_inquiries" on public.inquiries;
create policy "authenticated_read_inquiries"
on public.inquiries for select to authenticated using (true);

create table if not exists public.cms_clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  company text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.cms_clients(id) on delete set null,
  inquiry_id uuid references public.inquiries(id) on delete set null,
  title text not null,
  status text not null default 'open',
  priority text not null default 'normal',
  last_message_at timestamptz,
  client_access_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.cms_conversations(id) on delete cascade,
  sender_role text not null check (sender_role in ('admin', 'client', 'system')),
  sender_name text,
  sender_email text,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.cms_conversations
add column if not exists client_access_token text;

update public.cms_conversations
set client_access_token = encode(gen_random_bytes(24), 'hex')
where client_access_token is null;

alter table public.cms_conversations
alter column client_access_token set default encode(gen_random_bytes(24), 'hex');

alter table public.cms_conversations
alter column client_access_token set not null;

create unique index if not exists cms_conversations_client_access_token_key on public.cms_conversations(client_access_token);
create index if not exists cms_conversations_client_id_idx on public.cms_conversations(client_id);
create index if not exists cms_conversations_last_message_at_idx on public.cms_conversations(last_message_at desc nulls last);
create index if not exists cms_messages_conversation_id_created_at_idx on public.cms_messages(conversation_id, created_at);

drop trigger if exists set_cms_clients_updated_at on public.cms_clients;
create trigger set_cms_clients_updated_at
before update on public.cms_clients
for each row execute function public.set_updated_at();

drop trigger if exists set_cms_conversations_updated_at on public.cms_conversations;
create trigger set_cms_conversations_updated_at
before update on public.cms_conversations
for each row execute function public.set_updated_at();

create or replace function public.touch_conversation_last_message()
returns trigger
language plpgsql
as $$
begin
  update public.cms_conversations
  set last_message_at = new.created_at,
      updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists touch_cms_conversation_last_message on public.cms_messages;
create trigger touch_cms_conversation_last_message
after insert on public.cms_messages
for each row execute function public.touch_conversation_last_message();

alter table public.cms_clients enable row level security;
alter table public.cms_conversations enable row level security;
alter table public.cms_messages enable row level security;

drop policy if exists "authenticated_all_cms_clients" on public.cms_clients;
create policy "authenticated_all_cms_clients"
on public.cms_clients for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_cms_conversations" on public.cms_conversations;
create policy "authenticated_all_cms_conversations"
on public.cms_conversations for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_cms_messages" on public.cms_messages;
create policy "authenticated_all_cms_messages"
on public.cms_messages for all to authenticated using (true) with check (true);
