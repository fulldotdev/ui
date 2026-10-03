---
"fulldev-ui": minor
---

Set up a project with `npx shadcn@latest init https://ui.full.dev/r/styles/base-<style>/init.json`. `@fulldev/init` is now a shadcn `registry:base` item, like a shadcn/ui design system base: it writes `components.json` with the `@fulldev` registry and the style, and merges the theme tokens into the stylesheet that `components.json` names instead of replacing `src/styles/global.css`. It no longer installs shadcn/ui's React dependencies, and the radius scale now matches shadcn/ui's, including `--radius-2xl` to `--radius-4xl`. In a project that already has `components.json`, add the `@fulldev` registry instead of running `init` again.
