---
"fulldev-ui": patch
---

`Toast` renders its viewport as a `section` and each toast as a `div`, like the native Liquid toast. The `region` role the toast script gives the viewport was not allowed on the `ol` it was before, which axe reported as `aria-allowed-role`. The Collapsible, Hover Card and Popover examples show their card titles as text instead of `h4` headings, so docs pages keep their heading order. The Switch description no longer repeats the Checkbox description.
