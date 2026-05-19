# Source Ownership Rules

Use this flow for pages:

```text
content frontmatter/body -> schema validation -> layout orchestration -> block/component props
```

## Content

Content files own authored content and project-specific configuration:

- Page content lives in `src/content/pages`.
- Global locale content lives in `src/content/globals`.
- Prefer `.md` files with frontmatter and body content.
- Use `.mdx` only when docs/live-code examples require imports or component usage.
- Body Markdown is authored rich content rendered by the layout with `<Content />`.
- Structured frontmatter drives schema-backed layout and block composition.
- Content may include schema-validated semantic configuration that changes by page, project, block instance, or locale.

Content must not contain raw Astro components, imported icons, SVG/HTML, Tailwind class strings, or DOM details.

## Schemas

Schemas own the contract:

- Schemas live in `src/schemas`.
- Layout schemas live in `src/schemas/layouts/<name>.ts`.
- `src/content.config.ts` connects content collections to schemas.
- Page frontmatter uses `type` as the discriminant.
- Every page layout schema must be part of the union in `src/schemas/page.ts`.
- Validate object shape strictly.
- Keep open-ended ecosystem values, such as icon names, permissive when appropriate.

## Code

Astro layouts/components own rendering, behavior, DOM structure, imports, accessibility mechanics, styling, responsive behavior, animation, and data-slot internals.

Content may pass semantic values such as `icon: "rocket"`, `tone: "success"`, or a CTA/link label when those values belong to the content instance.

## Icons

Treat icons as one example of the broader content/code boundary:

- UX/control icons belong in code: chevrons, close icons, menu icons, search icons, disclosure arrows, loading indicators, carousel arrows, and form affordances.
- Content/meaning icons may come from content as plain icon names when the icon changes with the surrounding content, project, or locale.
- Render content-owned icons through `src/components/ui/icon` with `<Icon name={item.icon} />`.
- Import fixed code-owned icons directly from the static SVG packages, using local names with an `Icon` suffix such as `ArrowRightIcon`.
- Keep the current `Icon` contract: plain names are normalized, Lucide is preferred by default, and Simple Icons is used as a fallback mainly for brand/social icons.

## Global Content

Use `src/content/globals` for cross-page, locale-aware site data: navigation labels, footer groups, shared site metadata, and other global copy/configuration.

Do not use globals as a dumping ground for page-specific block data. If content is only used by one page type or page instance, keep it in that page's content file.
