---
"fulldev-ui": patch
---

- Components import each other through their index, and their own files with `./`. `sheet` now imports `DialogPortal` from `@/components/ui/dialog`, `combobox` from `@/components/ui/input-group`, `toggle-group` from `@/components/ui/toggle`, and `sheet-close` from `@/components/ui/button`. A site's knip then counts every installed part of a used component as used, so it can report components a site does not use.
