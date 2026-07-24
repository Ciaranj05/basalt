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
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The service-role key is server-only and must never be exposed to browser code.

## Supabase Setup

Apply the portal foundation migration and fictional seed data:

```bash
supabase db reset
```

The migration creates the multi-tenant schema, RLS policies and private
`club-files` storage bucket. Seed data creates the fictional “North Coast Golf
Club” demo workspace.

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
The visible demo data is fictional and exists to demonstrate the intended
customer experience before live Supabase records are connected.

## Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
