-- Fictional development seed data. Not a completed client report.

insert into public.packages (id, name, description, active)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'Basalt Complete',
  'Course baseline, turf health, drainage, terrain, tree canopy, recommendations and annual monitoring.',
  true
)
on conflict (id) do nothing;

insert into public.package_modules (package_id, module_type, enabled, display_order)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'executive_summary', true, 1),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'course_baseline', true, 2),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'turf_health', true, 3),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'drainage', true, 4),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'terrain', true, 5),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'tree_canopy', true, 6),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'asset_inventory', true, 7),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'recommendations', true, 8),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'historical_comparison', true, 9),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'annual_monitoring', true, 10)
on conflict (package_id, module_type) do nothing;

insert into public.clubs (
  id,
  name,
  slug,
  package_id,
  status,
  onboarding_status,
  primary_contact_name,
  primary_contact_email
)
values (
  '11111111-1111-4111-8111-111111111111',
  'North Coast Golf Club',
  'north-coast-golf-club',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'active',
  'demo',
  'James Kerr',
  'james.kerr@northcoast.example'
)
on conflict (id) do nothing;

insert into public.courses (id, club_id, name, hole_count, centre_latitude, centre_longitude)
values (
  '22222222-2222-4222-8222-222222222222',
  '11111111-1111-4111-8111-111111111111',
  'Championship Links',
  18,
  55.204,
  -6.652
)
on conflict (id) do nothing;

insert into public.course_areas (
  id,
  club_id,
  course_id,
  area_type,
  name,
  reference_number,
  hole_number,
  description,
  display_order
)
values
  ('77777777-7777-4777-8777-777777777701', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'green', 'Green 7', 'G7', 7, 'Subtle rear-to-front slope with drainage observations on the right approach.', 1),
  ('77777777-7777-4777-8777-777777777702', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'fairway', 'Fairway 4', 'F4', 4, 'Low fairway corridor where surface water is likely to collect after heavy rainfall.', 2),
  ('77777777-7777-4777-8777-777777777703', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'tee', 'Tee Complex 12', 'T12', 12, 'Candidate area for tee levelling and improved access routing.', 3),
  ('77777777-7777-4777-8777-777777777704', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'bunker', 'Bunker 14', 'B14', 14, 'Measured bunker profile for renovation scope and material planning.', 4),
  ('77777777-7777-4777-8777-777777777705', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', 'tree_zone', 'Tree Zone 3', 'TZ3', 3, 'Canopy growth is affecting morning light and airflow near the approach.', 5)
on conflict (id) do nothing;

insert into public.surveys (
  id,
  club_id,
  course_id,
  survey_name,
  survey_date,
  survey_type,
  status,
  sensor_summary,
  accuracy_summary
)
values
  ('33333333-3333-4333-8333-333333333333', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '2026 Baseline Course Survey', '2026-05-14', 'baseline', 'processed', 'RGB, RTK, multispectral and LiDAR where appropriate.', 'Survey-grade positioning used where required.'),
  ('33333333-3333-4333-8333-333333333334', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '2025 Monitoring Survey', '2025-05-18', 'annual_monitoring', 'processed', 'RGB and RTK survey control.', 'Comparison survey for development use.')
on conflict (id) do nothing;

insert into public.reports (
  id,
  club_id,
  course_id,
  survey_id,
  title,
  slug,
  report_type,
  status,
  summary,
  survey_date,
  published_at,
  version,
  pdf_file_path,
  cover_image_path
)
values (
  '44444444-4444-4444-8444-444444444444',
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
  '33333333-3333-4333-8333-333333333333',
  '2026 Course Baseline & Monitoring Report',
  '2026-course-baseline',
  'baseline',
  'published',
  'The course has a strong long-term digital baseline. Immediate attention is recommended for three drainage-priority areas and two bunker redevelopment scopes.',
  '2026-05-14',
  '2026-06-02',
  1,
  '11111111-1111-4111-8111-111111111111/reports/2026-course-baseline.pdf',
  '11111111-1111-4111-8111-111111111111/reports/cover.jpg'
)
on conflict (club_id, slug) do nothing;

insert into public.report_sections (club_id, report_id, module_type, title, summary, display_order, visible_to_client)
values
  ('11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'executive_summary', 'Overview', 'Committee-ready summary of course condition, survey scope and recommended priorities.', 1, true),
  ('11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'course_baseline', 'Greens', 'Greens mapping highlights surface shape and inspection priorities.', 2, true),
  ('11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'drainage', 'Water and Drainage', 'Drainage flow layers identify low fairway corridors and likely ponding areas.', 3, true),
  ('11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'turf_health', 'Turf Health', 'Multispectral outputs show relative turf vigour variation and targeted inspection zones.', 4, true),
  ('11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'tree_canopy', 'Trees and Canopy', 'Canopy records support shade, airflow and woodland management discussions.', 5, true),
  ('11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'recommendations', 'Recommendations', 'Priority actions for drainage, bunker planning and annual monitoring.', 6, true);
