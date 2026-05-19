# Layout Rules

Routes stay thin. `src/pages/[...page].astro` should remain a content-to-renderer handoff. Do not put page orchestration, page-specific data shaping, SEO mapping, icon mapping, block selection, or layout branching in route files.

## Layout Renderer

`src/components/layout-renderer.astro` is the generic bridge from content to layout:

- Fetch/render the content entry.
- Load the global content entry.
- Resolve the layout by `page.data.type`.
- Pass `global`, `page`, and `headings` to the layout.
- Render `<Content />` inside the selected layout.
- Keep the renderer generic and stable.

## Layouts Own Orchestration

Layouts live in `src/layouts` and are the only page orchestration layer. Page orchestration means choosing which blocks/components make up a page type, mapping validated content into their props, arranging page sections, coordinating page-specific data, and deciding where `<Content />` renders.

Never put page orchestration in routes, content files, `base.astro`, or reusable blocks.

## Layout Prop Shape

For files in `src/layouts`, use the shared prop shape:

```ts
type Props = {
  global: GlobalSchema
  page: LayoutSchema
}

const { global, page } = Astro.props
```

Use the specific schema type for `page`, for example `HomeSchema` or `DocSchema`.

Only include `headings` in a layout's `Props` when that layout uses headings. If included, `headings` must be required, not optional:

```ts
type Props = {
  global: GlobalSchema
  page: DocSchema
  headings: MarkdownHeading[]
}

const { global, page, headings } = Astro.props
```

Do not define unused layout props. If a layout does not read `headings`, omit it from `Props`.

Keep page-specific derived values in frontmatter with clear names. Pass explicit props into blocks/components. Do not use `const props = Astro.props` or keep referring to `props.page`.

## Base Layout

`src/layouts/base.astro` is the shared shell:

- Keep it focused on document chrome, head integration, shared navigation, theme/body concerns, and the main shell.
- Pass only shared shell data such as `global`, `page`, and shell navigation options.
- Let `base.astro` forward `page.seo` to head components directly.
- Do not add page-specific SEO mapping, fallback SEO objects, layout-specific branching, or content reshaping in `base.astro`.

## Adding Page Types

To add a new page type:

1. Create `src/schemas/layouts/<name>.ts`.
2. Add it to the discriminated union in `src/schemas/page.ts`.
3. Create `src/layouts/<name>.astro` using the shared prop shape.
4. Ensure `src/components/layout-renderer.astro` can resolve `src/layouts/<name>.astro` from `type: "<name>"`.
5. Add content under `src/content/pages` with `type: <name>`.
6. Keep route files unchanged.
