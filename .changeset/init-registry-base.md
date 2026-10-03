---
"fulldev-ui": minor
---

Set up a new project with `npx shadcn@latest init https://ui.full.dev/r/styles/base-<style>/base.json`. The new `@fulldev/base` item is a shadcn `registry:base`, like a shadcn/ui design system base: it writes `components.json` with the `@fulldev` registry and the style, and adds the theme tokens to the stylesheet that `components.json` names. It does not install shadcn/ui's React dependencies, and the radius scale matches shadcn/ui's, including `--radius-2xl` to `--radius-4xl`.

`@fulldev/init` no longer ships `src/styles/global.css` or theme tokens. It adds the class helper, dependencies, and base styles to the stylesheet that `components.json` names, so running `npx shadcn@latest add @fulldev/init` in an existing project leaves your colors alone.
