---
"fulldev-ui": minor
---

Complete Data Slot component coverage with Drawer, Toast, Toggle Group and Resizable, and upgrade all Data Slot packages to 1.0.2. Add Attachment, Button Group, Pagination and Aspect Ratio as Astro components without their own client scripts.

Replace the Embla Carousel with Data Slot's native scrolling carousel. This is a breaking change: replace `opts` with `defaultIndex`, `orientation`, `drag` and `loop`; use `CarouselController` and `CarouselOptions` instead of Embla types; replace `carousel:init` and `carousel:select` with `carousel:change` and `carousel:set`. Carousel now displays one full-width slide at a time. Remove fractional slide widths and the old content/item spacing pattern. Examples and the reviews block use the new API.

Adopt shadcn Typeset for rendered prose while preserving the existing Typography component exports. Typography sizes now control the prose rhythm, with updated heading spacing, nested content styling and semantic tables. Keep docs-specific code controls out of installable Typography styles.

Improve Combobox trigger and clear focus styling, align Select popper placement and Slider thumb positioning with shadcn, and use a consistent 8px default Navigation Menu gap.
