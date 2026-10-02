# Fulldev UI

## 0.17.2

### Patch Changes

- [#242](https://github.com/fulldotdev/ui/pull/242) [`529d800`](https://github.com/fulldotdev/ui/commit/529d80089783204e6ef3008785f490485c4b943b) Thanks [@silveltman](https://github.com/silveltman)! - Fix the navigation menu popup's closing easing: use Tailwind's `ease-[ease]` instead of the nonexistent `easing-[ease]` utility.

## 0.17.1

### Patch Changes

- [#239](https://github.com/fulldotdev/ui/pull/239) [`037eeeb`](https://github.com/fulldotdev/ui/commit/037eeebd6d16c05c4f4619faa1b3d8522c6527f6) Thanks [@silveltman](https://github.com/silveltman)! - Put `<meta charset>` first in `LayoutHead`, so browsers read it within the first bytes of the page.

## 0.17.0

### Minor Changes

- [#234](https://github.com/fulldotdev/ui/pull/234) [`d5783f6`](https://github.com/fulldotdev/ui/commit/d5783f61e23fcd704cee68ccbd418c5c57a869a8) Thanks [@silveltman](https://github.com/silveltman)! - Support all shadcn/ui styles: vega, nova, maia, lyra, mira, luma, sera, and rhea.
  Components use shadcn/ui `cn-*` style placeholders, and the registry serves every
  style at `https://ui.full.dev/r/styles/{style}/{name}.json`, so components install in
  the style from your `components.json`. `/r/{name}.json` keeps serving vega. The docs
  previews have a style menu, and a new Create page builds shadcn/ui presets
  that apply to all docs previews.

## 0.16.2

### Patch Changes

- [#235](https://github.com/fulldotdev/ui/pull/235) [`b7e997d`](https://github.com/fulldotdev/ui/commit/b7e997defbf1a072cda5ab0eb8b4afac06cce304) Thanks [@silveltman](https://github.com/silveltman)! - - Components import each other through their index, and their own files with `./`. `sheet` now imports `DialogPortal` from `@/components/ui/dialog`, `combobox` from `@/components/ui/input-group`, `toggle-group` from `@/components/ui/toggle`, and `sheet-close` from `@/components/ui/button`. A site's knip then counts every installed part of a used component as used, so it can report components a site does not use.

## 0.16.1

### Patch Changes

- [#231](https://github.com/fulldotdev/ui/pull/231) [`ddf24cc`](https://github.com/fulldotdev/ui/commit/ddf24cc1ecae126f75e8ef8196bf5fc8a443cb9b) Thanks [@silveltman](https://github.com/silveltman)! - - `src/lib/utils.ts` re-exports `cn` from shadcn's `cn` package, which replaces `clsx` and `tailwind-merge`. The `init` item installs `cn` instead of those two. Existing sites keep working; to switch, replace `src/lib/utils.ts` with `export { cn } from "cn"`, add `cn`, and remove `clsx` and `tailwind-merge`.

## 0.16.0

### Minor Changes

- [#225](https://github.com/fulldotdev/ui/pull/225) [`80f1a6e`](https://github.com/fulldotdev/ui/commit/80f1a6eba9a3ebe9c771d9717d8011c88e806523) Thanks [@silveltman](https://github.com/silveltman)! - - `LayoutHead` no longer renders `<Font>` for `--font-sans` and `--font-mono`, so a site no longer has to configure exactly those two fonts in `astro.config`. Without font configuration, text uses Tailwind's system font stack. A site that configures fonts renders `<Font cssVariable="--font-sans" />` (and any others) inside `LayoutHead`, as the Layout docs show. Sites that relied on the old behavior add those two lines.
  - `footer-1`, `footer-2` and `footer-3` render social icons with `Icon`, so any Lucide or Simple Icons name works instead of only `github`, `discord` and `x`. `icon` is optional: without it, `Icon` derives the brand from the link, such as an Instagram or LinkedIn URL.
  - `Icon` with only an `href` falls back to Lucide's `link` icon when the link is not a known brand or the brand has no logo in either icon set, such as LinkedIn, so a link never renders an empty icon.

## 0.15.0

### Minor Changes

- [#222](https://github.com/fulldotdev/ui/pull/222) [`d3f0fd0`](https://github.com/fulldotdev/ui/commit/d3f0fd03eba765ad414f04cabaeac23a33b44ce5) Thanks [@silveltman](https://github.com/silveltman)! - - `astro` (`^7.0.0`) and `tailwindcss` (`^4.1.0`) are now peer dependencies instead of dependencies. Sites that install `fulldev-ui` keep their own Astro and Tailwind, so the package no longer adds a second, older Astro to the site's dependency tree. Sites need Astro 7.
  - The package now depends only on what its shipped files import. Tools for the docs site (`@astrojs/mdx`, `@astrojs/sitemap`, `@tailwindcss/vite`, `astro-favicons`, `astro-live-code`, `astro-robots-txt`, `posthog-js` and `typescript`) are no longer installed with it, and the unused `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` are removed.
  - `src/lib` in the package now contains only `utils.ts`, the file the registry installs. The docs site's own helpers (`integration.ts`, `pages.ts` and the analytics files) are no longer published.
  - The `layout` item now installs `@lexingtonthemes/seo@^0.4.0`, which supports Astro 7. Its code is the same as 0.2.0. The package also requires `@lucide/astro` 1.49.0 or later, because versions before 1.30 do not support Astro 7.
  - `banner-1` and `article-2` add explicit spaces between their inline parts. Astro 7 removes whitespace that spans a line break, which made `banner-1` read "titleDescription" on small screens and `article-2` read "Name· date".

### Patch Changes

- [#223](https://github.com/fulldotdev/ui/pull/223) [`080b948`](https://github.com/fulldotdev/ui/commit/080b948acd1a34911e953c394f86b3daf27ebd0c) Thanks [@silveltman](https://github.com/silveltman)! - Fix invalid HTML and accessibility problems that html-validate and `astro check` report in sites:

  - Brand icons in `footer-1`, `footer-2`, `footer-3`, `doc-1` and `blocks-1` render one `fill` attribute instead of two. The blocks import the SVG files from `simple-icons` instead of the `simple-icons-astro` components, which render `fill` twice, so they now depend on `simple-icons`.
  - `footer-2` and `footer-3` take a `navigationLabel` prop (default `Footer navigation`) that names their link navigation, so it no longer clashes with the header navigation.
  - `NavigationMenu` defaults its `aria-label` to `Main`, as in shadcn/ui.
  - `Pagination` no longer sets the redundant `role="navigation"`, and an `aria-label` you pass replaces the default instead of rendering the attribute twice.
  - `BreadcrumbPage` no longer sets `role="link"` and `aria-disabled` on its text. `aria-current="page"` still marks the current page.
  - `Carousel` renders a `section` instead of a `div` with `role="region"`. With an `aria-label` or `aria-labelledby` it is a named region; without one it gets `role="group"`, so `aria-roledescription="carousel"` stays valid.
  - `ToggleGroup` renders `role="group"` and `ResizableHandle` renders `role="separator"` in the HTML, so an `aria-label` on them is valid before scripts run. Data Slot only added these roles at runtime.
  - `Avatar` and `AvatarFallback` render a `span`, as in shadcn/ui, so an avatar can sit inside a button or link.
  - `Input` and `NativeSelect` render `multiple` as a bare attribute. Astro rendered `multiple="true"`, and `multiple={false}` still turned it on.
  - The `sidebar-1` breadcrumb menu button has the accessible text "Toggle menu".
  - `doc-1` wraps its table of contents in a `div` instead of an unnamed `aside`, so it no longer clashes with other complementary landmarks such as `Banner`.
  - `SidebarMenuButton` and `SidebarMenuSubButton` have typed props again. Astro's compiler did not find their `Props` type, so the props were untyped and `astro check --minimumFailingSeverity hint` reported `Props` as unused.
  - `Command` tracks IME composition with `compositionstart` and `compositionend` instead of the deprecated `keyCode`, and still ignores the Enter that confirms a composition, including in Safari.
  - The Switch, Radio Group, Checkbox and Field docs label controls by wrapping them in `Label` and use only inline content inside labels. `Switch` and `RadioGroupItem` render a `span`, which `Label for` cannot point to.
  - `reviews-3` names its carousel with the block title.

## 0.14.5

### Patch Changes

- [#220](https://github.com/fulldotdev/ui/pull/220) [`8e5cd62`](https://github.com/fulldotdev/ui/commit/8e5cd628da654314821ea61841f82e71e36afdff) Thanks [@silveltman](https://github.com/silveltman)! - - Header blocks take `navigationLabel` and `menu` (`label`, `title`, `description`) props for their accessible names, so sites in other languages no longer ship English screen-reader labels. The defaults are the previous English text. The desktop navigation is now named, and the mobile navigation uses the menu title, so the two landmarks have distinct names.
  - `Checkbox` no longer sets the redundant `role="checkbox"` on its native checkbox input.
  - `Label` and `sidebar-1` document why they are exempt from one accessibility lint rule each, so projects that lint installed copies with `eslint-plugin-astro` pass.

## 0.14.4

### Patch Changes

- [#217](https://github.com/fulldotdev/ui/pull/217) [`38c30ba`](https://github.com/fulldotdev/ui/commit/38c30ba1e3c600fdfc33f1d11e70d7943de7393e) Thanks [@silveltman](https://github.com/silveltman)! - Fix registry items so the shadcn CLI installs them exactly as published:

  - `field`, `avatar`, `alert` and `item` now ship every file their `index.ts` exports: `FieldError`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`, `AlertAction`, `ItemHeader`, `ItemFooter` and `ItemSeparator`. `item` now depends on `separator`.
  - Blocks that render `Icon` now depend on `@fulldev/icon`, and blocks that imported it without using it no longer do.
  - The block placeholder image is now `src/assets/placeholder.svg`. Registry JSON can only carry UTF-8 text, so the previous WebP placeholder arrived corrupted.
  - `typeset.css` no longer starts with a comment. The shadcn CLI drops leading comments on install, so the installed file now matches the registry content.
  - `Label`, `Separator` and `SectionContainer` take a `data-slot` override instead of rendering the attribute twice, so wrappers such as `FieldLabel`, `ItemSeparator` and `ButtonGroupSeparator` render valid HTML with their own slot.
  - Hero block images use `fetchpriority="high"`, a hint that the browser should fetch them early because they are usually the largest image on the page.
  - The `page` registry item is removed. It installed the docs site's own route, which depends on files outside the registry and broke the build.

## 0.14.3

### Patch Changes

- [#215](https://github.com/fulldotdev/ui/pull/215) [`b87b9e1`](https://github.com/fulldotdev/ui/commit/b87b9e113f14453f9fd349555ee3654679457dc9) Thanks [@silveltman](https://github.com/silveltman)! - Pause the `Marquee` animation when the visitor prefers reduced motion, and keep a `disabled` value passed to `CarouselPrevious` or `CarouselNext` instead of overwriting it when the carousel scrolls.

## 0.14.2

### Patch Changes

- [#213](https://github.com/fulldotdev/ui/pull/213) [`1304c8b`](https://github.com/fulldotdev/ui/commit/1304c8b49e14a6f4cf3576433014ecf396019913) Thanks [@silveltman](https://github.com/silveltman)! - Improve the `LayoutHead` social tags: add `twitter:card` (`summary_large_image` with an image, `summary` without), emit `og:image:type` for optimized images, skip `og:image` when the image source is empty, and follow `trailingSlash: "never"` in the canonical and `og:url`.

## 0.14.1

### Patch Changes

- [#202](https://github.com/fulldotdev/ui/pull/202) [`30b1949`](https://github.com/fulldotdev/ui/commit/30b19499edf55ba3ae15490562334f50476f21c0) Thanks [@silveltman](https://github.com/silveltman)! - Match Navigation Menu trigger styling and chevron rotation to Data Slot's data-state attribute, while retaining compatibility with data-open and data-popup-open.

## 0.14.0

### Minor Changes

- [#200](https://github.com/fulldotdev/ui/pull/200) [`cc38ebd`](https://github.com/fulldotdev/ui/commit/cc38ebd7cd6e00f12ed1be5cd32028e55ef48bd8) Thanks [@silveltman](https://github.com/silveltman)! - Restore the Embla-powered Carousel and shadcn-style composition, responsive slide widths and `opts` API. Use the vanilla `embla-carousel` 8.6.0 package without React. Other interactive components continue to use Data Slot directly.

  This replaces the single-slide Carousel introduced in 0.13.0. Reinstall the registry component. Replace `defaultIndex`, `drag` and `loop` with `opts={{ startIndex, watchDrag, loop }}`; dragging is enabled by default. Restore `CarouselApi`, `CarouselOptions` and `CarouselPlugin` types and `carousel:init` / `carousel:select` events. Listen to their `detail.api` for programmatic navigation instead of `carousel:set`. `CarouselContent` classes apply to the inner track again; use matching negative track margins and slide padding for spacing.

  Visible slide links stay interactive, and Embla handles focus scrolling, resizing and slide positions. Instances and event handlers are cleaned up before Astro page swaps. No observers override another library's accessibility state.

## 0.13.0

### Minor Changes

- [#197](https://github.com/fulldotdev/ui/pull/197) [`9ca89fb`](https://github.com/fulldotdev/ui/commit/9ca89fbb09bcf99fb380b9ddc6f1637759bd7a2d) Thanks [@silveltman](https://github.com/silveltman)! - Complete Data Slot component coverage with Drawer, Toast, Toggle Group and Resizable, and upgrade all Data Slot packages to 1.0.2. Add Attachment, Button Group, Pagination and Aspect Ratio as Astro components without their own client scripts.

  Replace the Embla Carousel with Data Slot's native scrolling carousel. This is a breaking change: replace `opts` with `defaultIndex`, `orientation`, `drag` and `loop`; use `CarouselController` and `CarouselOptions` instead of Embla types; replace `carousel:init` and `carousel:select` with `carousel:change` and `carousel:set`. Carousel now displays one full-width slide at a time. Remove fractional slide widths and the old content/item spacing pattern. Examples and the reviews block use the new API.

  Adopt shadcn Typeset for rendered prose while preserving the existing Typography component exports. Typography sizes now control the prose rhythm, with updated heading spacing, nested content styling and semantic tables. Keep docs-specific code controls out of installable Typography styles.

  Improve Combobox trigger and clear focus styling, align Select popper placement and Slider thumb positioning with shadcn, and use a consistent 8px default Navigation Menu gap.

## 0.12.0

### Minor Changes

- [#195](https://github.com/fulldotdev/ui/pull/195) [`74fcc47`](https://github.com/fulldotdev/ui/commit/74fcc47a2ba855729c15ffb163af7c60beeeae78) Thanks [@silveltman](https://github.com/silveltman)! - Upgrade all Data Slot primitives and registry dependencies to 1.0.1. Use recommended
  lazy mounting for Select, Tooltip, Hover Card and Navigation Menu, with an explicit
  mountStrategy="eager" opt-in for integrations that query closed content. Discover nested
  comboboxes and hover cards in retained content without duplicate initialization.

  Release outgoing controllers on Astro page swaps so open overlays cannot leave stale
  modal stacks or scroll locks. Give CommandDialog a trigger slot and correct the
  sidebar search composition for strict nested ownership.

  Use native autofocus for command palettes and native link activation for keyboard
  commands. Align Slider defaults and Tabs values with the upstream API, and make
  block dropdown links actual accessible menu items.

  Use shadcn button defaults and consistent overlay layers so nested popups receive
  pointer input. Form submissions should explicitly set type="submit".

  Keep Data Slot modal stack layers and place floating positioners above them so
  Select and other popups remain clickable inside dialogs.

## 0.11.1

### Patch Changes

- [#190](https://github.com/fulldotdev/ui/pull/190) [`a7b9580`](https://github.com/fulldotdev/ui/commit/a7b9580c416a72abb4d09b721d2cba917c806f1b) Thanks [@silveltman](https://github.com/silveltman)! - Fix repeated banner initialization, render informational contact icons without inactive buttons, and improve narrow documentation headers and prose link contrast.

## 0.11.0

### Minor Changes

- [`4b0ccf6`](https://github.com/fulldotdev/ui/commit/4b0ccf6a70b0fd38e750755a1e9416e42e967352) Thanks [@silveltman](https://github.com/silveltman)! - Restore portable registry setup and complete component and block bundles. Add functional contact forms, mobile header links and slots, section heading primitives, HTML attribute forwarding, explicit icon sources, and Astro navigation reinitialization while preserving the latest component APIs. Add registry metadata and Markdown documentation indexes for agents.

## 0.10.1

### Patch Changes

- [#184](https://github.com/fulldotdev/ui/pull/184) [`b4c6557`](https://github.com/fulldotdev/ui/commit/b4c6557df695a167c5ecb38761f65f809bdca918) Thanks [@silveltman](https://github.com/silveltman)! - Prevent navigation and inactive panels flashing before initialization. Correct Sidebar slot composition and state synchronization, use Data Slot's native Sheet scroll locking, align modal stack styles, and fix controlled HoverCard initialization, string range sliders and initial control states. Align Combobox examples with the documented list structure.

## 0.10.0

### Minor Changes

- [#182](https://github.com/fulldotdev/ui/pull/182) [`751434e`](https://github.com/fulldotdev/ui/commit/751434ed8557b7b5e9250fcc4774eec7661e0ce6) Thanks [@silveltman](https://github.com/silveltman)! - Refresh existing Astro components against current data-slot wrappers and shadcn/ui Base UI Vega, including updated behavior, styling, public props, and registry dependencies.

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
