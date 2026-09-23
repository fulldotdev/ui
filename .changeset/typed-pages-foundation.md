---
"fulldev-ui": minor
---

Ship a complete page starter with one path-driven pages collection, strict schemas per type, explicit layouts, locale-aware URLs, translation pairing, and structured data. Render overview Markdown and use validated references or direct children for its entries. Centralize routing, search, breadcrumbs, Markdown links, and sitemap URLs; reject slug overrides and route collisions. Allow partial SEO overrides and omit invented sitemap dates.

Layout now respects its lang prop and accepts alternate-language links and structured data. Font declarations belong to the consuming layout; projects using the existing LayoutHead should move their Font components into its slot. Existing page content must remove undeclared fields and slug overrides before adopting the strict schemas.

The reusable integration now accepts an explicit sitemap URL for robots output. Install the page endpoints or provide your own sitemap before configuring that URL.
