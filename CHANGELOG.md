### fulldev-ui@0.3.36

## What's Changed

Update theming.mdx by @spjpgrd in https://github.com/fulldotdev/ui/pull/41

## New Contributors

@spjpgrd made their first contribution in https://github.com/fulldotdev/ui/pull/41

---

### fulldev-ui@0.3.28

- removed some dependencies on scss, more to come
- fixed color/contrast selector specificity
- improved auto-spacing for structures and segments
- added text-align to align prop on top of align-items
- added missing size prop type to card
- general minor fixes and improvements

---

### fulldev-ui@0.3.7

This release includes minor fixes and improvements

- z-index 1 to all components for img background
- avatar size improved
- button now accepts avatar
- image mask-lg
- rating accepts label and avatars
- card only overflow when panel
- section overflow-hidden when panel
- child spacing fixes

---

### fulldev-ui@0.3.2

- We have refactored the documentation of every single component for better understanding.
- Component documentation now includes an interactive story-like preview. You can play around with live props and copy the code.
- Added a search function to the header.
- Props are now displayed more clearly with better examples using a table.

### Tailwind Plugin & UnoCSS Preset

For more information on this, visit the [frameworks page](https://ui.full.dev/overview/frameworks/).

### Base Components

- [Checkbox component](https://ui.full.dev/base/checkbox/) added
- [Image component](https://ui.full.dev/base/image/) added
- [Table component](https://ui.full.dev/base/table/) added
- [Rating component](https://ui.full.dev/base/rating) added
- [Select](https://ui.full.dev/base/select) and [Input](https://ui.full.dev/base/input) components have been modified to accept a label.

### Typography Components

- [Text component](https://ui.full.dev/typography/text/) (renamed from Paragraph)
- [Link Component](https://ui.full.dev/typography/link) now has an underline prop.

### Structure Components

- [Wrap structure](https://ui.full.dev/structure/wrap/) added
- Group structure removed, you can use Column, Row or Wrap directly
- Stack has been renamed to Column

### Segment Components

- [Header component](https://ui.full.dev/segment/header/) added
- [Footer component](https://ui.full.dev/segment/footer/) added
- Deck segment removed, you can use Grid, Carousel or Masonry directly

Theming
[Theming](https://ui.full.dev/overview/theming/) has been revamped. Please read the documentation.

Props:

- `density` has been replaced by a boolean prop called `compact`
- `variant` has different values.
- `contrast` has been added as a boolean prop. Formerly was included in variant
- `color` prop added as part of the revamped theming system

## Migrating from v0.2

Please go through the above specified changes and update you project accordingly. From this point on versions will have a lot less breaking changes. If they still do appear, we make sure to provide clear migration instructions.

For any feedback, issues, or missing information, please create an [issue](https://github.com/fulldotdev/ui/issues/new/choose). We'd also love to hear what you think about this release and invite you to have a chat in our [Discord](https://discord.gg/CAqgtsgW).

---

## fulldev-ui@0.2.10

In this release we focussed on showing and improving the things that make Fulldev UI unique.

- Updated homepage to include examples and features
- Updates default and docs color palette to be more like the Astro ecosystem
- Added segment and structure components
- Added support for usage with CSS/JS frameworks
