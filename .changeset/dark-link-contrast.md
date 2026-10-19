---
"fulldev-ui": patch
---

Links stay readable in dark mode with a colored theme. shadcn/ui's dark themes use the primary as a button fill, so links in the primary color fell below the 4.5:1 WCAG AA asks for with 15 of the 17 shadcn/ui theme colors, orange to 2.7:1. In dark mode `TypographyA` (Astro and React), the link variant of `Button` and `Badge`, and the native Liquid typography link, link button and link badge now use a lighter step of the primary, `oklch(from var(--primary) max(l, 0.7) calc(c * 1.2) h)`: at least 5.8:1 with every shadcn/ui theme color. Light mode, neutral themes and primary fills, such as buttons, checkboxes and switches, stay as they were. Browsers without relative color support keep the primary. A text color passed to the component, such as `text-muted-foreground`, still wins in dark mode.
