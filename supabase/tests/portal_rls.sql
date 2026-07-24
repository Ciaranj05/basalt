-- Supabase RLS test plan for Stage 1.
-- Run with Supabase CLI once a local project is linked:
-- supabase db reset && supabase test db
--
-- These scenarios mirror the required cross-tenant workflows:
-- 1. Unauthenticated access to tenant tables returns no rows.
-- 2. A club user with active membership can select only their club.
-- 3. A club user cannot access another club by changing slug.
-- 4. committee_viewer cannot insert/update reports or recommendations.
-- 5. club_admin can invite users only where club_id matches their club.
-- 6. basalt_analyst can create draft reports across authorised customer records.
-- 7. club users cannot select draft/internal_review reports.
-- 8. club users can select published reports for their active club.
-- 9. duplicate club slugs are rejected by unique constraint.
-- 10. storage objects under club-files/{club_id}/... are not readable cross-tenant.

select 'portal_rls_test_plan_loaded' as test_plan;
