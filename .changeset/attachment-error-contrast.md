---
"fulldev-ui": patch
---

Error and destructive text use the full destructive color, as shadcn/ui's `FieldError` does. `AttachmentDescription` in an attachment with an error was at 80%, about 4.1:1 in light mode and 4.3:1 in dark mode, and the description of a destructive `Alert` at 90%, in Astro and native Liquid, below the 4.5:1 WCAG AA asks for. The attachment demo's `AttachmentGroup` takes keyboard focus, so it can be scrolled without a pointer, and the Typography docs now say that a `typeset-scroll` wrapper needs `tabindex="0"` for the same reason.
