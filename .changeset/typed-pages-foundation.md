---
"fulldev-ui": minor
---

Ship a page foundation with one path-driven pages collection, strict schemas per type, one layout per type, locale folders, translation pairing, and structured data. Overview pages render their Markdown body and list validated references or direct children. Routing, breadcrumbs, Markdown links, and the sitemap share one validated pages module; the loader rejects route collisions and the strict schemas reject slug overrides and undeclared fields.

The sitemap is a single `/sitemap.xml` endpoint built from the same page data as the HTML head, so `seo.noindex`, `seo.canonical`, `updatedAt`, and `translationKey` drive robots meta, sitemap inclusion, `lastmod`, and hreflang alternates without separate configuration. Locales come from Astro's resolved `i18n` config. `@astrojs/sitemap` is no longer bundled with the integration. The integration accepts an optional `sitemap` path or URL for its robots output and advertises none by default; set it to `/sitemap.xml` after installing the page endpoint. It also accepts `i18n.prefixDefaultLocale`.

Layout now respects its lang prop and accepts alternate-language links and structured data. Font declarations belong to the consuming layout; projects using LayoutHead should move their Font components into its slot. Existing page content must remove undeclared fields and slug overrides before adopting the strict schemas.

The page installer ships infrastructure only: no sample homepage or About content. The installed `src/site.config.ts` holds only the website name and fails the build until it is set, so unset configuration cannot publish example metadata.
