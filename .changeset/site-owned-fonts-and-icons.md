---
"fulldev-ui": minor
---

- `LayoutHead` no longer renders `<Font>` for `--font-sans` and `--font-mono`, so a site no longer has to configure exactly those two fonts in `astro.config`. Without font configuration, text uses Tailwind's system font stack. A site that configures fonts renders `<Font cssVariable="--font-sans" />` (and any others) inside `LayoutHead`, as the Layout docs show. Sites that relied on the old behavior add those two lines.
- `footer-1`, `footer-2` and `footer-3` render social icons with `Icon`, so any Lucide or Simple Icons name works instead of only `github`, `discord` and `x`. `icon` is optional: without it, `Icon` derives the brand from the link, such as an Instagram or LinkedIn URL.
- `Icon` with only an `href` falls back to Lucide's `link` icon when the brand has no logo in either icon set, such as LinkedIn, so a link never renders an empty icon.
