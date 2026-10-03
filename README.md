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
npx shadcn@latest init https://ui.full.dev/r/styles/base-vega/init.json
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

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm check
```

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
