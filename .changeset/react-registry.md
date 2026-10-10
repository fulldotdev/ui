---
"fulldev-ui": minor
---

Add Fulldev UI for React: every shadcn/ui Base UI component, the Fulldev components and all 82 blocks as React components, in every shadcn/ui style. Install them with the shadcn CLI from the React registry, `https://ui.full.dev/r/react/styles/{style}/{name}.json`, starting with `npx shadcn@latest init https://ui.full.dev/r/react/styles/base-vega/base.json`. The npm package does not include the React registry.

Add the examples from the shadcn/ui documentation as `@fulldev/<component>-examples` items: the official React source in the React registry, native ports in the Astro registry for the components Fulldev UI has in Astro.

The docs now have an Astro and a React edition at `/astro/` and `/react/`; the former `/docs/`, `/components/` and `/blocks/` addresses redirect to the Astro edition. `Sidebar1` takes optional header content below its logo (a `header` slot in Astro, a `header` prop in React).

The Astro `SidebarProvider` now leaves a sidebar nested inside another provider alone: the outer one no longer updates its trigger, rail and tooltips, the nested one keeps its state out of the shared `sidebar_state` cookie, and a provider whose inline script did not run initializes on `astro:page-load`.
