-- Stage 2: vertical-slice hardening helpers.

create unique index if not exists profiles_email_lower_unique
  on public.profiles (lower(email));

create index if not exists club_memberships_invited_idx
  on public.club_memberships (status, invited_at desc)
  where status = 'invited';

comment on policy "reports tenant published read" on public.reports is
  'Club members can read only published reports. Basalt staff can read draft, internal_review, published and archived reports; archived reports are intentionally absent from normal club navigation.';

comment on table public.activity_log is
  'Structured portal audit trail. Do not store auth tokens, passwords or service-role secrets in metadata_json.';
