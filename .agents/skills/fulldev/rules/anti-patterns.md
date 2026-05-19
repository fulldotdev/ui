# Anti-Patterns

Avoid:

- Adding page orchestration to routes, content files, `base.astro`, or reusable blocks.
- Treating `src/layouts` as docs-only plumbing.
- Using MDX imports as the default page composition model.
- Adding content fields without updating the matching schema.
- Moving UI implementation details, DOM structure, classes, raw SVG, or component imports into content.
- Hardcoding content-meaningful icons or entries inside reusable blocks.
- Importing `src/content`, globals, page schemas, routes, or docs helpers from reusable blocks/components.
- Adding page-type branching or fallback SEO shaping to `base.astro`.
- Creating local reusable UI before checking whether a Fulldev component already exists.
- Silently migrating a non-Fulldev architecture without surfacing the tradeoff.
- Patching examples to hide broken component behavior, missing exports, or schema drift.
