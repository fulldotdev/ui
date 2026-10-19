# Fulldev UI

A shadcn-compatible UI library for Astro, React and native Shopify Liquid.

## Features

- **Vanilla Astro Components** — No framework dependencies, pure Astro components
- **shadcn Compatible** — Uses the shadcn CLI and registry system for easy installation
- **Content-First** — Built for content-driven websites with components like sections, typography and prices
- **100+ Components & Blocks** — Ready-to-use UI components and pre-built page blocks
- **Tailwind CSS v4** — Styled with the latest Tailwind CSS
- **TypeScript** — Full TypeScript support
- **React extension**: the Fulldev extras and blocks for official shadcn/ui React projects; see [react/README.md](react/README.md)

## Native Liquid

Install into a Shopify theme with `npx shadcn@latest add https://ui.full.dev/r/liquid/components.json`, then render `ui` once in the layout head. Readable CSS, native ES modules and shared tokens, with no theme build step. See [Liquid](https://ui.full.dev/liquid/) and [liquid/README.md](liquid/README.md).

## Installation

### Prerequisites

- Node.js 22.12.0+

### Quick Start

1. **Create a new Astro project** (skip if you have one):

```bash
npx create-astro@latest my-project --template with-tailwindcss --install --git
cd my-project
```

2. **Configure TypeScript paths** in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

3. **Initialize Fulldev UI** with the shadcn CLI. This writes `components.json` with the `@fulldev` registry, adds the theme tokens to your stylesheet, and installs the class helper:

```bash
npx shadcn@latest init https://ui.full.dev/r/styles/base-vega/base.json
```

Replace `base-vega` with another shadcn/ui style, such as `base-nova`. To use a shadcn/ui preset, see [Presets][presets].

4. **Use a container-aware app shell** because Fulldev UI uses Tailwind v4 container-query variants like `@2xl:` and `@max-5xl:`:

```astro
---
import "@/styles/global.css"
---

<body class="@container">
  <slot />
</body>
```

5. **Add components**:

```bash
npx shadcn@latest add @fulldev/button
```

## Documentation

Visit [ui.full.dev][docs] for complete documentation, component examples, and usage guides.

For coding agents, install the shadcn skill and the Fulldev UI skill:

```bash
npx skills add shadcn/ui
npx skills add fulldotdev/ui --skill fulldev-ui
```

## npm package

The [`fulldev-ui`](https://www.npmjs.com/package/fulldev-ui) package holds the registry of each release, with no code to import and no dependencies: `public/r` has the files served at `https://ui.full.dev/r`, and `liquid/` the native Liquid files at their theme paths. Install components with the shadcn CLI as above; the package keeps every release available as a versioned copy.

## Development

Requires Node 24 (`.node-version`), pnpm 12 and [Vite+](https://viteplus.dev) (`vp`), which runs the scripts locally and in CI. Installs never run dependency or project lifecycle scripts (`pnpm-workspace.yaml`).

```bash
pnpm install         # frozen lockfile in CI and on Netlify
pnpm dev             # docs site at http://127.0.0.1:4321
vp run build         # builds the docs and the React previews
vp run check  # the source checks every Ready PR runs
vp run test:unit     # the tests in tests, which Ready PRs also run
vp run fix    # Prettier and ESLint fixes
pnpm images          # converts source photos in src to WebP
pnpm ui:add @shadcn/card  # installs with the shadcn CLI, then runs Prettier
pnpm registry:build  # regenerates public/r after registry changes
```

`vp run check` runs Prettier, TypeScript and `astro check`, ESLint, knip, the source photo check, and, specific to this registry, `registry:check` (the committed `public/r` must match a fresh build). `vp run test:unit` runs the tests in `tests`.

`vp run og` regenerates the per-page Open Graph screenshots in `public/og/`.
Run it after changing a page's opening content and commit the JPEGs. It
uses Playwright's Chromium; `CHROME` can point to an existing test-browser
executable and `OG_PORT` sets its local preview port. The normal build
checks image coverage and dimensions without launching a browser. See
[DESIGN.md](DESIGN.md) for the screenshot treatment.

`pnpm ui:add` formats the project right after the install, so a later `vp run fix` or `vp run check` does not change the installed components. A plain `pnpm dlx shadcn@latest add` leaves the CLI's own formatting, which the next format run may change.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Community

- **Discord** — Join our [Discord server][discord] to share your work and get support
- **Issues** — Report bugs and request features on [GitHub Issues][issues]

## License

MIT License — Copyright (c) 2024–present [Fulldev][fulldev]

[astro]: https://astro.build/
[docs]: https://ui.full.dev/
[presets]: https://ui.full.dev/docs/presets/
[fulldev]: https://full.dev/
[issues]: https://github.com/fulldotdev/ui/issues
[discord]: https://discord.gg/tdmUyH2YE4
