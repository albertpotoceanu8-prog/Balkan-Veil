create table if not exists public.admin_push_subscriptions (
  endpoint text primary key,
  user_id uuid,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_admin_push_subscriptions_updated_at on public.admin_push_subscriptions;
create trigger set_admin_push_subscriptions_updated_at
before update on public.admin_push_subscriptions
for each row execute function public.set_updated_at();

alter table public.admin_push_subscriptions enable row level security;

drop policy if exists "authenticated_all_admin_push_subscriptions" on public.admin_push_subscriptions;
create policy "authenticated_all_admin_push_subscriptions"
on public.admin_push_subscriptions for all to authenticated using (true) with check (true);
