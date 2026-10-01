-- ============================================================================
-- Portfolio du Dr Maliki Djandjieme — schéma Supabase
-- À exécuter une seule fois dans Supabase › SQL Editor (puis seed.sql).
-- Le script est ré-exécutable sans risque (IF NOT EXISTS / OR REPLACE).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Administrateurs : seules ces adresses e-mail peuvent modifier le site.
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  email text primary key check (email = lower(email))
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins: lecture de sa propre ligne" on public.admins;
create policy "admins: lecture de sa propre ligne" on public.admins
  for select to authenticated
  using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

-- ---------------------------------------------------------------------------
-- Contenu du site : un document JSON par langue (fr, en, ja).
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  locale text primary key check (locale in ('fr', 'en', 'ja')),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

drop policy if exists "contenu: lecture publique" on public.site_content;
create policy "contenu: lecture publique" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "contenu: écriture admin" on public.site_content;
create policy "contenu: écriture admin" on public.site_content
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Paramètres communs à toutes les langues (contacts, réseaux, médias…).
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

drop policy if exists "paramètres: lecture publique" on public.site_settings;
create policy "paramètres: lecture publique" on public.site_settings
  for select to anon, authenticated using (true);

drop policy if exists "paramètres: écriture admin" on public.site_settings;
create policy "paramètres: écriture admin" on public.site_settings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Messages du formulaire de contact.
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  subject text check (char_length(subject) <= 200),
  message text not null check (char_length(message) between 1 and 5000),
  locale text check (locale in ('fr', 'en', 'ja')),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists messages_created_at_idx on public.messages (created_at desc);
alter table public.messages enable row level security;

drop policy if exists "messages: envoi public" on public.messages;
create policy "messages: envoi public" on public.messages
  for insert to anon, authenticated
  with check (is_read = false);

drop policy if exists "messages: gestion admin" on public.messages;
create policy "messages: gestion admin" on public.messages
  for select to authenticated using ((select public.is_admin()));

drop policy if exists "messages: mise à jour admin" on public.messages;
create policy "messages: mise à jour admin" on public.messages
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "messages: suppression admin" on public.messages;
create policy "messages: suppression admin" on public.messages
  for delete to authenticated using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Statistiques de visites (une ligne par page vue, sans donnée personnelle).
-- ---------------------------------------------------------------------------
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null check (char_length(path) <= 300),
  locale text check (locale in ('fr', 'en', 'ja')),
  referrer text check (char_length(referrer) <= 300),
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
alter table public.page_views enable row level security;

drop policy if exists "visites: enregistrement public" on public.page_views;
create policy "visites: enregistrement public" on public.page_views
  for insert to anon, authenticated with check (true);

drop policy if exists "visites: lecture admin" on public.page_views;
create policy "visites: lecture admin" on public.page_views
  for select to authenticated using ((select public.is_admin()));

-- Visites par jour sur les N derniers jours (pour le tableau de bord).
create or replace function public.daily_page_views(days integer default 30)
returns table (day date, views bigint)
language sql
stable
security invoker
set search_path = ''
as $$
  select d::date as day, count(v.id) as views
  from generate_series(current_date - (days - 1), current_date, interval '1 day') as d
  left join public.page_views v on v.created_at::date = d::date
  group by d
  order by d;
$$;
grant execute on function public.daily_page_views(integer) to authenticated;

-- ---------------------------------------------------------------------------
-- Stockage des fichiers (photos, images de projets, CV) : bucket public « media ».
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media: envoi admin" on storage.objects;
create policy "media: envoi admin" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media: modification admin" on storage.objects;
create policy "media: modification admin" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media: suppression admin" on storage.objects;
create policy "media: suppression admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media: liste admin" on storage.objects;
create policy "media: liste admin" on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
