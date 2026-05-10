# Fulldev UI Repo Guidelines

Fulldev UI is a component and block registry, and this repo also serves as the docs site and the internal reference architecture for Fulldev UI projects. Treat those responsibilities separately when making changes.

## Responsibility Tiers

**Tier 1: Registry contract**

Installable UI components, blocks, registry metadata, and generated registry output. These must work in consuming Astro projects, not only in this docs site.

**Tier 2: Reference architecture**

Layouts, schemas, content organization, route handoff, global content, renderer behavior, and the shared shell. These may not be registry items yet, but they are the best-practice template used in client projects. Do not treat them as disposable docs-site plumbing.

**Tier 3: Docs-only support**

Documentation pages, live-code examples, local example scaffolding, and docs helpers. These may use docs-specific conveniences, but they must not leak into registry code or weaken the reference architecture.

Before changing core doctrine around content/schema/layout separation, layout-owned orchestration, registry portability, shadcn parity, or these tiers, surface the tradeoff first.

## Source Ownership

Use this flow for pages:

```text
content frontmatter/body -> schema validation -> layout orchestration -> block/component props
```

Content files own authored content and project-specific configuration:

- Page content lives in `src/content/pages`.
- Global locale content lives in `src/content/globals`.
- Prefer `.md` files with frontmatter and body content. Use `.mdx` only when docs/live-code examples require imports or component usage.
- Body Markdown is authored rich content rendered by the layout with `<Content />`.
- Structured frontmatter drives schema-backed layout and block composition.
- Content may include schema-validated semantic configuration that changes by page, project, block instance, or locale.

Schemas own the contract:

- Schemas live in `src/schemas`.
- Layout schemas live in `src/schemas/layouts/<name>.ts`.
- `src/content.config.ts` connects content collections to schemas.
- Page frontmatter uses `type` as the discriminant.
- Every page layout schema must be part of the union in `src/schemas/page.ts`.
- Validate object shape strictly. Keep open-ended ecosystem values, such as icon names, permissive when appropriate.

Code owns implementation:

- Astro layouts/components own rendering, behavior, DOM structure, imports, accessibility mechanics, styling, responsive behavior, animation, and data-slot internals.
- Content should not contain raw Astro components, imported icons, SVG/HTML, Tailwind class strings, or DOM details.
- Content may pass semantic values such as `icon: "rocket"`, `tone: "success"`, or a CTA/link label when those values belong to the content instance.

For icons specifically, treat them as one example of the broader content/code boundary:

- UX/control icons belong in code: chevrons, close icons, menu icons, search icons, disclosure arrows, loading indicators, carousel arrows, and form affordances.
- Content/meaning icons may come from content as plain icon names when the icon changes with the surrounding content, project, or locale.
- Render content-owned icons through `src/components/ui/icon` with `<Icon name={item.icon} />`.
- Keep the current `Icon` contract: plain names are normalized, Lucide is preferred by default, and Simple Icons is used as a fallback mainly for brand/social icons.

## Layout Architecture

Routes stay thin. `src/pages/[...page].astro` should remain a content-to-renderer handoff. Do not put page orchestration, page-specific data shaping, SEO mapping, icon mapping, block selection, or layout branching in route files.

`src/components/layout-renderer.astro` is the generic bridge from content to layout:

- Fetch/render the content entry.
- Load the global content entry.
- Resolve the layout by `page.data.type`.
- Pass `global`, `page`, and `headings` to the layout.
- Render `<Content />` inside the selected layout.
- Keep the renderer generic and stable.

Layouts live in `src/layouts` and are the only page orchestration layer. Page orchestration means choosing which blocks/components make up a page type, mapping validated content into their props, arranging page sections, coordinating page-specific data, and deciding where `<Content />` renders.

Never put page orchestration in routes, content files, `base.astro`, or reusable blocks.

For files in `src/layouts`, use the shared prop shape:

