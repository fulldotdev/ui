---
"fulldev-ui": minor
---

Fix and improve the consumer install path and agent-facing docs.

- `@fulldev/init` now imports `tw-animate-css` and `shadcn/tailwind.css` and installs both, so overlay animations and data-state variants work in consumer projects. The `dark` variant now uses `:where(.dark, .dark *)` and a reduced-motion rule is included.
- `@fulldev/components` includes breadcrumb, carousel, icon, and kbd. Bundles are kept complete automatically.
- Registry items now carry `title`, `description`, `categories`, and `docs` so the shadcn CLI and MCP server can search them.
- Blocks accept any HTML attribute on their root element and forward it.
- New `SectionTitle` and `SectionDescription` parts in `@fulldev/section`; blocks use them for headings.
- Header blocks render children once and expose a `mobile` slot for the sheet. Mobile navigation entries are real links.
- Contact blocks render a `<form>` with `name` attributes and unique ids, and accept `form.action`, `form.method`, and `form.id`.
- `Icon` loads icons lazily, resolves `lucide:` and `simple:` prefixes, and is `aria-hidden` unless labelled.
- Interactive components re-initialize after `astro:page-load` when using `ClientRouter`.
- Sidebar block takes `githubStars` as a prop instead of a hardcoded value.
- Sidebar menu button outline variant renders its border again.
- Docs: `llms.txt`, `llms-full.txt`, install commands in block Markdown, page lists in overview Markdown, expanded MCP, theming, and dark mode guides.
