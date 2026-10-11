# Fulldev UI React extension

Fulldev extras and blocks for React projects that use [shadcn/ui](https://ui.shadcn.com) for Base UI. It extends shadcn/ui and does not replace it: the standard components, such as Button and Dialog, come from the official shadcn/ui registry and docs.

- Extras: banner, header, icon, layout, logo, marquee, price, rating, section, theme toggle, table of contents, typography and video.
- Blocks: every Fulldev UI block, as `.tsx` files.

Docs: [ui.full.dev/react](https://ui.full.dev/react/).

## Installation

Set up the project with the official `npx shadcn@latest init` and a Base UI style, then add the registry to `components.json`:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/react/styles/{style}/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @fulldev/section @fulldev/hero-1
```

An item ships only its own files. Standard components it needs are plain registry dependencies, such as `button`, so they install from the official shadcn/ui registry; other Fulldev extras are `@fulldev/<name>` dependencies. `@fulldev/components` and `@fulldev/blocks` install every extra or block.

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

`react/registry.json` lists the installable items: the extras in `src/components/ui/` and the blocks in `src/components/blocks/`. They use the same `cn-*` placeholders and style files as the Astro components (see `registry/styles/README.md`). `gallery/` holds the preview demos.

The other files in `src/components/ui/` and `src/hooks/` are private fixtures: the official shadcn/ui source of the standard components that the extras and blocks use, installed with the shadcn CLI (`components.json`: base-vega, rsc) and kept unchanged apart from the canonical `cn-*` placeholders, so the previews render in every style. They are not registry items, not documented here and never ship with an item. They are copyright shadcn, under the MIT license in `registry/styles/shadcn/LICENSE.md`.
