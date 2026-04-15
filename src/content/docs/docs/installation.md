---
title: Installation
description: Install and configure fulldev/ui for Astro
---

## Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

## Quick Start

1. **Create a new Astro project** (skip if you have one):

We recommend using the [fulldev starter](https://github.com/fulldotdev/starter). If you prefer to scaffold manually:

```bash
pnpm create astro@latest my-project -- --template with-tailwindcss
cd my-project
```

2. **Configure TypeScript paths** in `tsconfig.json`:

```json title="tsconfig.json" {4-6} showLineNumbers
{
  "compilerOptions": {
    // ...
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

3. **Initialize shadcn**:

```bash
npx shadcn@latest init
```

4. **Add fulldev/ui registry** to `components.json`:

```json title="components.json"
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

5. **Copy the base stylesheet** from [`src/styles/global.example.css`](https://github.com/fulldotdev/ui/blob/main/src/styles/global.example.css) to `src/styles/global.css`, then import it in your layout.

6. **Use a container-aware app shell** because fulldev/ui uses Tailwind v4 container-query variants like `@2xl:` and `@max-5xl:`:

These are intentional and should not be converted to viewport breakpoints like `2xl:`.

To make those variants work, add `@container` to the root wrapper that contains your page content:

```astro title="src/layouts/Layout.astro" {2,6} showLineNumbers
---
import "@/styles/global.css"
---

<body class="@container">
  <slot />
</body>
```

7. **Add components**:

```bash
npx shadcn@latest add @fulldev/button
```

Or add multiple resources at once:

```bash
npx shadcn@latest add @fulldev/button @fulldev/item @fulldev/list
```

### Add all components and blocks

```bash
npx shadcn@latest add @fulldev/components
npx shadcn@latest add @fulldev/blocks
```

### Usage

The commands above will add components to your project. You can then import them like this:

```astro title="src/pages/index.astro" {2,16} showLineNumbers
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/logo-fulldev.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro + fulldev/ui</title>
  </head>
  <body class="@container">
    <div class="grid h-screen place-items-center content-center">
      <Button>Button</Button>
    </div>
  </body>
</html>
```
