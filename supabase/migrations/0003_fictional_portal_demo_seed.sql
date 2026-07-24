-- One-time fictional portal demo data.
-- This migration contains fictional public-portal records only.

insert into public.packages (id, name, description, active)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'Basalt Complete',
  'Course baseline, turf health, drainage, terrain, tree canopy, recommendations and annual monitoring.',
  true
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  active = excluded.active,
  updated_at = now();

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
on conflict (package_id, module_type) do update set
  enabled = excluded.enabled,
  display_order = excluded.display_order;

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
values
  (
    '11111111-1111-4111-8111-111111111111',
    'North Coast Golf Club',
    'north-coast-golf-club',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'active',
    'demo',
    'James Kerr',
    'james.kerr@northcoast.example'
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    'Harbour Dunes Golf Club',
    'harbour-dunes-golf-club',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'active',
    'demo',
    'Aoife Morgan',
    'aoife.morgan@harbourdunes.example'
  )
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  package_id = excluded.package_id,
  status = excluded.status,
  onboarding_status = excluded.onboarding_status,
  primary_contact_name = excluded.primary_contact_name,
  primary_contact_email = excluded.primary_contact_email,
  updated_at = now();

insert into public.courses (id, club_id, name, hole_count, centre_latitude, centre_longitude)
values
  (
    '22222222-2222-4222-8222-222222222222',
    '11111111-1111-4111-8111-111111111111',
    'Championship Links',
    18,
    55.204,
    -6.652
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    '55555555-5555-4555-8555-555555555555',
    'Harbour Course',
    18,
    54.721,
    -5.803
  )
on conflict (id) do update set
  club_id = excluded.club_id,
  name = excluded.name,
  hole_count = excluded.hole_count,
  centre_latitude = excluded.centre_latitude,
  centre_longitude = excluded.centre_longitude,
  updated_at = now();

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
on conflict (id) do update set
  club_id = excluded.club_id,
  course_id = excluded.course_id,
  area_type = excluded.area_type,
  name = excluded.name,
  reference_number = excluded.reference_number,
  hole_number = excluded.hole_number,
  description = excluded.description,
  display_order = excluded.display_order,
  updated_at = now();

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
on conflict (id) do update set
  club_id = excluded.club_id,
  course_id = excluded.course_id,
  survey_name = excluded.survey_name,
  survey_date = excluded.survey_date,
  survey_type = excluded.survey_type,
  status = excluded.status,
  sensor_summary = excluded.sensor_summary,
  accuracy_summary = excluded.accuracy_summary,
  updated_at = now();

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
on conflict (id) do update set
  slug = excluded.slug,
  course_id = excluded.course_id,
  survey_id = excluded.survey_id,
  title = excluded.title,
  report_type = excluded.report_type,
  status = excluded.status,
  summary = excluded.summary,
  survey_date = excluded.survey_date,
  published_at = excluded.published_at,
  version = excluded.version,
  pdf_file_path = excluded.pdf_file_path,
  cover_image_path = excluded.cover_image_path,
  updated_at = now();

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
  version
)
values (
  '44444444-4444-4444-8444-444444444445',
  '11111111-1111-4111-8111-111111111111',
  '22222222-2222-4222-8222-222222222222',
  '33333333-3333-4333-8333-333333333334',
  '2025 Monitoring Report Draft',
  '2025-monitoring-draft',
  'annual_monitoring',
  'draft',
  'Internal draft used to verify that unpublished reports remain hidden from normal club users.',
  '2025-05-18',
  1
)
on conflict (id) do update set
  slug = excluded.slug,
  course_id = excluded.course_id,
  survey_id = excluded.survey_id,
  title = excluded.title,
  report_type = excluded.report_type,
  status = excluded.status,
  summary = excluded.summary,
  survey_date = excluded.survey_date,
  version = excluded.version,
  updated_at = now();