```ts
type Props = {
  global: GlobalSchema
  page: LayoutSchema
  headings: MarkdownHeading[]
}

const { global, page, headings } = Astro.props
```

Use the specific schema type for `page`, for example `HomeSchema` or `DocSchema`.

`src/layouts/base.astro` is the shared shell:

- Keep it focused on document chrome, head integration, shared navigation, theme/body concerns, and the main shell.
- Pass only shared shell data such as `global`, `page`, and shell navigation options.
- Let `base.astro` forward `page.seo` to head components directly.
- Do not add page-specific SEO mapping, fallback SEO objects, layout-specific branching, or content reshaping in `base.astro`.

To add a new page type:

1. Create `src/schemas/layouts/<name>.ts`.
2. Add it to the discriminated union in `src/schemas/page.ts`.
3. Create `src/layouts/<name>.astro` using the shared prop shape.
4. Ensure `src/components/layout-renderer.astro` can resolve `src/layouts/<name>.astro` from `type: "<name>"`.
5. Add content under `src/content/pages` with `type: <name>`.
6. Keep route files unchanged.

## Global Content

Use `src/content/globals` for cross-page, locale-aware site data: navigation labels, footer groups, shared site metadata, and other global copy/configuration.

Do not use globals as a dumping ground for page-specific block data. If content is only used by one page type or page instance, keep it in that page's content file.

## Components

Reusable UI components live in `src/components/ui/<component-name>/`.

- Use kebab-case filenames throughout the repo.
- Keep one folder per component family.
- Expose the public API through an `index.ts` barrel.
- Keep helper files next to the component they support.
- Use the existing `@/*` import alias for `src/*`.
- Preserve nearby naming and composition patterns.

For shadcn-parity components:

- Match shadcn's public API, composition model, styling boundaries, and expected behavior as closely as Astro allows.
- Use `../shadcn-styling-reference` as the source of truth for API and styling parity.
- Use `../data-slot` as the source of truth for required DOM and behavior.
- If shadcn exports a piece, it may be public here. If shadcn keeps a piece private, keep it inline/private in the owning Astro component.
- Do not create public Astro components for private data-slot internals such as portals, positioners, viewports, indicators, thumbs, or item-text wrappers unless shadcn also exposes them.
- Keep shadcn-owned classes on the same component boundary as shadcn. Do not split one shadcn component's styling across extra public wrappers.

For Fulldev-only components:

- Shadcn parity rules do not apply.
- Optimize for reusable, content-first Astro composition.
- Keep the public API small, portable, accessible, and consistent with nearby Fulldev components.

Docs describe component APIs; they do not define them. If docs and implementation disagree, fix the mismatch at the source rather than hiding it in examples.

## File-Level Conventions

Astro frontmatter should make the file's contract obvious:

- Use `type Props`, not `interface Props`.
- Define `type Props` before reading `Astro.props`.
- Let Astro infer prop types from `Props`; do not annotate the assignment or destructuring with `: Props`.
- Destructure `Astro.props` once near the top of the frontmatter.
- Derive local values after destructuring.

Use this pattern:

```ts
type Props = {
  title: string
  description?: string
}

const { title, description } = Astro.props
```

Do not use this pattern:

```ts
const props: Props = Astro.props
const { title }: Props = Astro.props
```

For layout files:

- Destructure the shared layout props as `{ global, page, headings }`.
- Keep page-specific derived values in frontmatter with clear names.
- Pass explicit props into blocks/components.
- Do not use `const props = Astro.props` or keep referring to `props.page`.

For UI component files:

- Type native attributes with Astro's `HTMLAttributes` or `Polymorphic` helpers.
- Destructure `class` as `class: className`.
- Name the remaining pass-through prop bag `props`.
- Merge classes with `cn(...)`.
- Spread `props` on the intended root/control element.
- Preserve required `data-slot` structure and behavior.

Example:

```ts
import type { HTMLAttributes } from "astro/types"

import { cn } from "@/lib/utils"

type Props = HTMLAttributes<"div"> & {
  size?: "default" | "sm"
}

const { class: className, size = "default", ...props } = Astro.props
```

