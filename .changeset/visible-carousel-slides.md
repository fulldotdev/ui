---
"fulldev-ui": minor
---

Restore the Embla-powered Carousel and shadcn-style composition, responsive slide widths and `opts` API. Use the vanilla `embla-carousel` 8.6.0 package without React. Other interactive components continue to use Data Slot directly.

This replaces the single-slide Carousel introduced in 0.13.0. Reinstall the registry component. Replace `defaultIndex`, `drag` and `loop` with `opts={{ startIndex, watchDrag, loop }}`; dragging is enabled by default. Restore `CarouselApi`, `CarouselOptions` and `CarouselPlugin` types and `carousel:init` / `carousel:select` events. Listen to their `detail.api` for programmatic navigation instead of `carousel:set`. `CarouselContent` classes apply to the inner track again; use matching negative track margins and slide padding for spacing.

Visible slide links stay interactive, and Embla handles focus scrolling, resizing and slide positions. Instances and event handlers are cleaned up before Astro page swaps. No observers override another library's accessibility state.
