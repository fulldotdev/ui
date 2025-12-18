# Fulldev UI

A shadcn-compatible component library built for [Astro][astro], designed for content-driven websites.

## Features

- **Vanilla Astro Components** — No framework dependencies, pure Astro components
- **shadcn Compatible** — Uses the shadcn CLI and registry system for easy installation
- **Content-First** — Built for content-driven websites with components like sections and tiles
- **100+ Components & Blocks** — Ready-to-use UI components and pre-built page blocks
- **Tailwind CSS v4** — Styled with the latest Tailwind CSS
- **TypeScript** — Full TypeScript support

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

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
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

3. **Initialize shadcn**:

```bash
npx shadcn@latest init
```

4. **Add fulldev/ui registry** to `components.json`:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
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
[fulldev]: https://full.dev/
[issues]: https://github.com/fulldotdev/ui/issues
[discord]: https://discord.gg/tdmUyH2YE4