For block files:

- Always expose `class?: string`.
- Destructure `class` as `class: className`.
- Apply the class to the outermost block/root component.
- Use `cn("", className)` when forwarding the root class, even when there are no base classes yet.
- Keep block prop types plain and inline. Do not import UI component prop types into blocks.
- Use semantic prop names that describe visible content.

Example:

```ts
import { cn } from "@/lib/utils"

type Props = {
  class?: string
  title: string
  description?: string
  buttons?: {
    label: string
    href: string
    icon?: string
    variant?: "default" | "outline" | "secondary" | "ghost"
  }[]
  features: {
    title: string
    description: string
    icon?: string
  }[]
}

const { class: className, title, description, buttons, features } = Astro.props
```

For block prop naming:

- Use `label` for buttons, links, nav items, tabs, menu items, form controls, and other interactive/control visible names.
- Use `title` for headings and named content entities.
- Use `description` for supporting copy.
- Use `icon` for content-owned icon names.
- Use `href` for link destinations.
- Use `buttons` for CTA/action button arrays.
- Use domain-specific plural collection names such as `features`, `services`, `reviews`, `links`, `plans`, `articles`, `logos`, or `faqs`.
- Avoid generic block collection names like `items`, `entries`, `cards`, or `actions` unless the block is genuinely generic.

For block button rendering, let the block own button size and simple design defaults:

```astro
{
  buttons?.length && (
    <div>
      {buttons.map(({ href, label, icon, ...button }, index) => (
        <Button
          href={href}
          size={icon && !label ? "icon-sm" : "sm"}
          variant={index === 0 ? "default" : "outline"}
          {...button}
        >
          {icon && <Icon name={icon} />}
          {label}
        </Button>
      ))}
    </div>
  )
}
```

Button data should not include `size`; size belongs to the block design. If `target` or `rel` behavior is needed, derive it from `href` in the component where that behavior matters.

For conditional rendering:

- Optional arrays: `{buttons?.length && (...)}`
- Optional presentational values: `{description && (...)}`
- Required arrays: map directly with `{features.map(...)}`
- Do not use `? (...) : null` when `&&` communicates the intent.

For mapping:

- Map arrays inline when rendering is direct.
- Derive named values in frontmatter when sorting, filtering, combining sources, computing active state, choosing previous/next, assigning meaningful page data, or converting schema content into block props.
- In layouts, deriving named block props is expected.
- In blocks, avoid over-preparing simple prop data.

## Blocks

Installable blocks live in `src/components/blocks`.

Blocks are portable, production-leaning compositions for content-driven Astro sites. They may demonstrate best practices, but they must not depend on this repo's private page schemas, content collections, globals, routes, layouts, or docs shell.

Block rules:

- Receive project-specific data through props and slots.
- Stay schema-agnostic. Do not import page schemas or content collection types into blocks.
- Do not import from `src/content`, `src/layouts`, route files, docs helpers, or private page architecture.
- Do not hardcode content-meaningful icons, entries, CTAs, links, labels, or images when they should vary by project, page, block instance, or locale.
- It is fine to hardcode code-owned UX/control icons inside a block.
- Let layouts map schema-backed content into block props.

Layouts importing reusable blocks and passing schema-backed content into them is the preferred orchestration pattern.

## Registry

This is a shadcn registry. `registry.json` is the source of truth for registry items.

Portable registry code means an installable file works in a normal Astro project configured for Fulldev UI without relying on this docs site's private content, routes, layouts, globals, schemas, or live-code infrastructure.

Registry rules:

- Update `registry.json` when adding/removing installable items, changing file paths, changing registry dependencies, changing npm dependencies, or changing installable source files.
- Include every required source file in the registry item.
- Declare npm dependencies and registry dependencies completely.
- Keep installable components and blocks portable.
- Run `pnpm registry:build` after registry-relevant changes.
- Commit regenerated `public/r/*.json` and `public/r/registry.json` when registry inputs change.

