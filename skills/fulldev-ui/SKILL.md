---
name: fulldev-ui
description: Use together with the shadcn skill in projects that use Fulldev UI, the @fulldev registry of Astro components and blocks, or its React extension. Covers installing, presets, theming, customizing and writing blocks where Fulldev UI differs from shadcn/ui. Applies when components.json has an @fulldev registry.
---

# Fulldev UI

Fulldev UI is shadcn/ui for Astro: the same tokens, styles, presets and CLI,
plus content components, such as section, banner, header and typography, and
page blocks. Its React extension adds those extras and blocks to an official
shadcn/ui React project.

The [shadcn skill](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) is
the base: its CLI, registry, theming, DESIGN.md workflow and component rules
apply. This skill covers only where Fulldev UI differs. Every docs page has a
Markdown version: add `.md` to its URL, or start at
[llms.txt](https://ui.full.dev/llms.txt) or, for React,
[react/llms.txt](https://ui.full.dev/react/llms.txt).

## Setup

- Fulldev UI serves only the Base UI styles (`base-vega`, `base-nova` and so
  on) with Lucide icons. Move a legacy style, such as `new-york`, or a `radix-`
  style to a `base-` style first; see
  [Presets](https://ui.full.dev/docs/presets.md).
- The registry is `https://ui.full.dev/r/styles/{style}/{name}.json`. An older
  URL without `{style}` always installs Vega.
- Start a project with
  `init https://ui.full.dev/r/styles/base-<style>/base.json`, not
  `init --preset`. With an existing `components.json`, never run `init`,
  because it replaces the theme tokens: add the registry, then
  `add @fulldev/init`.
- Apply a preset with `apply <preset> --only theme,font`. A full `apply` adds
  `@base-ui/react` and `lucide-react`, which Fulldev UI does not use.
- `@fulldev/components` and `@fulldev/blocks` take the place of `add --all`.
- The page needs `class="@container"` on `body`, because components use
  container-query variants such as `@2xl:`.
- React extension: the official `shadcn init` with a Base UI style and the
  registry `https://ui.full.dev/r/react/styles/{style}/{name}.json`. Standard
  components come from shadcn/ui itself.

## Astro components

Read the installed source for the API. Compared with shadcn/ui React:

- There is no `asChild` or `render`. Components take `as` for the element, and
  `Button` renders a link when it gets `href`.
- Interactive components run on `@data-slot/*` scripts instead of React state.
  Keep their `data-slot` structure and state attributes.
- `class` is merged after the style's classes; other attributes go to the root.
- Content-owned icons are names rendered by `Icon`: Lucide, with Simple Icons
  for brands and social links. Import icons fixed in code from `@lucide/astro`.

## Customize

Try these in order: theme tokens in the stylesheet, a `class` on one instance,
a rule keyed on `data-slot`, `data-variant` or `data-size` for a site-wide
look, and only then an edit to the installed file.
[Theming](https://ui.full.dev/docs/theming.md) lists what styles do not cover
and how to override important or variant classes.

In the DESIGN.md workflow, the steps for tokens, radius, elevation, type scale
and focus apply. Instead of editing `cva` variants, use the order above. Load
fonts the project's way; Fulldev UI loads none. The design system page helpers
are React-only.

## Blocks

A block is a portable section: it takes plain props and imports no project
schemas, content, layouts or routes. Pass images, labels, links, buttons and
content-owned icons as props. Accept `class`, destructure it as
`class: className` and merge it on the root with `cn("", className)`.

Name props by role: `label` for controls, `title` for headings, `description`
for copy, `icon` for icon names, `href` for destinations and `buttons` for
calls to action. Name collections by their content, such as `features` or
`reviews`, and keep `items` for generic data. Button size belongs to the block,
not to its data.
