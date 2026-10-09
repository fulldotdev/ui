# Fulldev UI

A shadcn-compatible set of components built for [Astro][astro], designed for content-driven websites.

## Features

- **Vanilla Astro Components** — No framework dependencies, pure Astro components
- **shadcn Compatible** — Uses the shadcn CLI and registry system for easy installation
- **Content-First** — Built for content-driven websites with components like sections and tiles
- **100+ Components & Blocks** — Ready-to-use UI components and pre-built page blocks
- **Tailwind CSS v4** — Styled with the latest Tailwind CSS
- **TypeScript** — Full TypeScript support

## Installation

### Prerequisites

- Node.js 22.12.0+
- pnpm 10+

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

## Development

Requires Node 24 (`.node-version`) and pnpm 12. The published package supports Node 22.12+. Installs never run dependency or project lifecycle scripts (`pnpm-workspace.yaml`).

```bash
pnpm install         # frozen lockfile in CI and on Netlify
pnpm dev             # docs site at http://127.0.0.1:4321
pnpm build           # builds the docs, then validates HTML and internal links and anchors
pnpm check           # the checks every PR runs
pnpm fix             # Prettier and ESLint fixes
pnpm images          # converts source photos in src to WebP
pnpm ui:add @shadcn/card     # installs with the shadcn CLI, then runs Prettier
pnpm ui:add @fulldev/button  # @fulldev resolves to the local docs site, so run pnpm dev first
pnpm registry:build  # regenerates public/r after registry changes
```

`pnpm check` runs Prettier, TypeScript and `astro check`, ESLint, knip, the source photo check, and, specific to this registry, `registry:check` (the committed `public/r` must match a fresh build) and the tests in `tests`.

`pnpm ui:add` formats the project right after the install, so a later `pnpm fix` or `pnpm check` does not change the installed components. A plain `pnpm dlx shadcn@latest add` leaves the CLI's own formatting, which the next format run may change.

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
