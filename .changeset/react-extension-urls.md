---
"fulldev-ui": minor
---

Restore the docs at their original addresses and make React an extension of shadcn/ui.

The Astro docs are back at `/docs/`, `/components/` and `/blocks/`, with the original home page, navigation, `llms.txt` and registry docs links. The short-lived `/astro/` addresses redirect there.

The React registry at `https://ui.full.dev/r/react/styles/{style}/{name}.json` now holds only the Fulldev extras (banner, header, icon, layout, logo, marquee, price, rating, section, theme toggle, toc, typography, video) and the 82 blocks, documented at `/react/`. Set up the project with the official `npx shadcn@latest init`, then add the `@fulldev` registry. Standard components install from the official shadcn/ui registry as plain registry dependencies, so an extra never replaces them. The React `base`, `init` and `form` items, the copies of the standard shadcn/ui components and hooks, and the `<component>-examples` items are removed from the React registry. React `Sidebar1` no longer takes `labels.mobileTitle` and `labels.mobileDescription`, which only a modified Sidebar supported.

The Astro `ThemeProvider` keeps "follow the system" as a preference: with no stored theme, or `"system"`, it follows changes of the system theme, and `window.__setTheme("system")` returns to it. It follows a theme changed in another window or frame of the site, and it saves only a choice, so following the system or another window no longer stores an explicit theme. `__setTheme("dark")` and `__setTheme("light")` work as before.
