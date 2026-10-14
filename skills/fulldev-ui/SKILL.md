---
name: fulldev-ui
description: Use together with the shadcn skill in projects that use Fulldev UI, the @fulldev registry of Astro components and blocks, or its React extension. Covers installing, presets, theming, customizing and writing blocks where Fulldev UI differs from shadcn/ui. Applies when components.json has an @fulldev registry.
---

# Fulldev UI

Fulldev UI is shadcn/ui for Astro: the same tokens, styles, presets and CLI,
plus content components, such as section, banner, header and typography, and
page blocks. Its React extension adds those extras and blocks to an official
shadcn/ui React project.

Use the [shadcn skill](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn)
for the CLI, registries, semantic tokens and design principles. For Astro
component APIs, read the installed source and the docs at
`https://ui.full.dev/components/<name>.md`; `shadcn docs` describes the React
components. Start at [llms.txt](https://ui.full.dev/llms.txt), or
[react/llms.txt](https://ui.full.dev/react/llms.txt) for React. Where this skill
and the shadcn skill differ, this skill wins.

## Astro setup

- Fulldev UI serves only the Base UI styles (`base-vega`, `base-nova` and so
  on) with Lucide icons. Move a legacy style, such as `new-york`, or a `radix-`
  style to a `base-` style first; see
  [Presets](https://ui.full.dev/docs/presets.md).
- The registry is `https://ui.full.dev/r/styles/{style}/{name}.json`. An older
  URL without `{style}` always installs Vega.
- Start a project with
  `init https://ui.full.dev/r/styles/base-<style>/base.json` in the preset's
  style, not `init --preset`, then `apply <preset> --only theme,font`. With an
  existing `components.json`, never run `init`, because it replaces the theme
  tokens: add the registry, then `add @fulldev/init`.
- A full `apply` adds `@base-ui/react` and `lucide-react`, which Fulldev UI
  does not use.
- The shadcn CLI applies the preset's menu color (`menuColor`) to React
  components only, so Astro menus, selects and comboboxes install with the
  default menu color. The menu accent works, because it is a theme variable.
- `@fulldev/components` and `@fulldev/blocks` take the place of `add --all`.
- Components use container-query variants such as `@2xl:`, so page content
  needs an `@container` ancestor, such as `LayoutMain` or `body`.

## Astro components

- There is no `asChild` or `render`. Components that can change element, such
  as `Button`, `Card` and `Typography`, take `as`, and `Button` renders a link
  when it gets `href`.
- Interactive components run on `@data-slot/*` scripts. Keep their `data-slot`
  structure and state attributes.
- `class` is merged after the style's classes; other attributes go to the root.
- Content-owned icons are names rendered by `Icon`: Lucide, with Simple Icons
  for brands and social links. Import icons fixed in code from
  `@lucide/astro/icons/<name>`.

## Astro customization

Use built-in variants and size props first. A `class` on one instance is for
layout, as in shadcn/ui. To change the look, edit the theme tokens in the
stylesheet, then add a rule keyed on `data-slot`, `data-variant` or
`data-size`, and only then edit the installed file.
[Theming](https://ui.full.dev/docs/theming.md) lists what styles do not cover
and how to override important or variant classes.

In the DESIGN.md workflow, the steps for tokens, radius, elevation, type scale
and the focus outline apply. Make variant and focus-ring changes in the order
above instead of editing `cva` variants or component classes. Presets load
fonts from Fontsource; in a project that loads fonts another way, such as
Astro's font config, keep one. The design system page helpers are React-only.

## React extension

Set up the project with the official `shadcn init` and a Base UI style, then
add the registry `https://ui.full.dev/r/react/styles/{style}/{name}.json`.
Standard components, their APIs and customization follow the shadcn skill.
Fulldev extras and blocks use `className` and their documented React props.

## Blocks

A block is a portable section: it takes plain props and imports no project
schemas, content, layouts or routes. Pass images, labels, links, buttons and
content-owned icons as props. Forward `class` in Astro and `className` in
React, merged on the root with `cn()`.

Name props by role: `label` for controls, `title` for headings, `description`
for copy, `icon` for icon names, `href` for destinations and `buttons` for
calls to action. Name collections by their content, such as `features` or
`reviews`, and keep `items` for generic data. Button size belongs to the block,
not to its data.
