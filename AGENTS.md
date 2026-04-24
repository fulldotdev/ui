Repository structure

- This repo is a content-driven Astro site and the source for the Fulldev registry. Preserve the current separation of concerns instead of introducing new patterns.
- Source code lives in `src/`. Treat `dist/` as build output.
- Use the existing `@/*` import alias for `src/*`.

Content and schemas

- Page content lives in `src/content/pages`.
- Global locale content lives in `src/content/globals`.
- Content schemas live in `src/schemas`.
- `src/content.config.ts` is the contract between content files and schemas. Keep it aligned with any structural changes.
- Page frontmatter uses `type` as the discriminant. Every page layout schema must be added to the union in `src/schemas/page.ts`.
- Keep translated content in `src/content`. Do not move UI decisions into content.
- Never put icons in `src/content`. Icons are UI and belong in layouts/components so they are not translated.

Layouts

- Layout components live in `src/layouts`.
- Each layout must have a matching schema in `src/schemas/layouts/<name>.ts`.
- Each layout must be rendered from `src/components/layout-renderer.astro`.
- Keep route files thin. `src/pages/[...page].astro` should stay a simple content-to-renderer handoff.

For files in `src/layouts`, always use this prop shape:

```ts
type Props = {
  global: GlobalSchema
  page: LayoutSchema
  headings: MarkdownHeading[]
}

const props: Props = Astro.props
```

- `page` should use the specific schema type for that layout, for example `HomeSchema` or `DocSchema`.
- Keep the shared prop shape consistent across layouts even when the page schema differs.
- When adding a new layout:
  1. Create `src/layouts/<name>.astro`
  2. Create `src/schemas/layouts/<name>.ts`
  3. Add it to `src/schemas/page.ts`
  4. Import and render it in `src/components/layout-renderer.astro`

Renderer guidance

- Follow the existing renderer pattern in `src/components/layout-renderer.astro`.
- Pass `global`, `page`, and `headings` to the layout.
- Render `<Content />` inside the matching layout branch.
- Extend the existing frontmatter pattern; do not casually restructure the renderer.

Components

- Reusable UI components live in `src/components/ui/<component-name>/`.
- Keep one folder per component family with an `index.ts` barrel as the public API.
- Keep helper files next to the component they belong to, for example variant helpers like `button-variants.ts`.
- Preserve the existing naming pattern: root component file plus clearly named subparts in the same folder.

Registry

- This is a shadcn registry.
- `registry.json` is the source of truth for registry items.
- `public/r/*.json` and `public/r/registry.json` are generated output from `registry.json`. Do not hand-edit them unless you are intentionally debugging generated output.
- After changing registry items, component file paths, registry dependencies, or installable source files, run `bun run registry:build` and commit the regenerated `public/r` files.
- If files move during a repo reorg, update `registry.json` immediately. Stale paths will break the registry build.

Tooling

- Use Bun for repo commands: `bun install`, `bun run dev`, `bun run check`, `bun run build`.
- Use `bun run registry:build` to regenerate the shadcn registry output in `public/r`.
- Node `>=22.12.0` is required by `package.json`.
- After structural changes, run at least `bun run check`.
