---
title: Installation
description: Install and configure fulldev/ui for Astro
---

## Create new Astro project

If you don't have a project yet, we recommend using [this starter template](https://github.com/fulldotdev/starter).

## Add to existing Astro project

As this project is distributed as a shadcn registry, run the `shadcn` init command to setup your project:

```bash
npx shadcn@latest init
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

### Add fulldev/ui registry

Add fulldev/ui as a namespaced registry to your `components.json` file:

```json title="components.json"
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

## Add Components

You can now start adding components to your project.

```bash
npx shadcn@latest add @fulldev/button
```

or multiple resources at once:

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
  <body>
    <div class="grid h-screen place-items-center content-center">
      <Button>Button</Button>
    </div>
  </body>
</html>
```