insert into public.report_sections (
  id,
  club_id,
  report_id,
  module_type,
  title,
  summary,
  display_order,
  visible_to_client
)
values
  ('cccccccc-1111-4111-8111-111111111101', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'executive_summary', 'Overview', 'Committee-ready summary of course condition, survey scope and recommended priorities.', 1, true),
  ('cccccccc-1111-4111-8111-111111111102', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'course_baseline', 'Greens', 'Greens mapping highlights surface shape and inspection priorities.', 2, true),
  ('cccccccc-1111-4111-8111-111111111103', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'drainage', 'Water and Drainage', 'Drainage flow layers identify low fairway corridors and likely ponding areas.', 3, true),
  ('cccccccc-1111-4111-8111-111111111104', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'turf_health', 'Turf Health', 'Multispectral outputs show relative turf vigour variation and targeted inspection zones.', 4, true),
  ('cccccccc-1111-4111-8111-111111111105', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'tree_canopy', 'Trees and Canopy', 'Canopy records support shade, airflow and woodland management discussions.', 5, true),
  ('cccccccc-1111-4111-8111-111111111106', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', 'recommendations', 'Recommendations', 'Priority actions for drainage, bunker planning and annual monitoring.', 6, true)
on conflict (id) do update set
  club_id = excluded.club_id,
  report_id = excluded.report_id,
  module_type = excluded.module_type,
  title = excluded.title,
  summary = excluded.summary,
  display_order = excluded.display_order,
  visible_to_client = excluded.visible_to_client,
  updated_at = now();

insert into public.map_layers (
  id,
  club_id,
  course_id,
  report_id,
  name,
  layer_type,
  description,
  opacity,
  visible_by_default,
  display_order
)
values
  ('88888888-8888-4888-8888-888888888801', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '44444444-4444-4444-8444-444444444444', 'Contours', 'contours', 'Elevation contour layer for planning and drainage discussion.', 0.74, true, 1),
  ('88888888-8888-4888-8888-888888888802', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '44444444-4444-4444-8444-444444444444', 'Drainage Priority', 'drainage', 'Surface-flow and low-area interpretation for targeted inspection.', 0.68, true, 2),
  ('88888888-8888-4888-8888-888888888803', '11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '44444444-4444-4444-8444-444444444444', 'Turf Vigour', 'multispectral', 'Relative turf vigour variation requiring ground inspection.', 0.58, false, 3)
on conflict (id) do update set
  club_id = excluded.club_id,
  course_id = excluded.course_id,
  report_id = excluded.report_id,
  name = excluded.name,
  layer_type = excluded.layer_type,
  description = excluded.description,
  opacity = excluded.opacity,
  visible_by_default = excluded.visible_by_default,
  display_order = excluded.display_order,
  updated_at = now();

insert into public.findings (
  id,
  club_id,
  report_id,
  course_area_id,
  finding_type,
  title,
  description,
  severity,
  confidence,
  map_layer_id
)
values
  ('99999999-9999-4999-8999-999999999901', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', '77777777-7777-4777-8777-777777777702', 'drainage', 'Low fairway corridor requires drainage review', 'Surface-flow interpretation indicates a repeat collection corridor through Fairway 4.', 'high', 'High', '88888888-8888-4888-8888-888888888802'),
  ('99999999-9999-4999-8999-999999999902', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', '77777777-7777-4777-8777-777777777704', 'redevelopment', 'Bunker profile ready for remodelling scope', 'Measured bunker shape can support material planning and committee approval.', 'moderate', 'Medium', null),
  ('99999999-9999-4999-8999-999999999903', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', '77777777-7777-4777-8777-777777777705', 'tree_canopy', 'Canopy pressure near approach route', 'Tree cover should be reviewed for shade, airflow and playability impact.', 'moderate', 'Medium', null)
on conflict (id) do update set
  club_id = excluded.club_id,
  report_id = excluded.report_id,
  course_area_id = excluded.course_area_id,
  finding_type = excluded.finding_type,
  title = excluded.title,
  description = excluded.description,
  severity = excluded.severity,
  confidence = excluded.confidence,
  map_layer_id = excluded.map_layer_id,
  updated_at = now();

insert into public.recommendations (
  id,
  club_id,
  report_id,
  finding_id,
  course_area_id,
  title,
  description,
  priority,
  recommended_timeframe,
  status
)
values
  ('aaaaaaaa-9999-4999-8999-999999999901', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', '99999999-9999-4999-8999-999999999901', '77777777-7777-4777-8777-777777777702', 'Commission targeted drainage design review', 'Use the mapped corridor to focus contractor inspection and scope design options.', 'High', '0-3 months', 'proposed'),
  ('aaaaaaaa-9999-4999-8999-999999999902', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', '99999999-9999-4999-8999-999999999902', '77777777-7777-4777-8777-777777777704', 'Prepare bunker remodelling quantities', 'Use baseline measurements for concept options and capital planning.', 'Medium', '3-6 months', 'planned')
on conflict (id) do update set
  club_id = excluded.club_id,
  report_id = excluded.report_id,
  finding_id = excluded.finding_id,
  course_area_id = excluded.course_area_id,
  title = excluded.title,
  description = excluded.description,
  priority = excluded.priority,
  recommended_timeframe = excluded.recommended_timeframe,
  status = excluded.status,
  updated_at = now();

insert into public.report_media (
  id,
  club_id,
  report_id,
  course_area_id,
  file_path,
  media_type,
  caption,
  captured_at,
  display_order
)
values
  ('bbbbbbbb-9999-4999-8999-999999999901', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', null, '11111111-1111-4111-8111-111111111111/reports/orthomosaic.jpg', 'image', 'Orthomosaic preview', '2026-05-14', 1),
  ('bbbbbbbb-9999-4999-8999-999999999902', '11111111-1111-4111-8111-111111111111', '44444444-4444-4444-8444-444444444444', '77777777-7777-4777-8777-777777777702', '11111111-1111-4111-8111-111111111111/reports/drainage-map.jpg', 'image', 'Drainage-priority map preview', '2026-05-14', 2)
on conflict (id) do update set
  club_id = excluded.club_id,
  report_id = excluded.report_id,
  course_area_id = excluded.course_area_id,
  file_path = excluded.file_path,
  media_type = excluded.media_type,
  caption = excluded.caption,
  captured_at = excluded.captured_at,
  display_order = excluded.display_order;

insert into public.activity_log (id, club_id, action, entity_type, entity_id, metadata_json)
values
  ('dddddddd-1111-4111-8111-111111111101', '11111111-1111-4111-8111-111111111111', 'Published 2026 baseline report', 'report', '44444444-4444-4444-8444-444444444444', '{"status":"published"}'),
  ('dddddddd-1111-4111-8111-111111111102', '11111111-1111-4111-8111-111111111111', 'Added drainage priority recommendation', 'recommendation', 'aaaaaaaa-9999-4999-8999-999999999901', '{"priority":"High"}')
on conflict (id) do update set
  club_id = excluded.club_id,
  action = excluded.action,
  entity_type = excluded.entity_type,
  entity_id = excluded.entity_id,
  metadata_json = excluded.metadata_json;