Generated output policy:

- Treat `dist/` as build output. Never edit it by hand.
- Treat `public/r` as generated registry output. Do not hand-edit it unless intentionally debugging generated output.
- If files move during a repo reorganization, update `registry.json` immediately. Stale paths break registry builds.

To add or change a registry item:

1. Put source files in the correct location: `src/components/ui/<name>/` or `src/components/blocks/<name>.astro`.
2. Keep the item portable and schema-agnostic.
3. Update `registry.json` with files, dependencies, registry dependencies, and metadata.
4. Run `pnpm registry:build`.
5. Check generated `public/r` output for expected changes.
6. Run `pnpm check`; run `pnpm build` if rendering or docs changed.

Docs pages document registry items, but they do not make something part of the registry. If something should be installable, add it to `registry.json` and regenerate `public/r`.

## Where Things Belong

| Change                       | Put it here                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| Installable UI primitive     | `src/components/ui/<component-name>/` plus `index.ts` and `registry.json`              |
| Installable block            | `src/components/blocks/<block-name>.astro` plus `registry.json`                        |
| New page type                | `src/schemas/layouts/<name>.ts`, `src/layouts/<name>.astro`, and `src/schemas/page.ts` |
| Page orchestration           | Matching `src/layouts/<name>.astro` only                                               |
| Page-specific content/config | Matching file under `src/content/pages`                                                |
| Global navigation/site copy  | `src/content/globals`                                                                  |
| Content contract             | `src/schemas` and `src/content.config.ts`                                              |
| Shared shell/chrome          | `src/layouts/base.astro`                                                               |
| Route handoff                | `src/pages/[...page].astro`                                                            |
| UX/control behavior          | Component or layout code                                                               |
| Content-owned icon choice    | Content field as a plain icon name, rendered through `Icon`                            |
| Docs/live-code examples      | `src/content/pages/docs`, using `.mdx` only when needed                                |

## Change Workflow

1. Identify the tier touched: registry contract, reference architecture, or docs-only support.
2. Keep content, schema, layout, component, block, and registry responsibilities separate.
3. For registry changes, update `registry.json` and run `pnpm registry:build`.
4. For content/page/layout changes, update content, schema, and layout together.
5. Keep routes thin and `base.astro` shell-only.
6. Prefer existing patterns. If you must diverge, keep the exception local and explain why the normal architecture does not fit.

Validation:

- Use pnpm for repo commands.
- Node `>=22.12.0` is required by `package.json`.
- Run `pnpm prettier <touched-files>` after editing Astro, TypeScript, Markdown, MDX, YAML, or JSON files.
- Run `pnpm check` after structural, schema, content, or layout changes.
- Run `pnpm registry:build` after registry item, path, dependency, or installable source changes.
- Run `pnpm build` when rendering, docs, layout, or block changes have meaningful UI/build risk.
- Use `pnpm dev` for manual inspection when UI behavior or docs presentation changed.

## Anti-Patterns

- Adding page orchestration to routes, content files, `base.astro`, or reusable blocks.
- Treating `src/layouts` as docs-only plumbing.
- Using MDX imports as the default page composition model.
- Adding content fields without updating the matching schema.
- Moving UI implementation details, DOM structure, classes, raw SVG, or component imports into content.
- Hardcoding content-meaningful icons or entries inside reusable blocks.
- Importing `src/content`, globals, page schemas, routes, or docs helpers from installable blocks/components.
- Adding page-type branching or fallback SEO shaping to `base.astro`.
- Changing registry item files or dependencies without rebuilding `public/r`.
- Hand-editing `dist/`.
- Hand-editing `public/r` outside intentional generated-output debugging.
- Splitting shadcn-owned styling across extra wrappers.
- Creating public components for private data-slot internals.
- Patching docs examples to hide broken component behavior, missing exports, registry drift, or schema drift.
