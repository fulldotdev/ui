# Layouts and routes

`src/pages/[...page].astro` fetches and renders content, loads globals, resolves
`src/layouts/<type>.astro` from `page.data.type`, and passes `global`, `page`,
`headings` and `<Content />` to it. Keep the route and any layout renderer generic.

Layouts choose sections, shape data and map validated content into block props.
Keep page-specific SEO and icon mapping here. In Astro frontmatter, use local
`type Props` with `global: GlobalSchema` and the specific layout schema for
`page`. Destructure `Astro.props` directly; omit unused props. Include required
`headings: MarkdownHeading[]` only in layouts that use them.

`src/layouts/base.astro` owns the shared document shell, head, navigation and
theme. Forward `page.seo` directly to head components; keep page-specific SEO
fallbacks, content reshaping and layout branching out of the base shell.

For a new page type, add `src/schemas/layouts/<name>.ts` to the union in
`src/schemas/page.ts`, create `src/layouts/<name>.astro`, and add page content
with `type: <name>`. The generic route should need no change.
