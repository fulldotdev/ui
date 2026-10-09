# Fulldev UI for React

The React version of Fulldev UI: every shadcn/ui component for Base UI, the Fulldev components (banner, header, icon, layout, logo, marquee, price, rating, section, theme toggle, table of contents, typography, video, form) and all blocks, in every shadcn/ui style.

Preview every component and block at [ui.full.dev/react](https://ui.full.dev/react/).

## Installation

In a React project with Tailwind CSS v4 and the `@/*` alias for `src/*`, start with the base:

```bash
npx shadcn@latest init https://ui.full.dev/r/react/styles/base-vega/base.json
```

Replace `base-vega` with another shadcn/ui style, such as `base-nova`.

In a project that already has a `components.json`, add the registry and install the helpers instead, which leaves your theme alone:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/react/styles/{style}/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @fulldev/init
```

Then add components and blocks, or `@fulldev/components` and `@fulldev/blocks` for all of them:

```bash
npx shadcn@latest add @fulldev/button @fulldev/hero-1
```

```tsx
import { Hero1 } from "@/components/blocks/hero-1"
import { Button } from "@/components/ui/button"
```

Blocks take plain content props, such as `title`, `buttons` and `image: { src, srcSet, alt }`, and render native elements, so they work with any router and image pipeline. `Icon` renders Lucide icons by name and brand logos for social links. Wrap the app in `ThemeProvider` from `@/components/ui/theme-toggle` to use `ThemeToggle`.

## Development

```bash
pnpm --dir react dev   # gallery at http://127.0.0.1:4322
pnpm build             # docs site with the gallery in every style at /react/
pnpm registry:build    # regenerates public/r/react from react/registry.json
```

`react/registry.json` lists the installable items. Components use the same `cn-*` placeholders and style files as the Astro components (see `registry/styles/README.md`).

The shadcn/ui components are the official source, installed with `pnpm dlx shadcn@latest add` in this folder (`components.json`: base-vega, rsc), with the `cn-*` placeholders of the canonical shadcn/ui source restored so every style builds from the shared style files. Their output in each style matches an official install of that style. They are copyright shadcn, under the MIT license in `registry/styles/shadcn/LICENSE.md`.
