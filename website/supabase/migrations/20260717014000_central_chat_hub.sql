create extension if not exists pgcrypto;

alter table public.cms_clients
add column if not exists hub_key text,
add column if not exists external_project_ref text,
add column if not exists external_cms_url text,
add column if not exists allowed_origins text[] not null default array[]::text[],
add column if not exists integration_secret_hash text,
add column if not exists chat_enabled boolean not null default true,
add column if not exists last_chat_access_at timestamptz;

update public.cms_clients
set hub_key = encode(extensions.gen_random_bytes(18), 'hex')
where hub_key is null;

alter table public.cms_clients
alter column hub_key set not null;

create unique index if not exists cms_clients_hub_key_key on public.cms_clients(hub_key);
create index if not exists cms_clients_chat_enabled_idx on public.cms_clients(chat_enabled);
create index if not exists cms_clients_external_project_ref_idx on public.cms_clients(external_project_ref);

create table if not exists public.chat_hub_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.cms_clients(id) on delete set null,
  hub_key text,
  action text not null,
  origin text,
  user_agent text,
  success boolean not null default false,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists chat_hub_requests_client_id_created_at_idx
on public.chat_hub_requests(client_id, created_at desc);

create index if not exists chat_hub_requests_hub_key_created_at_idx
on public.chat_hub_requests(hub_key, created_at desc);

alter table public.chat_hub_requests enable row level security;

drop policy if exists "authenticated_read_chat_hub_requests" on public.chat_hub_requests;
create policy "authenticated_read_chat_hub_requests"
on public.chat_hub_requests for select to authenticated using (true);

create or replace function public.set_client_chat_hub_secret(target_client_id uuid, plain_secret text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if plain_secret is null or length(plain_secret) < 24 then
    raise exception 'Secret must be at least 24 characters';
  end if;

  update public.cms_clients
  set integration_secret_hash = extensions.crypt(plain_secret, extensions.gen_salt('bf')),
      updated_at = now()
  where id = target_client_id;
end;
$$;

revoke all on function public.set_client_chat_hub_secret(uuid, text) from public;
grant execute on function public.set_client_chat_hub_secret(uuid, text) to authenticated;

create or replace function public.check_chat_hub_secret(target_client_id uuid, plain_secret text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cms_clients
    where id = target_client_id
      and integration_secret_hash is not null
      and integration_secret_hash = extensions.crypt(plain_secret, integration_secret_hash)
  );
$$;

revoke all on function public.check_chat_hub_secret(uuid, text) from public;
grant execute on function public.check_chat_hub_secret(uuid, text) to anon, authenticated;
