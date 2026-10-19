---
"fulldev-ui": patch
---

`AttachmentDescription` shows its error text in the full destructive color, as `FieldError` and the native Liquid attachment do, instead of shadcn/ui's `text-destructive/80`. At 80% the small text had a contrast of about 4.1:1 in light mode and 4.3:1 in dark mode, below the 4.5:1 WCAG AA asks for. The Typography docs now say that a `typeset-scroll` wrapper needs `tabindex="0"`, so keyboard users can scroll it.
