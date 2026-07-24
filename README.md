# Basalt Website

Premium marketing website and customer portal foundation for Basalt Golf Course Intelligence.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Portal Environment

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
# Backward-compatible fallback if publishable key is not present:
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
# Backward-compatible fallback if secret key is not present:
SUPABASE_SERVICE_ROLE_KEY=...
```

The browser and SSR clients use `NEXT_PUBLIC_SUPABASE_URL` plus
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, falling back to
`NEXT_PUBLIC_SUPABASE_ANON_KEY` for older environments. The server-only admin
client uses `SUPABASE_SECRET_KEY`, falling back to `SUPABASE_SERVICE_ROLE_KEY`.
Neither server-only key is imported by Client Components.

`NEXT_PUBLIC_APP_URL` is used for Supabase auth redirects and falls back to
`NEXT_PUBLIC_SITE_URL`.

## Supabase Setup

Apply the portal foundation migration and fictional seed data:

```bash
supabase db reset
```

The migration creates the multi-tenant schema, RLS policies and private
`club-files` storage bucket. Seed data creates the fictional “North Coast Golf
Club” vertical-slice workspace, a draft report for staff-only visibility checks,
and a second fictional club for tenant isolation checks.

Create local auth users through the Supabase Admin API:

```bash
npm run supabase:setup-dev-users
```

The script creates Basalt admin/analyst users, North Coast club users with
different membership roles, and one user for the second club. It upserts
`profiles`, `global_roles` and `club_memberships`; it does not write directly to
Supabase `auth.*` tables.

Report visibility is intentionally conservative:

- `draft` and `internal_review`: Basalt staff only.
- `published`: authorised club members and Basalt staff.
- `archived`: hidden from normal club navigation; retained for Basalt staff
  access and audit/history workflows.

## Portal Routes

- `/login`
- `/reset-password`
- `/accept-invite`
- `/clubs`
- `/clubs/[clubSlug]`
- `/clubs/[clubSlug]/reports`
- `/clubs/[clubSlug]/reports/[reportId]`
- `/clubs/[clubSlug]/course-areas`
- `/clubs/[clubSlug]/course-areas/[areaId]`
- `/admin`
- `/admin/clubs/new`
- `/admin/reports`

Protected routes redirect unauthenticated users to `/login` through middleware.
Protected pages query Supabase using the authenticated session and tenant-scoped
RLS policies. The old demo data remains in `src/lib/portal/demo-data.ts` for
development reference and pure tests only.

## Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
