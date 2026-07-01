# Fulldev UI

## 0.9.3

### Patch Changes

- [`e641911`](https://github.com/fulldotdev/ui/commit/e64191143efe448a46999d63ca7ed6d8bd320d1e) Thanks [@silveltman](https://github.com/silveltman)! - Add the gradient component to the registry, keep Lucide icons unfilled, and fix marquee spacing during looping animations.

## 0.9.2

### Patch Changes

- [`c052c13`](https://github.com/fulldotdev/ui/commit/c052c13c356bae933ffd838de1a95a0af7e97e21) Thanks [@silveltman](https://github.com/silveltman)! - Add active navigation item support to the Header 1 block.

- [`49e1bfc`](https://github.com/fulldotdev/ui/commit/49e1bfc3d1bbb7a6cb126094385704fdcc0a49d6) Thanks [@silveltman](https://github.com/silveltman)! - Update registry build and styling dependencies.

## 0.9.1

### Patch Changes

- [#178](https://github.com/fulldotdev/ui/pull/178) [`e2c8f47`](https://github.com/fulldotdev/ui/commit/e2c8f476f3333d09eb21ff4fa251d84326664be3) Thanks [@silveltman](https://github.com/silveltman)! - Fix vertical alignment in the header block.

## 0.9.0

### Minor Changes

- [#174](https://github.com/fulldotdev/ui/pull/174) [`adc3a73`](https://github.com/fulldotdev/ui/commit/adc3a738efedda93a9092538f751671480dca832) Thanks [@silveltman](https://github.com/silveltman)! - Release Fulldev UI 0.9.0.

  This is a full registry, docs, and reference-site reset. The registry now uses
  portable Astro source, shadcn-style component contracts, data-slot primitives,
  Tailwind CSS 4 tokens, and agent-readable docs.

  0.9 is a pre-1.0 minor release, but it includes breaking changes from 0.8.3.

  ## Breaking Changes
  - Replaced the old Starlight docs site with a custom Astro reference site.
  - Moved docs content from `src/content/docs/docs` and YAML layouts into
    `src/content/pages`, `src/content/globals`, `src/schemas`, and layouts.
  - Removed registry entries: `auto-form`, `block`, `content-5`, `content-6`,
    `footer`, `image`, `list`, `native-carousel`, `page`, `pricings-1`,
    `pricings-2`, and `pricings-3`.
  - Renamed `pricings-*` block entries to `pricing-*`.
  - Replaced `native-carousel` with the new Embla-based `carousel`.
  - Removed old standalone footer, image, and list UI items.
  - Reworked many component exports and subcomponents, including banner, section,
    sidebar, tile, navigation menu, tabs, sheet, dialog, command, and form items.
  - Removed legacy Starlight wiring, YAML layout content, old generated assets,
    old source examples, old issue templates, `ROADMAP.md`, `site.json`, and the
    old ESLint/Vitest validation path.
  - Standardized the repo on pnpm, Node 24.15.0, Astro 6, shadcn 4, Tailwind CSS
    4.3, TypeScript 6, and the current data-slot package set.

  ## Registry
  - Rebuilt the active registry to 140 entries: 55 UI items, 82 blocks, 1 base
    `init` item, and 2 indexes.
  - Added `init` with installable Tailwind CSS 4 theme tokens, light/dark colors,
    sidebar tokens, radius tokens, and shadow tokens.
  - Added UI items: `alert-dialog`, `breadcrumb`, `card`, `carousel`,
    `combobox`, `command`, `dialog`, `dropdown-menu`, `form`, `hover-card`,
    `input-group`, `kbd`, `popover`, `select`, `slider`, `switch`, `toc`,
    `toggle`, `tooltip`, and `typography`.
  - Added block items: `blocks-1`, `doc-1`, `footer-3`, `header-4`, `header-5`,
    `links-2`, `pricing-1`, `pricing-2`, `pricing-3`, and `sidebar-1`.
  - Updated nearly every existing block item to match the installable source.
  - Updated core UI items, including `accordion`, `alert`, `avatar`, `banner`,
    `collapsible`, `field`, `header`, `item`, `layout`, `logo`, `marquee`,
    `native-select`, `navigation-menu`, `price`, `radio-group`, `rating`,
    `section`, `sheet`, `sidebar`, `spinner`, `tabs`, and `tile`.
  - Updated the `blocks` and `components` indexes.
  - Refreshed generated `public/r` output.
  - Added registry dependencies for the new shadcn-style item graph.
  - Added installable dependencies such as the data-slot packages,
    `embla-carousel`, `class-variance-authority`, `clsx`, `tailwind-merge`, and
    `@lexingtonthemes/seo`.

  ## Components
  - Added data-slot-backed Astro primitives for dialogs, menus, popovers,
    tooltips, comboboxes, selects, sliders, switches, toggles, accordions,
    collapsibles, navigation menus, radio groups, tabs, commands, and sheets.
  - Added Embla-based `Carousel`.
  - Added shadcn-style `Sidebar` parity components.
  - Added `Typography`, `InputGroup`, `Kbd`, `Toc`, `Card`, `Breadcrumb`, and
    `Form` support.
  - Rebuilt `Layout` into `Layout`, `LayoutHead`, `LayoutBody`, and `LayoutMain`.
  - Reworked `Banner`, `Section`, `Tile`, `Item`, and `Button`.
  - Rebuilt `Sheet`, `Dialog`, `Command`, `NavigationMenu`, `RadioGroup`,
    `Tabs`, `Accordion`, and `Collapsible` for data-slot behavior.
  - Centralized configurable icon names through `Icon`.
  - Improved `Price` range formatting.
  - Expanded `Marquee` with duration, gap, infinite, hover pause, vertical
    direction, style pass-through, and optional duplicate rendering.
  - Updated `Video` to use youtube-nocookie embeds, lazy loading, strict referrer
    policy, configurable titles, and thumbnail-backed `srcdoc` playback.
  - Disabled transitions during theme switching.

  ## Blocks
  - Rebuilt the block catalog around portable props, slots, installable
    dependencies, and registry-safe media inputs.
  - Updated article, articles, banner, contact, content, CTA, FAQ, features,
    footer, header, hero, logo, product, products, reviews, and services blocks.
  - Added `doc-1` for docs pages with Markdown copy, external Markdown/chat
    links, TOC, callouts, and pagination.
  - Added `blocks-1` for block docs pages with copy actions, external links, and
    pagination.
  - Added `sidebar-1` as the reference docs shell with sidebar navigation,
    breadcrumbs, command-dialog search, shortcuts, and theme controls.
  - Added `header-4`, `header-5`, `footer-3`, `links-2`, `pricing-1`,
    `pricing-2`, and `pricing-3`.
  - Removed obsolete block variants that are no longer in the active registry.
  - Fixed product and review block spacing, image aspect utilities, and long quote
    wrapping.

  ## Documentation
  - Rebuilt the docs site as a Fulldev reference implementation.
  - Added 57 component docs pages and 100 block docs pages.
  - Added docs for introduction, installation, init, theming, dark mode, CLI, MCP,
    skills, layouts, components, and blocks.
  - Added individual pages for every active block variant.
  - Added overview pages for `/docs/`, `/components/`, and `/blocks/`.
  - Added docs experiences with copy Markdown, Markdown/chat links, TOC, callouts,
    and pagination.
  - Added redirects from old `/docs/components/*` URLs to `/components/*`.
  - Added redirects from old `pricings` URLs to `pricing`.
  - Removed unsupported RTL docs.
  - Updated homepage, examples, and installation guidance.

  ## Agent Docs and Architecture
  - Added `/index.md` as an AI-agent entry point.
  - Added Markdown output for every content page.
  - Added `/sitemap.md` with Markdown links for all pages.
  - Added local Fulldev and shadcn agent skills.
  - Added `LayoutRenderer`, thin routes, page schemas, global schema, page
    helpers, and base/home/overview/doc/block layouts.
  - Added a Fulldev Astro integration wrapper for Tailwind, favicons, robots,
    sitemap, i18n, image defaults, and prefetch behavior.
  - Added new logos, contributor avatars, favicon, and optimized author avatar.

  ## Tooling and Release Workflow
  - Added Changesets config and this release entry.
  - Added GitHub release PR automation with `changesets/action`.
  - Added CI for changeset status, formatting, type checking, registry drift, and
    build validation.
  - Added scripts for typecheck, formatting, registry checks, release, and
    publishing.
  - Updated dev and preview scripts for the project-owned `127.0.0.1:4321`
    server.
  - Added local Codex dev, preview, and stop actions.
  - Updated README, changelog baseline, contributor workflow, package metadata,
    lockfile, formatting config, and registry workflow docs.

See [GitHub Releases](https://github.com/fulldotdev/ui/releases) for previous releases.

## 0.8.3

Baseline registry version before Changesets-managed Fulldev UI releases.

## 0.8.0 - 2026-03-03

- Stabilized and aligned core primitives with shadcn-style APIs and `data-slot` usage.
- Added quality infrastructure: CI workflow, linting, Vitest, and registry drift checks.
- Added card and multiple API-consistency improvements across UI components and docs.
- Fixed release blockers in docs and registry packaging integrity.
