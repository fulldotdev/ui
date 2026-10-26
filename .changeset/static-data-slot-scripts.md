---
"fulldev-ui": minor
---

Data Slot components start with their page script, with no loading helper. Dialog, Sheet and NavigationMenu no longer load their controller per media query: `media` is still accepted but has no effect, and the registry no longer has the `on-media` item or `src/lib/dialog.ts`; a site that installed them can delete `src/lib/on-media.ts` and `src/lib/dialog.ts` once nothing imports them. Header blocks 1 to 5 take `fold="lg"`, the default, or `fold="xl"` for the breakpoint between their mobile sheet and desktop navigation, and close whichever one the layout hides at that breakpoint, which also releases the sheet's scroll lock. Every Data Slot component also binds new roots on `astro:after-swap`, so a site's own `astro:page-load` command after ClientRouter navigation reaches a started controller.
