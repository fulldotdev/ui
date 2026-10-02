---
"fulldev-ui": patch
---

- Header blocks take `navigationLabel` and `menu` (`label`, `title`, `description`) props for their accessible names, so sites in other languages no longer ship English screen-reader labels. The defaults are the previous English text. The desktop navigation is now named, and the mobile navigation uses the menu title, so the two landmarks have distinct names.
- `Checkbox` no longer sets the redundant `role="checkbox"` on its native checkbox input.
- `Label` and `sidebar-1` document why they are exempt from one accessibility lint rule each, so projects that lint installed copies with `eslint-plugin-astro` pass.
