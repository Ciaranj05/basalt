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
