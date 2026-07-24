-- Allow Supabase API roles to access portal objects while RLS policies
-- continue to enforce tenant boundaries and role-based permissions.

grant usage on schema public to authenticated, service_role;

grant select, insert, update, delete on table
  public.profiles,
  public.global_roles,
  public.packages,
  public.clubs,
  public.club_memberships,
  public.package_modules,
  public.courses,
  public.course_areas,
  public.surveys,
  public.reports,
  public.report_sections,
  public.map_layers,
  public.findings,
  public.recommendations,
  public.report_media,
  public.activity_log
to authenticated;

grant all privileges on table
  public.profiles,
  public.global_roles,
  public.packages,
  public.clubs,
  public.club_memberships,
  public.package_modules,
  public.courses,
  public.course_areas,
  public.surveys,
  public.reports,
  public.report_sections,
  public.map_layers,
  public.findings,
  public.recommendations,
  public.report_media,
  public.activity_log
to service_role;

grant execute on function public.is_basalt_admin() to authenticated, service_role;
grant execute on function public.is_basalt_super_admin() to authenticated, service_role;
grant execute on function public.has_active_club_membership(uuid) to authenticated, service_role;
grant execute on function public.can_manage_club(uuid) to authenticated, service_role;
grant execute on function public.can_edit_club_records(uuid) to authenticated, service_role;
grant execute on function public.storage_club_id(text) to authenticated, service_role;

drop policy if exists "memberships club admin invite" on public.club_memberships;
drop policy if exists "memberships club admin update" on public.club_memberships;

create policy "memberships basalt admin insert" on public.club_memberships
  for insert with check (public.is_basalt_admin());

create policy "memberships basalt admin update" on public.club_memberships
  for update using (public.is_basalt_admin()) with check (public.is_basalt_admin());

drop policy if exists "report sections tenant visible read" on public.report_sections;
drop policy if exists "map layers tenant read" on public.map_layers;
drop policy if exists "findings tenant published read" on public.findings;
drop policy if exists "recommendations tenant published read" on public.recommendations;
drop policy if exists "report media tenant published read" on public.report_media;

create policy "report sections tenant visible read" on public.report_sections
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and visible_to_client
      and exists (
        select 1 from public.reports r
        where r.id = report_id
          and r.club_id = report_sections.club_id
          and r.status = 'published'
      )
    )
  );

create policy "map layers tenant published read" on public.map_layers
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and (
        report_id is null
        or exists (
          select 1 from public.reports r
          where r.id = report_id
            and r.club_id = map_layers.club_id
            and r.status = 'published'
        )
      )
    )
  );

create policy "findings tenant published read" on public.findings
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and exists (
        select 1 from public.reports r
        where r.id = report_id
          and r.club_id = findings.club_id
          and r.status = 'published'
      )
    )
  );

create policy "recommendations tenant published read" on public.recommendations
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and exists (
        select 1 from public.reports r
        where r.id = report_id
          and r.club_id = recommendations.club_id
          and r.status = 'published'
      )
    )
  );

create policy "report media tenant published read" on public.report_media
  for select using (
    public.is_basalt_admin()
    or (
      public.has_active_club_membership(club_id)
      and exists (
        select 1 from public.reports r
        where r.id = report_id
          and r.club_id = report_media.club_id
          and r.status = 'published'
      )
    )
  );
