alter table public.cms_clients
add column if not exists user_id uuid;

create index if not exists cms_clients_user_id_idx on public.cms_clients(user_id);
create index if not exists cms_clients_email_idx on public.cms_clients(lower(email));
