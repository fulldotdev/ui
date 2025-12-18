---
title: Installation
description: Install and configure fulldev/ui for Astro
---

### Create project

If you don't have a project yet, create one using the following command:

```bash
npx create-astro@latest astro-fulldev  --template with-tailwindcss --install --git
```

### Edit tsconfig.json file

Add the following code to the `tsconfig.json` file to resolve paths:

```ts title="tsconfig.json" {4-9} showLineNumbers
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

### Run the CLI

As this project is distributed as a shadcn registry, run the `shadcn` init command to setup your project:

```bash
npx shadcn@latest init
```

### Add fulldev/ui registry

Add fulldev/ui as a namespaced registry to your `components.json` file:

```json title="components.json"
{
  "registries": {
    "@fulldev-ui": "https://ui.full.dev/r/{name}.json"
  }
}
```

### Add Components

You can now start adding components to your project.

```bash
pnpm dlx shadcn@latest add @fulldev-ui/button
```

or multiple resources at once:

```bash
pnpm dlx shadcn@latest add @fulldev-ui/button @fulldev-ui/item @fulldev-ui/list
```

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
  <body>
    <div class="grid h-screen place-items-center content-center">
      <Button>Button</Button>
    </div>
  </body>
</html>
```
