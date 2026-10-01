---
"fulldev-ui": patch
---

Fix registry items so the shadcn CLI installs them exactly as published:

- `field`, `avatar`, `alert` and `item` now ship every file their `index.ts` exports: `FieldError`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`, `AlertAction`, `ItemHeader`, `ItemFooter` and `ItemSeparator`. `item` now depends on `separator`.
- Blocks that render `Icon` now depend on `@fulldev/icon`, and blocks that imported it without using it no longer do.
- The block placeholder image is now `src/assets/placeholder.svg`. Registry JSON can only carry UTF-8 text, so the previous WebP placeholder arrived corrupted.
- `typeset.css` no longer starts with a comment. The shadcn CLI drops leading comments on install, so the installed file now matches the registry content.
- `Label`, `Separator` and `SectionContainer` take a `data-slot` override instead of rendering the attribute twice, so wrappers such as `FieldLabel`, `ItemSeparator` and `ButtonGroupSeparator` render valid HTML with their own slot.
- Hero block images load with `fetchpriority="high"`, so the browser fetches the largest image on the page first.
- The `page` registry item is removed. It installed the docs site's own route, which depends on files outside the registry and broke the build.
