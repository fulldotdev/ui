---
"fulldev-ui": patch
---

- `src/lib/utils.ts` re-exports `cn` from shadcn's `cn` package, which replaces `clsx` and `tailwind-merge`. The `init` item installs `cn` instead of those two. Existing sites keep working; to switch, replace `src/lib/utils.ts` with `export { cn } from "cn"`, add `cn`, and remove `clsx` and `tailwind-merge`.
