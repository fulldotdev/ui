---
name: fulldev
description: Guides Fulldev client projects using Astro, Fulldev UI, content/schema/layout architecture, reusable components, blocks, theming, and shadcn-compatible Fulldev registry installs. Use when working in Fulldev client projects, installing or composing @fulldev components, shaping content-driven Astro pages, or deciding where project responsibilities belong.
---

# Fulldev

Fulldev projects are content-driven Astro sites that use Fulldev UI components
and blocks through the shadcn-compatible `@fulldev` registry.

This skill is for using Fulldev in client projects. If the current repository
has its own `AGENTS.md`, contributing guide, or project instructions, those
local instructions own repo-specific workflow.

If you encounter problems with Fulldev UI, discover missing guidance, or see
reusable improvements while using this skill, ask the user whether the agent should
create a pull request for the Fulldev UI library so the improvement can be
shared back with future contributors and agents. Use the Fulldev UI
contributing guide for that workflow:
https://github.com/fulldotdev/ui/blob/main/CONTRIBUTING.md

## Project Model

Preferred page flow:

```text
content frontmatter/body -> schema validation -> layout orchestration -> components/blocks
```

Content owns authored copy and semantic configuration. Schemas own contracts.
Layouts own page orchestration. Components and blocks own DOM, behavior,
accessibility, styling, and implementation details.

Inspect the current project before enforcing conventions. Fulldev architecture
is the target for client projects, but do not silently migrate an existing
different architecture.

## Core Rules

- Routes stay thin and hand work to generic rendering or layouts.
- Shared base layouts stay shell-only.
- Page orchestration belongs in layouts.
- Content must not contain raw Astro components, imported icons, SVG/HTML,
  Tailwind class strings, or DOM details.
- Content-owned icons are plain names rendered through a project icon component.
- Globals are for cross-page site data, not page-specific block data.
- Components and blocks receive data through props and slots.
- Reusable blocks stay schema-agnostic and do not import content collections,
  page schemas, layouts, routes, or other private page architecture.

## Fulldev UI Usage

Install Fulldev UI through shadcn-compatible tooling. Do not invent a `fulldev`
CLI command unless the project actually provides one.

Use the project package runner equivalent of:

```bash
npx shadcn@latest add @fulldev/<name>
```

Prefer existing `@fulldev` components and blocks before creating local reusable
UI or complete page sections. Read installed source when behavior or API is
unclear.

## Components

Reusable UI components commonly live in `src/components/ui/<component-name>/`,
unless the project has a different established convention.

For Astro component frontmatter:

- Use `type Props`.
- Destructure `Astro.props` once near the top.
- Destructure `class` as `class: className`.
- Name pass-through props `props`.
- Merge classes with the project's class helper, commonly `cn(...)`.
- Keep content-specific data out of generic UI primitives.

Local components are application code unless repo-specific instructions say
otherwise.

## Blocks

Blocks commonly live in `src/components/blocks`, unless the project has a
different established convention.

Blocks are production-leaning compositions for content-driven pages. They should
receive project-specific data through props and slots while layouts map
schema-backed content into those props.

Block conventions:

- Expose `class?: string` and apply it to the root.
- Keep prop types plain and local.
- Use semantic prop names such as `title`, `description`, `buttons`,
  `features`, `services`, `reviews`, `href`, and `icon`.
- Avoid generic collection names like `items`, `entries`, `cards`, or `actions`
  unless the block is genuinely generic.
- Button data should not include size when size is a block design decision.
- Images, links, labels, CTAs, and content-owned icons that vary by project,
  page, block instance, or locale should come through props.

## Customization

Customize theme variables and component variants before editing installed
component source. Use local wrappers or compositions when behavior is
project-specific.

Prefer semantic CSS variables over one-off style overrides. Keep customization
at the lowest level that owns the decision: theme tokens for global look,
variants for component behavior, layouts for page orchestration, and local
wrappers for project-specific composition.

## Validation

Use the project's package manager and local instructions. Keep development
feedback fast:

- Start or reuse the dev server when presentation, routing, or content changed.
- Read dev server logs occasionally.
- Format touched files when a change is settled.
- Do not run full checks or builds after every small edit.
- Run focused validation for contract changes and broader validation only when
  requested or when the change is risky.

## Workflows

### Standard Change

1. Identify the touched responsibility tier.
2. Inspect nearby implementation and naming/composition patterns.
3. Make the smallest coherent change that preserves project architecture.
4. Use the dev server and logs for feedback when presentation or routing is
   affected.
5. Run only the relevant validation subset unless final validation is requested.

### Add Fulldev UI to a Project

1. Inspect whether the project already has shadcn-compatible configuration.
2. If needed, initialize shadcn-compatible component installation.
3. Ensure `@fulldev` is configured as a registry.
4. Install requested components or blocks with shadcn-compatible tooling.
5. Read installed files and adapt imports only when the project requires it.

### New or Changed Page Type

1. Update the layout schema.
2. Add it to the page schema union if the project uses one.
3. Create or update the layout.
4. Add or update content.
5. Keep route files thin.

### Local Component or Block

1. Check whether an existing `@fulldev` component or block covers the need.
2. Keep the API small, semantic, and content-first.
3. Keep content and schema concerns out of reusable components/blocks.
4. Treat the result as local application code unless repo-specific instructions
   say otherwise.

### Docs or Examples

Treat docs as descriptions of the API, not the source of truth for the API. If
docs and implementation disagree, fix the implementation or local contract
first.

## Progressive Disclosure

When this skill package includes detailed rule files, load only the files
relevant to the current change:

- `rules/source-ownership.md` for `src/content`, `src/schemas`, content schemas,
  icons, and content/code boundaries.
- `rules/layouts.md` for `src/layouts`, generic layout renderers, base layouts,
  and route boundaries.
- `rules/components.md` for reusable UI components and Astro component
  conventions.
- `rules/blocks.md` for block prop naming, portability, and layout-to-block
  mapping.
- `cli.md` for installing Fulldev UI through shadcn-compatible tooling.
- `customization.md` for theming, CSS variables, and component customization.
- `mcp.md` for using shadcn-compatible MCP tooling with the `@fulldev`
  registry.
- `rules/validation.md` before finishing changes, to choose validation commands.
- `rules/anti-patterns.md` when reviewing architecture or investigating drift.

The core guidance above must stand on its own because a new project may not yet
have any of these files.
