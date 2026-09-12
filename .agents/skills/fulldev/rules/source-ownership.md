# Content and schemas

- Page content lives in `src/content/pages`; cross-page, locale-aware data such
  as navigation and footer copy lives in `src/content/globals`. Keep page-specific
  block data with its page.
- Prefer Markdown with structured frontmatter and body content. Layouts render
  the body with `<Content />`. Use MDX imports/components only for docs or live
  code examples that need them.
- Frontmatter holds schema-validated semantic values, not Tailwind classes,
  raw HTML/SVG, imported icons or component/DOM implementation details.
- Schemas live in `src/schemas`, with layout schemas in `src/schemas/layouts`.
  `src/content.config.ts` connects collections to schemas; `src/schemas/page.ts`
  contains the page union discriminated by frontmatter `type`.
- Validate object shape strictly; keep open-ended ecosystem values such as icon
  names permissive where appropriate.

Content-owned icons are plain names rendered through `src/components/ui/icon`,
for example `<Icon name={item.icon} />`. Preserve its name normalization,
Lucide default and Simple Icons fallback for brand/social icons. Import fixed
control icons directly from static SVG packages with an `Icon` suffix, such as
`ArrowRightIcon`. Content determines meaning; code owns control behavior.
