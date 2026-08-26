---
name: fulldev
description: Guides Fulldev client projects using Astro, Fulldev UI, content/schema/layout architecture, reusable components, blocks, theming, and shadcn-compatible Fulldev registry installs. Use when working in Fulldev client projects, installing or composing @fulldev components, shaping content-driven Astro pages, or deciding where project responsibilities belong.
---

# Fulldev

Fulldev projects are content-driven Astro sites that use Fulldev UI components through the shadcn-compatible `@fulldev` registry. This skill is for using Fulldev in client projects, not for maintaining the Fulldev UI registry itself.

## Project Model

Inspect the current repo before enforcing conventions. Fulldev architecture is the target for client projects, but do not silently migrate an existing different architecture.

Preferred page flow:

```text
content frontmatter/body -> schema validation -> layout orchestration -> components/blocks
```

Before changing core doctrine around content/schema/layout separation, layout-owned orchestration, component/block boundaries, or Fulldev UI usage, surface the tradeoff first.

## Principles

1. **Preserve ownership boundaries.** Content owns authored copy and semantic configuration; schemas own contracts; layouts own page orchestration; components and blocks own DOM, behavior, accessibility, styling, and implementation details.
2. **Keep routes and shell boring.** `src/pages/[...page].astro` stays a handoff route, `src/components/layout-renderer.astro` stays generic, and `src/layouts/base.astro` stays shell-only.
3. **Install before inventing.** Prefer existing `@fulldev` components through the shadcn CLI before creating local reusable UI.
4. **Compose locally when needed.** Project-specific components and blocks are fine, but they are local application code, not Fulldev registry items.
5. **Keep the feedback loop light.** During development, prefer a running dev server and occasional log checks. Save full build/check validation for release prep or clearly risky changes.

## Critical Rules

These rules are always enforced. Load the linked file for detailed examples and edge cases.

### Source Ownership -> [source-ownership.md](./rules/source-ownership.md)

- Page flow is `content frontmatter/body -> schema validation -> layout orchestration -> block/component props`.
- Content cannot contain raw Astro components, imported icons, SVG/HTML, Tailwind class strings, or DOM details.
- Content-owned icons are plain names rendered through `src/components/ui/icon`.
- Globals are for cross-page locale-aware site data, not page-specific block data.

### Layouts -> [layouts.md](./rules/layouts.md)

- Routes stay thin.
- `layout-renderer.astro` stays generic.
- Page orchestration belongs only in `src/layouts`.
- `base.astro` is shared shell only.
- Layout props use `{ global, page }`, plus required `headings` only when used.

### Components -> [components.md](./rules/components.md)

- UI components live in `src/components/ui/<component-name>/`.
- Use `type Props`, destructure `Astro.props` once, and keep Astro frontmatter contracts obvious.
- Use native attribute types, `class: className`, `props`, and `cn(...)`.
- Prefer installing existing `@fulldev` components before creating local reusable UI.
- Fulldev components use shadcn-compatible installation, but avoid duplicating the whole `shadcn` skill here.

### Blocks -> [blocks.md](./rules/blocks.md)

- Blocks are project compositions that receive data through props and slots.
- Blocks stay schema-agnostic and do not import page content collections.
- Blocks expose `class?: string`, apply it to the root, and use plain inline prop types.
- Block props use semantic names such as `title`, `description`, `buttons`, `features`, `href`, and `icon`.
- Button size belongs to the block design, not button data.

### CLI -> [cli.md](./cli.md)

- Fulldev UI is installed through the shadcn CLI using the `@fulldev` registry.
- Do not invent a `fulldev` CLI command unless the project actually provides one.
- Use `npx shadcn@latest add @fulldev/<component>` or the project package runner equivalent.

### Customization -> [customization.md](./customization.md)

- Prefer semantic CSS variables and Fulldev/shadcn component variants.
- Customize theme variables before editing installed component source.
- Use local wrappers/compositions when behavior is project-specific.

### MCP -> [mcp.md](./mcp.md)

- If a shadcn MCP server is configured, use it as registry tooling for `@fulldev` items.
- Use CLI inspection when MCP cannot reveal local project configuration.

### Validation -> [validation.md](./rules/validation.md)

- Use the project package manager.
- During development, run or reuse the dev server and read logs occasionally.
- Do not run full builds or checks after every small edit.
- For release prep, run the release validation sequence in `rules/validation.md`.

### Anti-Patterns -> [anti-patterns.md](./rules/anti-patterns.md)

- Do not add page orchestration to routes, content files, `base.astro`, or reusable blocks.
- Do not move implementation details into content.
- Do not create local reusable UI before checking whether a Fulldev component already exists.
- Do not silently restructure a client project into Fulldev architecture without surfacing the migration.

## Workflows

### Standard Change

1. Identify the touched responsibility tier.
2. Load the matching rule files from `rules/`.
3. Inspect nearby implementation and existing naming/composition patterns.
4. Make the smallest coherent change that preserves the project architecture.
5. Use the dev server/logs for feedback when presentation or routing is affected.
6. Run full validation only for release prep, risky structural changes, or when the user asks.

### Add Fulldev UI to a Project

1. Load `cli.md` and `customization.md`.
2. Inspect whether the project already has `components.json`.
3. If needed, initialize shadcn-compatible component installation.
4. Ensure `@fulldev` is configured as a registry.
5. Install requested components with `npx shadcn@latest add @fulldev/<name>`.
6. Read installed files and adapt imports only when the project requires it.

### New or Changed Page Type

1. Load `rules/source-ownership.md`, `rules/layouts.md`, and `rules/validation.md`.
2. Add or update the layout schema in `src/schemas/layouts`.
3. Add it to the union in `src/schemas/page.ts`.
4. Create or update the layout in `src/layouts`.
5. Add or update content under `src/content/pages`.
6. Keep route files unchanged.

### Local Component or Block

1. Check whether an existing `@fulldev` component covers the need.
2. Load `rules/components.md` or `rules/blocks.md`.
3. Keep the API small, semantic, and content-first.
4. Keep content and schema concerns out of reusable components/blocks.
5. Treat the result as local app code unless repo-specific instructions say otherwise.

### Docs or Examples

1. Load the rules for the thing being documented.
2. Treat docs as descriptions of the API, not the source of truth for the API.
3. If docs and implementation disagree, fix the implementation or local contract first.

## Progressive Disclosure

Detailed project doctrine lives in `rules/`. Load only the files relevant to the current change:

- `rules/source-ownership.md` for `src/content`, `src/schemas`, content schemas, icons, and content/code boundaries.
- `rules/layouts.md` for `src/layouts`, `src/components/layout-renderer.astro`, `src/layouts/base.astro`, and `src/pages/[...page].astro`.
- `rules/components.md` for `src/components/ui`, local reusable UI, Fulldev component usage, and Astro component conventions.
- `rules/blocks.md` for `src/components/blocks`, block prop naming, block portability, and layout-to-block mapping.
- `cli.md` for installing Fulldev UI through shadcn-compatible tooling.
- `customization.md` for theming, CSS variables, and component customization.
- `mcp.md` for using shadcn-compatible MCP tooling with the `@fulldev` registry.
- `rules/validation.md` before finishing changes, to choose the right `pnpm` commands.
- `rules/anti-patterns.md` when reviewing architecture, investigating drift, or deciding whether a proposed shortcut violates Fulldev doctrine.

If a change crosses boundaries, load every relevant file. Component installation commonly needs `cli.md`, `customization.md`, `rules/components.md`, and `rules/validation.md`.
