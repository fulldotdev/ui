# Fulldev UI for React

The React version of Fulldev UI: every shadcn/ui component for Base UI, the Fulldev components (banner, header, icon, layout, logo, marquee, price, rating, section, theme toggle, table of contents, typography, video, form) and all blocks, in every shadcn/ui style.

Docs, with every component, official shadcn/ui example and block: [ui.full.dev/react](https://ui.full.dev/react/).

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

Blocks take plain content props, such as `title`, `buttons` and `image: { src, srcSet, alt }`, and render native elements, so they work with any router and image pipeline. Caller-owned content, such as a form or an article body, goes in `children`.

- `Icon` renders any Lucide icon or Simple Icons brand by its content name, such as `rocket` or `figma`; `lucide:` and `simple:` pick a set. With only an `href`, it shows the brand of a social or contact link. Because names resolve at runtime, `Icon` includes both sets, about 2 MB gzipped in a client bundle; in a server component it stays on the server. Import an icon fixed in code from `lucide-react` or `simple-icons` directly.
- `Doc1` adds a copy button to `<pre>` elements passed as direct children. Content from a component, such as compiled MDX, renders its own `<pre>`, so map it to the exported code block: `<Content components={{ pre: Doc1CodeBlock }} />`.
- Wrap the app in `ThemeProvider` from `@/components/ui/theme-toggle` to use `ThemeToggle`.

## Development

```bash
pnpm --dir react dev   # preview app; the docs dev server proxies /preview/react/ to it
pnpm build             # docs site with the previews in every style at /preview/react/
pnpm registry:build    # regenerates public/r/react from react/registry.json
```

`src/components/examples/<component>/` holds the examples of the shadcn/ui docs, unchanged except where noted on their docs page; `@fulldev/<component>-examples` installs them.

`react/registry.json` lists the installable items. Components use the same `cn-*` placeholders and style files as the Astro components (see `registry/styles/README.md`).

The shadcn/ui components are the official source, installed with `pnpm dlx shadcn@latest add` in this folder (`components.json`: base-vega, rsc), with the `cn-*` placeholders of the canonical shadcn/ui source restored so every style builds from the shared style files. Their output in each style matches an official install of that style, except for two additions: Drawer content scrolls when it is taller than the drawer and the Drawer parts (viewport, popup, provider, indent, indent background, virtual keyboard provider) are exported, and Sidebar takes `mobileTitle` and `mobileDescription` for its mobile sheet. They are copyright shadcn, under the MIT license in `registry/styles/shadcn/LICENSE.md`.
