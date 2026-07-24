-- Basalt customer portal foundation.
-- Stage 1: multi-tenant schema, role checks, RLS and protected storage.

create extension if not exists "pgcrypto";

create type public.club_status as enum ('onboarding', 'active', 'paused', 'archived');
create type public.membership_role as enum ('club_admin', 'club_user', 'committee_viewer');
create type public.membership_status as enum ('invited', 'active', 'suspended', 'removed');
create type public.basalt_role as enum ('basalt_super_admin', 'basalt_analyst');
create type public.report_status as enum ('draft', 'internal_review', 'published', 'archived');
create type public.finding_severity as enum ('information', 'low', 'moderate', 'high', 'critical');
create type public.recommendation_status as enum ('proposed', 'accepted', 'planned', 'in_progress', 'completed', 'deferred');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  job_title text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.global_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.basalt_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  cover_image_url text,
  address text,
  website text,
  primary_contact_name text,
  primary_contact_email text,
  status public.club_status not null default 'onboarding',
  package_id uuid references public.packages(id),
  onboarding_status text not null default 'not_started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint clubs_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.club_memberships (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.membership_role not null,
  status public.membership_status not null default 'invited',
  invited_at timestamptz not null default now(),
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  unique (club_id, user_id)
);

create table public.package_modules (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  module_type text not null,
  enabled boolean not null default true,
  display_order integer not null default 0,
  unique (package_id, module_type)
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  name text not null,
  hole_count integer not null check (hole_count > 0),
  boundary_geojson jsonb,
  centre_latitude numeric,
  centre_longitude numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.course_areas (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  parent_area_id uuid references public.course_areas(id) on delete set null,
  area_type text not null,
  name text not null,
  reference_number text,
  hole_number integer,
  geometry_geojson jsonb,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.surveys (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  survey_name text not null,
  survey_date date not null,
  survey_type text not null,
  status text not null,
  sensor_summary text,
  accuracy_summary text,
  analyst_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  survey_id uuid references public.surveys(id) on delete set null,
  title text not null,
  slug text not null,
  report_type text not null,
  status public.report_status not null default 'draft',
  summary text,
  survey_date date,
  published_at timestamptz,
  version integer not null default 1,
  pdf_file_path text,
  cover_image_path text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (club_id, slug)
);

create table public.report_sections (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  report_id uuid not null references public.reports(id) on delete cascade,
  module_type text not null,
  title text not null,
  summary text,
  content_json jsonb not null default '{}'::jsonb,
  display_order integer not null default 0,
  visible_to_client boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.map_layers (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  survey_id uuid references public.surveys(id) on delete set null,
  report_id uuid references public.reports(id) on delete set null,
  name text not null,
  layer_type text not null,
  description text,
  source_file_path text,
  tile_url text,
  legend_json jsonb,
  bounds_json jsonb,
  opacity numeric not null default 1 check (opacity >= 0 and opacity <= 1),
  visible_by_default boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.findings (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  report_id uuid not null references public.reports(id) on delete cascade,
  course_area_id uuid references public.course_areas(id) on delete set null,
  finding_type text not null,
  title text not null,
  description text,
  severity public.finding_severity not null default 'information',
  confidence text,
  analyst_commentary text,
  map_layer_id uuid references public.map_layers(id) on delete set null,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  report_id uuid not null references public.reports(id) on delete cascade,
  finding_id uuid references public.findings(id) on delete set null,
  course_area_id uuid references public.course_areas(id) on delete set null,
  title text not null,
  description text,
  priority text not null,
  recommended_timeframe text,
  status public.recommendation_status not null default 'proposed',
  estimated_cost_band text,
  owner_name text,
  target_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.report_media (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  report_id uuid not null references public.reports(id) on delete cascade,
  course_area_id uuid references public.course_areas(id) on delete set null,
  file_path text not null,
  media_type text not null,
  caption text,
  captured_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references public.clubs(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index on public.club_memberships (user_id, status);
create index on public.club_memberships (club_id, status);
create index on public.courses (club_id);
create index on public.course_areas (club_id, course_id, area_type);
create index on public.surveys (club_id, course_id, survey_date desc);
create index on public.reports (club_id, status, published_at desc);
create index on public.report_sections (club_id, report_id, display_order);
create index on public.findings (club_id, report_id, severity);
create index on public.recommendations (club_id, report_id, status);
create index on public.map_layers (club_id, course_id, report_id);
create index on public.activity_log (club_id, created_at desc);

create or replace function public.is_basalt_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.global_roles gr
    where gr.user_id = auth.uid()
      and gr.role in ('basalt_super_admin', 'basalt_analyst')
  );
$$;

create or replace function public.is_basalt_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.global_roles gr
    where gr.user_id = auth.uid()
      and gr.role = 'basalt_super_admin'
  );
$$;

create or replace function public.has_active_club_membership(target_club_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.club_memberships cm
    where cm.club_id = target_club_id
      and cm.user_id = auth.uid()
      and cm.status = 'active'
  );
$$;

create or replace function public.can_manage_club(target_club_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_basalt_admin()
    or exists (
      select 1
      from public.club_memberships cm
      where cm.club_id = target_club_id
        and cm.user_id = auth.uid()
        and cm.role = 'club_admin'
        and cm.status = 'active'
    );
$$;

create or replace function public.can_edit_club_records(target_club_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_basalt_admin()
    or exists (
      select 1
      from public.club_memberships cm
      where cm.club_id = target_club_id
        and cm.user_id = auth.uid()
        and cm.role in ('club_admin', 'club_user')
        and cm.status = 'active'
    );
$$;

create or replace function public.storage_club_id(object_name text)
returns uuid
language plpgsql
stable
security definer
set search_path = public, storage
as $$
begin
  return (storage.foldername(object_name))[1]::uuid;
exception when others then
  return null;
end;
$$;

alter table public.profiles enable row level security;
alter table public.global_roles enable row level security;
alter table public.packages enable row level security;
alter table public.clubs enable row level security;
alter table public.club_memberships enable row level security;
alter table public.package_modules enable row level security;
alter table public.courses enable row level security;
alter table public.course_areas enable row level security;
alter table public.surveys enable row level security;
alter table public.reports enable row level security;
alter table public.report_sections enable row level security;
alter table public.map_layers enable row level security;
alter table public.findings enable row level security;
alter table public.recommendations enable row level security;
alter table public.report_media enable row level security;
alter table public.activity_log enable row level security;

create policy "profiles self or basalt admin read" on public.profiles
  for select using (id = auth.uid() or public.is_basalt_admin());

create policy "profiles self update" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "global roles basalt admin read" on public.global_roles
  for select using (public.is_basalt_admin());

create policy "global roles super admin write" on public.global_roles
  for all using (public.is_basalt_super_admin()) with check (public.is_basalt_super_admin());

create policy "packages authenticated read" on public.packages
  for select using (auth.uid() is not null);

create policy "packages basalt admin write" on public.packages
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "package modules authenticated read" on public.package_modules
  for select using (auth.uid() is not null);

create policy "package modules basalt admin write" on public.package_modules
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "clubs member read" on public.clubs
  for select using (public.is_basalt_admin() or public.has_active_club_membership(id));

create policy "clubs basalt admin write" on public.clubs
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "memberships own club read" on public.club_memberships
  for select using (public.is_basalt_admin() or public.has_active_club_membership(club_id));

create policy "memberships club admin invite" on public.club_memberships
  for insert with check (public.can_manage_club(club_id));

create policy "memberships club admin update" on public.club_memberships
  for update using (public.can_manage_club(club_id)) with check (public.can_manage_club(club_id));

create policy "courses tenant read" on public.courses
  for select using (public.is_basalt_admin() or public.has_active_club_membership(club_id));

create policy "courses editor write" on public.courses
  for all using (public.can_edit_club_records(club_id)) with check (public.can_edit_club_records(club_id));

create policy "course areas tenant read" on public.course_areas
  for select using (public.is_basalt_admin() or public.has_active_club_membership(club_id));

create policy "course areas editor write" on public.course_areas
  for all using (public.can_edit_club_records(club_id)) with check (public.can_edit_club_records(club_id));

create policy "surveys tenant read" on public.surveys
  for select using (public.is_basalt_admin() or public.has_active_club_membership(club_id));

create policy "surveys basalt admin write" on public.surveys
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "reports tenant published read" on public.reports
  for select using (
    public.is_basalt_admin()
    or (public.has_active_club_membership(club_id) and status = 'published')
  );

create policy "reports basalt admin write" on public.reports
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "report sections tenant visible read" on public.report_sections
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and visible_to_client
      and exists (
        select 1 from public.reports r
        where r.id = report_id and r.status = 'published'
      )
    )
  );

create policy "report sections basalt admin write" on public.report_sections
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "map layers tenant read" on public.map_layers
  for select using (public.is_basalt_admin() or public.has_active_club_membership(club_id));

create policy "map layers basalt admin write" on public.map_layers
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "findings tenant published read" on public.findings
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and exists (
        select 1 from public.reports r
        where r.id = report_id and r.status = 'published'
      )
    )
  );

create policy "findings basalt admin write" on public.findings
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "recommendations tenant published read" on public.recommendations
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and exists (
        select 1 from public.reports r
        where r.id = report_id and r.status = 'published'
      )
    )
  );

create policy "recommendations editor update" on public.recommendations
  for update using (public.can_edit_club_records(club_id)) with check (public.can_edit_club_records(club_id));

create policy "recommendations basalt admin write" on public.recommendations
  for insert with check (public.is_basalt_admin());

create policy "report media tenant published read" on public.report_media
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and exists (
        select 1 from public.reports r
        where r.id = report_id and r.status = 'published'
      )
    )
  );

create policy "report media basalt admin write" on public.report_media
  for all using (public.is_basalt_admin()) with check (public.is_basalt_admin());

create policy "activity log admin read" on public.activity_log
  for select using (public.is_basalt_admin() or public.can_manage_club(club_id));

create policy "activity log admin insert" on public.activity_log
  for insert with check (public.is_basalt_admin() or public.can_manage_club(club_id));

insert into storage.buckets (id, name, public)
values ('club-files', 'club-files', false)
on conflict (id) do nothing;

create policy "club files tenant read" on storage.objects
  for select using (
    bucket_id = 'club-files'
    and (
      public.is_basalt_admin()
      or public.has_active_club_membership(public.storage_club_id(name))
    )
  );

create policy "club files admin write" on storage.objects
  for insert with check (
    bucket_id = 'club-files'
    and public.is_basalt_admin()
  );
