create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton_key text not null unique default 'main',
  studio_status text not null default 'Accepting selected builds',
  tagline text not null default 'In Shadows, Power Remains.',
  hero_eyebrow text not null default 'BALKAN VEIL / PREMIUM DIGITAL STUDIO',
  hero_headline text not null default 'Premium digital presence for brands that operate in silence.',
  hero_description text not null default 'Premium websites, private digital systems and digital presence management.',
  primary_cta_label text not null default 'Request Access',
  primary_cta_href text not null default '/access',
  secondary_cta_label text not null default 'View Protocol',
  secondary_cta_href text not null default '/protocol',
  starting_price text not null default 'from 1.500 EUR',
  standard_website_value text not null default '3.500 EUR',
  partner_launch_setup text not null default '800 EUR',
  contact_email text,
  instagram_url text,
  tiktok_url text,
  seo_title text not null default 'Balkan Veil - Premium Digital Studio',
  seo_description text not null default 'Premium websites, private digital systems and digital presence management.',
  seo_keywords text[] not null default array['premium websites', 'digital systems', 'digital presence'],
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

insert into public.site_settings (singleton_key)
values ('main')
on conflict (singleton_key) do nothing;

create table if not exists public.service_protocols (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text,
  codename text,
  category text not null default 'website',
  short_description text,
  primary_outcome text,
  starting_price text,
  features text[] not null default array[]::text[],
  active boolean not null default true,
  featured boolean not null default false,
  display_order int not null default 1,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.retainer_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  codename text,
  monthly_price text not null,
  short_description text,
  best_for text,
  features text[] not null default array[]::text[],
  active boolean not null default true,
  recommended boolean not null default false,
  display_order int not null default 1,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.protocol_steps (
  id uuid primary key default gen_random_uuid(),
  step_number int not null,
  title text not null,
  codename text,
  short_description text,
  output text,
  active boolean not null default true,
  display_order int not null default 1,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.service_protocols
add column if not exists slug text;

create table if not exists public.access_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  project_type text,
  budget_range text,
  message text,
  status text not null default 'new'
    check (status in ('new', 'reviewed', 'qualified', 'rejected', 'converted')),
  priority int not null default 1,
  internal_notes text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.prospects (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  industry text,
  location text,
  website text,
  instagram text,
  observed_problem text,
  opportunity text,
  suggested_offer text,
  estimated_value numeric,
  status text not null default 'found'
    check (status in ('found', 'contacted', 'replied', 'call_booked', 'proposal_sent', 'won', 'lost')),
  priority int not null default 1,
  notes text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  actor text,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_service_protocols_updated_at on public.service_protocols;
create trigger set_service_protocols_updated_at
before update on public.service_protocols
for each row execute function public.set_updated_at();

drop trigger if exists set_retainer_packages_updated_at on public.retainer_packages;
create trigger set_retainer_packages_updated_at
before update on public.retainer_packages
for each row execute function public.set_updated_at();

drop trigger if exists set_protocol_steps_updated_at on public.protocol_steps;
create trigger set_protocol_steps_updated_at
before update on public.protocol_steps
for each row execute function public.set_updated_at();

drop trigger if exists set_access_requests_updated_at on public.access_requests;
create trigger set_access_requests_updated_at
before update on public.access_requests
for each row execute function public.set_updated_at();

drop trigger if exists set_prospects_updated_at on public.prospects;
create trigger set_prospects_updated_at
before update on public.prospects
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.service_protocols enable row level security;
alter table public.retainer_packages enable row level security;
alter table public.protocol_steps enable row level security;
alter table public.access_requests enable row level security;
alter table public.prospects enable row level security;
alter table public.activity_log enable row level security;

drop policy if exists "anon_read_site_settings" on public.site_settings;
create policy "anon_read_site_settings"
on public.site_settings for select to anon using (true);

drop policy if exists "anon_read_active_service_protocols" on public.service_protocols;
create policy "anon_read_active_service_protocols"
on public.service_protocols for select to anon using (active = true);

drop policy if exists "anon_read_active_retainer_packages" on public.retainer_packages;
create policy "anon_read_active_retainer_packages"
on public.retainer_packages for select to anon using (active = true);

drop policy if exists "anon_read_active_protocol_steps" on public.protocol_steps;
create policy "anon_read_active_protocol_steps"
on public.protocol_steps for select to anon using (active = true);

drop policy if exists "anon_insert_access_requests" on public.access_requests;
create policy "anon_insert_access_requests"
on public.access_requests for insert to anon with check (true);

drop policy if exists "authenticated_read_site_settings" on public.site_settings;
create policy "authenticated_read_site_settings"
on public.site_settings for select to authenticated using (true);

drop policy if exists "authenticated_update_site_settings" on public.site_settings;
create policy "authenticated_update_site_settings"
on public.site_settings for update to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_service_protocols" on public.service_protocols;
create policy "authenticated_all_service_protocols"
on public.service_protocols for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_retainer_packages" on public.retainer_packages;
create policy "authenticated_all_retainer_packages"
on public.retainer_packages for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_protocol_steps" on public.protocol_steps;
create policy "authenticated_all_protocol_steps"
on public.protocol_steps for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_access_requests" on public.access_requests;
create policy "authenticated_all_access_requests"
on public.access_requests for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_prospects" on public.prospects;
create policy "authenticated_all_prospects"
on public.prospects for all to authenticated using (true) with check (true);

drop policy if exists "authenticated_all_activity_log" on public.activity_log;
create policy "authenticated_all_activity_log"
on public.activity_log for all to authenticated using (true) with check (true);
