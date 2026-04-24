Layout conventions

For files in `src/layouts`, always use this prop structure:

```ts
type Props = {
  global: GlobalSchema
  page: LayoutSchema
  headings: MarkdownHeading[]
}

const props: Props = Astro.props
```

Notes:

- `page` should use the schema type for that specific layout, for example `HomeSchema` in `src/layouts/home.astro` or `DocSchema` in `src/layouts/doc.astro`.
- Do not use `data` as the layout prop name. Use `page`.
- Keep the shared prop shape consistent across layouts even when the page schema differs.
- Never include icons in the `src/content` folder. Content is translated; icons are UI and must stay in layouts/components so they are never translated.

Layout file structure

- Layout components live in `src/layouts`
- Each layout should have a matching schema in `src/schemas/layouts`
- Each layout schema should be added to the page union in `src/schemas/page.ts`
- Each layout should be rendered from `src/components/layout-renderer.astro`

Relevant file references:

- Layouts: `src/layouts/home.astro`, `src/layouts/doc.astro`
- Layout schemas: `src/schemas/layouts/home.ts`, `src/schemas/layouts/doc.ts`
- Page schema union: `src/schemas/page.ts`
- Layout renderer: `src/components/layout-renderer.astro`

When adding a new layout

1. Create the layout component in `src/layouts/<name>.astro`
1. Create the matching schema in `src/schemas/layouts/<name>.ts`
1. Add that schema to the discriminated union in `src/schemas/page.ts`
1. Import and render the layout in `src/components/layout-renderer.astro`

Renderer guidance

- Follow the existing renderer pattern in `src/components/layout-renderer.astro`
- Pass `global`, `page`, and `headings` to the layout
- Render `<Content />` inside the matching layout branch
- Be careful with the renderer frontmatter. Extend the existing pattern instead of restructuring it unnecessarily.

Example renderer branch:

```astro
{
  pageData.type === "home" && (
    <Home global={global} page={pageData} headings={headings}>
      <Content />
    </Home>
  )
}
```
