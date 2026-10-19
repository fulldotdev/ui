# Design

The design of the docs site at ui.full.dev. Installable components and blocks have no design of their own beyond their style placeholders; see `registry/styles/README.md`.

## Layout

A copy of the ui.shadcn.com docs, built from Fulldev UI components: a 64px header, a 16.5rem sidebar on the left, a centered 40rem content column (`Doc1`) and the table of contents on the right. The homepage and the create page have no docs sidebar; the create page has its own sidebar with the preset options.

- Header (`src/components/docs-header.astro`): logo, main navigation as ghost buttons, search, GitHub, theme toggle and the "New" button to Create as a secondary button. Below `lg` the header keeps the logo on the left and search, theme and a larger menu button on the right; the menu is a drawer from the bottom with the navigation, the switcher and the docs navigation, opened at the current page.
- Sidebar: the switcher (`src/components/docs-switcher.astro`) on top, then the navigation (`src/components/docs-nav.astro`). The logo, the switcher, the group labels and the link text share one left edge; the highlight of a link reaches 9px past it. The space from the switcher to the first group equals the space between groups.
- Previews: Astro component examples render in the page, as on ui.shadcn.com. Blocks render in frames on their own URLs under `/preview/`, which search engines do not index, so the headings and copy of a block are not part of its docs page. React and Liquid examples always render in frames.

## Homepage

A general homepage for both frameworks, with its content in the frontmatter of `src/content/pages/index.mdx`.

- Hero (`src/components/home-hero.astro`): the title names Astro and React, shown with their logos in their own colors; Get started and Browse blocks; then a bento of real blocks and components in the current preset, and tiles for Astro, React and presets.
- Then a selection of components, with the extras React gets from Fulldev UI marked; the block categories with their counts from the registry; the features block; the presets; the FAQ block; and a closing call to action on the primary color. Sections follow the 6xl container; the blocks render as they would on a site, without Preview or Code frames.
- The homepage, like Create, belongs to both frameworks: its links lead to the framework chosen last.

## Liquid

Liquid is the third framework in the shared switcher. It has its own navigation, component pages, native Liquid examples, installation commands and Markdown endpoints under `/liquid/`. Previews render the actual Liquid and CSS in isolated frames, with the shared theme tokens. Native styles stay Vega; Tailwind style presets do not transform Liquid. Shopify blocks and commerce stay theme-owned.

## Presets

The site follows one preset everywhere: theme, style, fonts and menu color, previews included.

- The default is the Fulldev preset (`DEFAULT_CONFIG` in `src/lib/presets.ts`): Vega, Stone, Orange, Geist, the large radius and translucent menus. It follows the full.dev website treatment with orange as Fulldev UI's product color. Installs keep the theme of the registry's init item.
- The switcher offers Fulldev, shadcn/ui (`SHADCN_CONFIG`: Nova, Neutral, Geist, the default radius) and the visitor's own preset from Create. Astro or React comes from the page.
- `src/lib/styles.ts` renders the site, previews included, in Vega once and adds, per class string, the classes every other style removes and adds; the inline script it adds switches them before the first paint.
- The header turns to glass when the preset's menus are translucent (`data-menu-color` on `<html>`).

## Brand

- Logo: the Fulldev mark on a 28px blue tile (`--fd-brand` in `src/styles/global.css`), with the sheen, rim and shadow of the full.dev logo tile, then an 8px gap, "Fulldev", a normal word space and "UI", both in the same foreground colour (dark on light, light on dark). Both words use the dedicated Fulldev Wordmark font (Geist, 20px, 600, -0.01em, with 0.5px outer and 0.25px inner corner rounding). The white mark fills 68% of the tile height. This shares the proportions of full.dev and the other product names. The tile stays blue in every preset. The favicon, logo assets and social image use the same blue; the favicon and logo assets carry the tile's sheen and fine white rim, and the Apple touch icon is the full-bleed square (`src/assets/touch-icon.svg`) that iOS rounds; the default theme keeps shadcn/ui's Orange palette as its interface accent.
- Font: Geist 1.7.2 from the full.dev websites with their stylistic sets (ss02 single-storey a, ss03 straight l, ss06 alternate G, ss08 round dots), configured in `astro.config.ts`. A preset in Geist keeps this font.

## Rejected

- The inset app shell with a collapsible sidebar and breadcrumbs (`Sidebar1`): too busy for docs.
- Per-page Astro/React/Liquid tabs and a style menu next to every preview: both are global choices in the switcher and on Create.
- Docs without a left navigation: too hard to browse 60+ components.
- On the homepage: blocks in Preview and Code frames, a hero that leads with Astro only, a split hero, install tabs in the hero, and the bordered call to action card (`Cta8`).

## Open Graph images

Each indexed page shares a screenshot of its own opening content, including
its real component examples. Use the same raised browser window on stone
as full.dev, at 1200 by 630 pixels. The site header, docs navigation and
table of contents stay outside the capture. Keep the docs' default light
preset, fonts and content. No additional logo, headline or banner artwork.
Capture docs at 1200px wide so their narrower content stays legible; full
pages use the same 1680px capture width as full.dev.

`vp run og` builds the site and its React previews and writes the JPEGs to
`public/og/`. Regenerate them when a page's opening content changes and
commit the images. Ordinary builds use the committed files and check that
each generated image exists with the right dimensions. Explicit page and
SEO image overrides keep priority.
