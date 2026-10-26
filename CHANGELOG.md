# Fulldev UI

## 0.26.0

### Minor Changes

- [#328](https://github.com/fulldotdev/ui/pull/328) [`53e43a0`](https://github.com/fulldotdev/ui/commit/53e43a065b6ca055134f1af599ddedfe9f40a2e3) Thanks [@silveltman](https://github.com/silveltman)! - Add an optional Image component with Astro Picture formats, responsive sources and an unchanged single-image default.

- [#334](https://github.com/fulldotdev/ui/pull/334) [`6ed056f`](https://github.com/fulldotdev/ui/commit/6ed056f4fd4fa9d1f5674cf19d3c0bc835c1e862) Thanks [@silveltman](https://github.com/silveltman)! - Data Slot components start with their page script, with no loading helper. Dialog, Sheet and NavigationMenu no longer load their controller per media query: `media` is still accepted but has no effect, and the registry no longer has the `on-media` item or `src/lib/dialog.ts`; a site that installed them can delete `src/lib/on-media.ts` and `src/lib/dialog.ts` once nothing imports them. Header blocks 1 to 5 take `fold="lg"`, the default, or `fold="xl"` for the breakpoint between their mobile sheet and desktop navigation, and close whichever one the layout hides at that breakpoint, which also releases the sheet's scroll lock. Every Data Slot component also binds new roots on `astro:after-swap`, so a site's own `astro:page-load` command after ClientRouter navigation reaches a started controller.

## 0.25.5

### Patch Changes

- [#325](https://github.com/fulldotdev/ui/pull/325) [`57e3ff2`](https://github.com/fulldotdev/ui/commit/57e3ff25f89ea0e97f47725d62bf36c92c72246e) Thanks [@silveltman](https://github.com/silveltman)! - Import each icon in the Content, CTA, Hero and Pricing blocks from its own path, so a page loads only the icons it uses instead of all of Lucide.

- [#323](https://github.com/fulldotdev/ui/pull/323) [`cec3667`](https://github.com/fulldotdev/ui/commit/cec3667f28590b0beedd9100b8b0573abf865fac) Thanks [@silveltman](https://github.com/silveltman)! - Serve AVIF images with WebP fallbacks in Hero1, Article1 and Articles1, preserving responsive sizes and image priority.

## 0.25.4

### Patch Changes

- [#316](https://github.com/fulldotdev/ui/pull/316) [`e762ff5`](https://github.com/fulldotdev/ui/commit/e762ff5444501872edd2bc8fcdce06da4a51b87c) Thanks [@silveltman](https://github.com/silveltman)! - Links stay readable in dark mode with a colored theme. shadcn/ui's dark themes use the primary as a button fill, so links in the primary color fell below the 4.5:1 WCAG AA asks for with 15 of the 17 shadcn/ui theme colors, orange to 2.7:1. In dark mode `TypographyA` (Astro and React), the link variant of `Button` and `Badge`, and the native Liquid typography link, link button and link badge now use a lighter step of the primary, `oklch(from var(--primary) max(l, 0.7) calc(c * 1.2) h)`: at least 5.8:1 with every shadcn/ui theme color. Light mode, neutral themes and primary fills, such as buttons, checkboxes and switches, stay as they were. Browsers without relative color support keep the primary. A text color passed to the component, such as `text-muted-foreground`, still wins in dark mode.

## 0.25.3

### Patch Changes

- [#311](https://github.com/fulldotdev/ui/pull/311) [`d622fe2`](https://github.com/fulldotdev/ui/commit/d622fe2245b35dd9659f52865347e8fb18505730) Thanks [@silveltman](https://github.com/silveltman)! - Error and destructive text use the full destructive color, as shadcn/ui's `FieldError` does. `AttachmentDescription` in an attachment with an error was at 80%, about 4.1:1 in light mode and 4.3:1 in dark mode, and the description of a destructive `Alert` at 90%, in Astro and native Liquid, below the 4.5:1 WCAG AA asks for. The destructive `Button` mixes a fifth of the foreground into its text, because the destructive color on the button's own tint is about 3.9:1. The native Liquid button already mixed in the foreground; it now uses the same mix, in oklab, which keeps the text red in dark mode instead of orange. `AttachmentTitle` shimmers while an attachment uploads or processes, as in shadcn/ui, instead of pulsing to half opacity, where the name fell to about 3.7:1; the shimmer comes from `shadcn/tailwind.css`, so update the `shadcn` package if the name stays still. The attachment demo's `AttachmentGroup` takes keyboard focus, so it can be scrolled without a pointer, and the Typography docs now say that a `typeset-scroll` wrapper needs `tabindex="0"` for the same reason.

## 0.25.2

### Patch Changes

- [#305](https://github.com/fulldotdev/ui/pull/305) [`18063bb`](https://github.com/fulldotdev/ui/commit/18063bb16e6e2d2329ed2dfae85200ae5876a748) Thanks [@silveltman](https://github.com/silveltman)! - Select triggers show their text in the server-rendered HTML: an empty `SelectValue` gets the label of the `defaultValue` item, or the `placeholder`, the text Data Slot shows when it starts. Before, the trigger stayed empty, and had no accessible name, until the select script ran. `ComboboxTrigger` is named "Toggle" in the HTML, the name Data Slot gives it. Icon-only buttons in the button, collapsible, combobox, input group, item and tooltip examples have an accessible name.

- [#305](https://github.com/fulldotdev/ui/pull/305) [`18063bb`](https://github.com/fulldotdev/ui/commit/18063bb16e6e2d2329ed2dfae85200ae5876a748) Thanks [@silveltman](https://github.com/silveltman)! - Tabs show their initial panel in the server-rendered HTML, the one Data Slot selects: the `defaultValue` when its trigger is enabled, or else the first enabled trigger. Before, every panel stayed hidden until the tabs script started, so the page shifted when it did; it also works without JavaScript now.

## 0.25.1

### Patch Changes

- [#301](https://github.com/fulldotdev/ui/pull/301) [`205d053`](https://github.com/fulldotdev/ui/commit/205d053bf1b3552349fae6a179c219f3a174e527) Thanks [@silveltman](https://github.com/silveltman)! - The native Liquid data-slot controllers are now copied from the data-slot npm packages when the registry is built. The files do not change; `assets/ui-licenses.json` now names data-slot 1.1.2, the version they come from, and the installation docs require data-slot 1.1.2 or newer, the version the registry installs.

- [#302](https://github.com/fulldotdev/ui/pull/302) [`a69c425`](https://github.com/fulldotdev/ui/commit/a69c425b99c46158d3a2774dba0f60ebbeed8f25) Thanks [@silveltman](https://github.com/silveltman)! - The registry no longer keeps a second copy of the vega style at `public/r/{name}.json`. ui.full.dev keeps serving those URLs, used by installs from before 0.17, from `public/r/styles/base-vega/`. In the npm package, use `public/r/styles/base-vega/` instead.

## 0.25.0

### Minor Changes

- [#296](https://github.com/fulldotdev/ui/pull/296) [`6c14ec6`](https://github.com/fulldotdev/ui/commit/6c14ec6fd902a76733d450af84fad26d8339f163) Thanks [@silveltman](https://github.com/silveltman)! - The npm package now holds only the registry of each release: the files served at `https://ui.full.dev/r`, now including React, and the native Liquid files at their theme paths. It no longer installs dependencies or peer dependencies, and no longer ships the unstyled component sources, which need the registry build for their styles. Install components with the shadcn CLI as before.

### Patch Changes

- [#299](https://github.com/fulldotdev/ui/pull/299) [`ebca5f0`](https://github.com/fulldotdev/ui/commit/ebca5f026bcfe1626ecbd53cb88368537a95a047) Thanks [@silveltman](https://github.com/silveltman)! - Native Liquid registry items now link to their docs page and take their title and description from it, like the Astro items.

## 0.24.1

### Patch Changes

- [#292](https://github.com/fulldotdev/ui/pull/292) [`8f36a67`](https://github.com/fulldotdev/ui/commit/8f36a67fafb6c85a958fb37cd61782c39ab139b1) Thanks [@silveltman](https://github.com/silveltman)! - `Toast` renders its viewport as a `section` and each toast as a `div`, like the native Liquid toast. The `region` role the toast script gives the viewport was not allowed on the `ol` it was before, which axe reported as `aria-allowed-role`. The Collapsible, Hover Card and Popover examples show their card titles as text instead of `h4` headings, so docs pages keep their heading order. The Switch description no longer repeats the Checkbox description.

## 0.24.0

### Minor Changes

- [#285](https://github.com/fulldotdev/ui/pull/285) [`56afa23`](https://github.com/fulldotdev/ui/commit/56afa23ca2c3cc6b57bd4ed66d16a625ee4db284) Thanks [@silveltman](https://github.com/silveltman)! - Add Astro Code Block and Progress components with examples and all eight styles.
  Update data-slot to 1.1.2, expose optional Collapsible dismissal, and fix the
  Combobox clear button's accessible name and empty state. Refresh the upstream
  shadcn style sources and the React preview's Base UI dependency.

## 0.23.0

### Minor Changes

- [#286](https://github.com/fulldotdev/ui/pull/286) [`faea5fb`](https://github.com/fulldotdev/ui/commit/faea5fbe3ada71a1b40115156252847c95988e01) Thanks [@silveltman](https://github.com/silveltman)! - Add a native Liquid registry for Shopify themes with handwritten component styles, shared neutral tokens, data-slot ES modules and editor lifecycle. Universal shadcn items install directly into theme assets and snippets without Tailwind or a consuming build step.

  Integrate Liquid as the third docs framework, with its own navigation, 58 component pages, native rendered previews, usage and installation examples, Markdown endpoints and AI indexes.

## 0.22.3

### Patch Changes

- [#282](https://github.com/fulldotdev/ui/pull/282) [`068e1e9`](https://github.com/fulldotdev/ui/commit/068e1e977cbfa86eba6fdf843fffd36af979a94e) Thanks [@silveltman](https://github.com/silveltman)! - `ThemeProvider` keeps the theme across Astro `<ClientRouter />` navigation. Before, each navigation briefly showed the light theme and saved it as the visitor's choice, so a dark theme was lost.

## 0.22.2

### Patch Changes

- [#279](https://github.com/fulldotdev/ui/pull/279) [`74e78e9`](https://github.com/fulldotdev/ui/commit/74e78e92acec722f3150952e5ca0ec10fa0b4015) Thanks [@silveltman](https://github.com/silveltman)! - `Select` and `DropdownMenu` keep their popup within the screen: when the script does not set `--available-height`, the popup is at most 24rem and never taller than the screen, and long lists scroll. Before, a long list on a phone ran past the bottom and its last items could not be reached.

  `Pricing1` cards fill the width on phones instead of shrinking to their content. This holds for the Astro and the React block.

  `Doc1` code blocks fade long lines out before the copy button instead of running under it. This holds for the Astro and the React block.

## 0.22.1

### Patch Changes

- [#277](https://github.com/fulldotdev/ui/pull/277) [`4cfce5f`](https://github.com/fulldotdev/ui/commit/4cfce5fb26f823a8783db294ed9f64bc58b3f354) Thanks [@silveltman](https://github.com/silveltman)! - `Doc1` puts the description under the row with the title and the copy and open buttons, so it uses the full width of the column, and narrows the content column to 40rem, as on ui.shadcn.com. This holds for the Astro and the React block.

  `Sidebar1` is deprecated. It stays installable for now and will be removed in a future version; the docs no longer use it.

## 0.22.0

### Minor Changes

- [#271](https://github.com/fulldotdev/ui/pull/271) [`edc6e06`](https://github.com/fulldotdev/ui/commit/edc6e06cd731e167503fdce9164e9a42d0a21754) Thanks [@silveltman](https://github.com/silveltman)! - Restore the docs at their original addresses and make React an extension of shadcn/ui.

  The Astro docs are back at `/docs/`, `/components/` and `/blocks/`, with the original home page, navigation, `llms.txt` and registry docs links. The short-lived `/astro/` addresses redirect there.

  The React registry at `https://ui.full.dev/r/react/styles/{style}/{name}.json` now holds only the Fulldev extras (banner, header, icon, layout, logo, marquee, price, rating, section, theme toggle, toc, typography, video) and the 82 blocks, documented at `/react/`. Set up the project with the official `npx shadcn@latest init`, then add the `@fulldev` registry. Standard components install from the official shadcn/ui registry as plain registry dependencies, so an extra never replaces them. The React `base`, `init` and `form` items, the copies of the standard shadcn/ui components and hooks, and the `<component>-examples` items are removed from the React registry. React `Sidebar1` no longer takes `labels.mobileTitle` and `labels.mobileDescription`, which only a modified Sidebar supported.

  The Astro `ThemeProvider` keeps "follow the system" as a preference: with no stored theme, or `"system"`, it follows changes of the system theme, and `window.__setTheme("system")` returns to it. It follows a theme changed in another window or frame of the site, and it saves only a choice, so following the system or another window no longer stores an explicit theme. `__setTheme("dark")` and `__setTheme("light")` work as before.

## 0.21.0

### Minor Changes

- [#269](https://github.com/fulldotdev/ui/pull/269) [`e7c330a`](https://github.com/fulldotdev/ui/commit/e7c330ae6f7e992fdafe868f9ae17d1b80264e52) Thanks [@silveltman](https://github.com/silveltman)! - Add Fulldev UI for React: every shadcn/ui Base UI component, the Fulldev components and all 82 blocks as React components, in every shadcn/ui style. Install them with the shadcn CLI from the React registry, `https://ui.full.dev/r/react/styles/{style}/{name}.json`, starting with `npx shadcn@latest init https://ui.full.dev/r/react/styles/base-vega/base.json`. The npm package does not include the React registry.

  Add the examples from the shadcn/ui documentation as `@fulldev/<component>-examples` items: the official React source in the React registry, native ports in the Astro registry for the components Fulldev UI has in Astro.

  The docs now have an Astro and a React edition at `/astro/` and `/react/`; the former `/docs/`, `/components/` and `/blocks/` addresses redirect to the Astro edition. `Sidebar1` takes optional header content below its logo (a `header` slot in Astro, a `header` prop in React).

  The Astro `SidebarProvider` now leaves a sidebar nested inside another provider alone: the outer one no longer updates its trigger, rail and tooltips, the nested one keeps its state out of the shared `sidebar_state` cookie, and a provider whose inline script did not run initializes on `astro:page-load`.

## 0.20.0

### Minor Changes

- [#267](https://github.com/fulldotdev/ui/pull/267) [`9424673`](https://github.com/fulldotdev/ui/commit/942467396e22097cbd7a76c10a41a6acd12fb510) Thanks [@silveltman](https://github.com/silveltman)! - Simplify block props and improve block semantics (breaking).

  - Blocks drop unused fields and button variants: button styles are fixed in each block. User-facing copy such as screen reader labels, close labels and rating labels is passed in by the caller. Banner1 takes an optional `storageKey` for dismissal instead of a shared hardcoded key. `BannerContainer` gains an optional `closeLabel` and `Sidebar` gains optional `mobileTitle` and `mobileDescription`.
  - `SectionContainer` only sets width, gutter and position. It no longer adds `flex flex-col gap-8`; add the layout classes your content needs, such as `class="flex flex-col gap-8"`.
  - Marquee renders its items once and moves them with Embla and its Auto Scroll plugin. Compose it from `Marquee`, `MarqueeContent` (`reverse` replaces `direction`), `MarqueeItem` and `MarqueeToggle` (`playLabel`, `pauseLabel`). It stays static without an enabled, visible toggle, with reduced motion, or when the items do not fill the row. The `duration`, `gap`, `infinite` and `pauseOnHover` props are removed; set `--marquee-gap` for spacing. Logos2, Reviews4 and Reviews5 take `labels: { play, pause }`.
  - `PriceValue` takes `discountLabel` for the savings badge, keeps a `0` price or compare-at price, and only shows a compare-at price above the price. Pricing1-3, Product1 and Products1-5 take `locale` and `discountLabel`, and every price is `{ value, compareAt?, currency, unit }`. Pricing2 emphasizes plans with `featured` instead of the first plan.
  - Header1-5 render their `buttons` in the mobile menu too and no longer have a default or `mobile` slot. Buttons always show their label and open in the same tab unless they set `target: "_blank"`. The logo takes typed images without `alt`, and Header4 and Header5 menu images are decorative.
  - Features1 and Features4 take `link?: { label, href }` instead of `href` and `linkText`. Services4 and Services5 take a `link` per service instead of `linkLabel`.
  - Contact1-3 render your form from their default slot instead of building one from `form` props. Contact items link their visible text.
  - Sidebar1 takes `currentPath` and native attributes for its root, and `labels.sidebar` names the sidebar while `labels.sidebarToggle` names its trigger.
  - Hero1's badge is optional. Background images in Hero3, Hero4, Hero9-11 and CTA4 are decorative and take no `alt`; social proof avatars no longer take `name`.

## 0.19.0

### Minor Changes

- [#262](https://github.com/fulldotdev/ui/pull/262) [`ac31d53`](https://github.com/fulldotdev/ui/commit/ac31d535756fb844b7e09c70ee597f03076a963b) Thanks [@silveltman](https://github.com/silveltman)! - - `Button` writes `data-variant` and `data-size` on its root element, as shadcn/ui's Button does. Without a `variant` or `size`, both are `default`. Classes and props are unchanged.
  - `Card` takes a polymorphic `as` prop, so a card can render as an `article`, `section`, `a`, `li`, `dl` or any other element, with that element's attributes. It keeps `data-slot="card"` and `data-size`, and still renders a `div` by default.
  - `CardTitle` takes a polymorphic `as` prop, so a title can be a heading such as `h2` or `h3`. It still renders a `div` by default.

## 0.18.1

### Patch Changes

- [#256](https://github.com/fulldotdev/ui/pull/256) [`3ac9a53`](https://github.com/fulldotdev/ui/commit/3ac9a530dec89c07ea381da932dea517a074936b) Thanks [@silveltman](https://github.com/silveltman)! - Embed YouTube videos from the privacy-enhanced `youtube-nocookie.com` domain, and show the focus ring on navigation menu links inside menu content for keyboard users.

## 0.18.0

### Minor Changes

- [#247](https://github.com/fulldotdev/ui/pull/247) [`12b0b29`](https://github.com/fulldotdev/ui/commit/12b0b29d85cc673ac76d3d479cfbfcf4052ab3b7) Thanks [@silveltman](https://github.com/silveltman)! - Set up a new project with `npx shadcn@latest init https://ui.full.dev/r/styles/base-<style>/base.json`. The new `@fulldev/base` item is a shadcn `registry:base`, like a shadcn/ui design system base: it writes `components.json` with the `@fulldev` registry and the style, and adds the theme tokens to the stylesheet that `components.json` names. It does not install shadcn/ui's React dependencies, and the radius scale matches shadcn/ui's, including `--radius-2xl` to `--radius-4xl`.

  `@fulldev/init` no longer ships `src/styles/global.css` or theme tokens. It adds the class helper, dependencies, and base styles to the stylesheet that `components.json` names, so running `npx shadcn@latest add @fulldev/init` in an existing project leaves your colors alone.

- [#248](https://github.com/fulldotdev/ui/pull/248) [`2fbc7f1`](https://github.com/fulldotdev/ui/commit/2fbc7f19764c2764977807c3347b63ba80cd832a) Thanks [@silveltman](https://github.com/silveltman)! - Section, header, and banner read `--container`, `--gutter`, and `--section-padding`, so a site sets its content width, horizontal padding, and section spacing once in its stylesheet. Defaults are unchanged: `max-w-7xl`, `px-4`, and the style's padding. The containers now follow `--container` like the floating variants already did.

## 0.17.4

### Patch Changes

- [#252](https://github.com/fulldotdev/ui/pull/252) [`cd76b28`](https://github.com/fulldotdev/ui/commit/cd76b28df0b327b720cc05effddb2c06dfef9b7c) Thanks [@silveltman](https://github.com/silveltman)! - Field choice cards now show their selected state for checked native checkboxes, command items that are links get the pointer cursor without underline (the `href:` variant did not exist), and the navigation menu popup drops a class for a nonexistent `xs` breakpoint.

## 0.17.3

### Patch Changes

- [#246](https://github.com/fulldotdev/ui/pull/246) [`41f1f73`](https://github.com/fulldotdev/ui/commit/41f1f73c687043265bca59c7dc39fc39c1fab6e5) Thanks [@silveltman](https://github.com/silveltman)! - Give the default `DialogClose` icon a screen-reader "Close" label, and expose `Rating` to assistive technology as an image labelled "Rated N out of 5" (override with `aria-label`).

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
