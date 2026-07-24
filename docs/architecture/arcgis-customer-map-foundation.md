# ArcGIS Customer Map Foundation

This document records the production architecture decision for the first Basalt Course Map proof of concept.

## Architecture Decision

Basalt should not become the GIS authoring system. ArcGIS Online or ArcGIS Enterprise should own geometry, hosted feature layers, imagery layers, styling, labels, bookmarks, pop-ups and Web Map composition. Basalt should own customer authentication, tenant authorization, publication state, the customer journey and the premium presentation layer.

For the first proof of concept, Basalt will embed an approved ArcGIS Web Map inside the existing authenticated customer portal using `@arcgis/core`, the official ArcGIS Maps SDK for JavaScript package.

## SDK Architecture

`@arcgis/core` is the ESM npm distribution of the ArcGIS Maps SDK for JavaScript. It provides browser-side modules such as `WebMap`, `MapView`, `FeatureLayer`, `ImageryLayer`, widgets, queries, pop-ups, attachments and `SceneView` for future 3D scenes.

In Next.js, the SDK should be isolated in a client component because it depends on browser APIs. Server components should continue to perform authentication, tenant checks and configuration resolution before passing only customer-safe map configuration to the browser.

## Authentication Model

Basalt customers should authenticate only with Supabase. They should not need ArcGIS accounts for the MVP.

Options reviewed:

- Public Web Maps: simplest, low operational overhead, but weak for private club data.
- API keys: suitable for public or item-restricted access where referrer restrictions are acceptable, but any client-visible key must be treated as constrained rather than secret.
- OAuth application authentication: best long-term fit for private maps because Basalt can broker short-lived access without asking customers to sign into ArcGIS.
- Named-user authentication: strongest ArcGIS-native identity model, but poor customer experience and higher licensing friction for a SaaS customer portal.

Recommended production model:

1. Basalt authenticates the customer with Supabase.
2. Basalt verifies club and course access server-side.
3. Basalt resolves the approved ArcGIS Web Map for the published survey/report.
4. If the map is private, Basalt brokers short-lived ArcGIS access server-side using least-privilege application credentials.
5. The browser receives only the Web Map item ID, portal URL and narrowly scoped short-lived access token when required.

No ArcGIS client secret, password, long-lived admin token or unrestricted API key should be exposed to the browser or stored in `NEXT_PUBLIC_*`.

## Web Map Structure

Recommended long-term ArcGIS structure:

- One ArcGIS portal or Enterprise organization controlled by Basalt.
- One customer-facing Web Map per published course survey/report package.
- Separate internal working Web Maps for draft analyst work.
- Hosted feature layers grouped by club, course, survey and layer type.
- Imagery and raster outputs stored as ArcGIS imagery/tile services where appropriate.
- Previous published surveys are preserved rather than overwritten.

This keeps publication explicit and lets Basalt link a published report to the exact approved map the customer should see.

## What Basalt Stores

Minimum proof-of-concept metadata:

- ArcGIS portal URL
- approved Web Map item ID
- club ID
- course ID
- optional report or survey relationship
- publication visibility

Existing `map_layers` can hold the proof-of-concept reference without a migration by using a dedicated `layer_type` such as `arcgis_webmap`, with the Web Map item ID in existing metadata and the layer linked to a published report. This is acceptable for the foundation PR only.

Long term, Basalt should add explicit additive fields or a dedicated publication table for ArcGIS map configurations. That future schema should model draft, internal review and published map references clearly instead of overloading generic layer fields.

## Customer Experience

Customer journey:

1. Customer logs into Basalt.
2. Basalt routes them to their club workspace.
3. The customer opens a course.
4. The Course Map displays the approved ArcGIS Web Map inside Basalt.
5. Feature selection opens a Basalt-branded detail panel.
6. Reports, recommendations and history link back to the same approved spatial context.

Customers should never see ArcGIS item IDs, service URLs, object IDs, global IDs, editor tracking fields or raw GIS terminology.

## Customer-Safe Feature Attributes

The first customer-facing allowlist is:

- `name`
- `title`
- `feature_name`
- `area_type`
- `condition`
- `severity`
- `status`
- `description`
- `survey_date`
- `recommended_action`
- `evidence_attachment`
- `related_report`

Everything else should be ignored by the Basalt detail panel.

## Future Roadmap Fit

This architecture can later support drone imagery, orthomosaics, LiDAR, NDVI, drainage layers, tree inventories, slope maps, historical comparisons, before/after views and 3D scenes by publishing those outputs into ArcGIS and linking the approved Web Map or Scene back into the Basalt portal.

## First PR Scope

The first PR should include only:

- `@arcgis/core`
- authenticated `/clubs/[clubSlug]/map`
- server-side club and course validation
- approved Web Map configuration resolution
- ArcGIS Web Map rendering inside Basalt
- premium empty/error/loading states
- authentication and configuration tests

It should not add Course Map to primary navigation yet.
