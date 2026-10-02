---
"fulldev-ui": minor
---

- `astro` (`^7.0.0`) and `tailwindcss` (`^4.1.0`) are now peer dependencies instead of dependencies. Sites that install `fulldev-ui` keep their own Astro and Tailwind, so the package no longer adds a second, older Astro to the site's dependency tree. Sites need Astro 7.
- The package now depends only on what its shipped files import. Tools for the docs site (`@astrojs/mdx`, `@astrojs/sitemap`, `@tailwindcss/vite`, `astro-favicons`, `astro-live-code`, `astro-robots-txt`, `posthog-js` and `typescript`) are no longer installed with it, and the unused `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` are removed.
- `src/lib` in the package now contains only `utils.ts`, the file the registry installs. The docs site's own helpers (`integration.ts`, `pages.ts` and the analytics files) are no longer published.
- The `layout` item now installs `@lexingtonthemes/seo@^0.4.0`, which supports Astro 7. Its code is the same as 0.2.0. The package also requires `@lucide/astro` 1.49.0 or later, because versions before 1.30 do not support Astro 7.
- `banner-1` and `article-2` add explicit spaces between their inline parts. Astro 7 removes whitespace that spans a line break, which made `banner-1` read "titleDescription" on small screens and `article-2` read "Name· date".
