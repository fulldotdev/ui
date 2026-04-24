# fulldev ui CLI Reference

Configuration is read from `components.json`.

> **IMPORTANT:** Always run commands using the project's package runner: `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest`. Check `packageManager` from project context to choose the right one. Examples below use `npx shadcn@latest` but substitute the correct runner for the project.

> **IMPORTANT:** Only use the flags documented by the shadcn CLI. Do not invent or guess flags.

## fulldev Notes

- fulldev ui uses the shadcn CLI and registry system.
- Search `@fulldev` first for fulldev ui components.
- Use `npx shadcn@latest view @fulldev/<item>` or `npx shadcn@latest add @fulldev/<item> --dry-run` for fulldev-specific items.
- fulldev ui does not branch between `base` and `radix`; use the Astro data-slot patterns documented in [rules/data-slot.md](./rules/data-slot.md).

## Commands

### `init` — Initialize a project

```bash
npx shadcn@latest init [components...] [options]
```

Use this to initialize shadcn in an existing Astro project before adding the `@fulldev` registry to `components.json`.

### `add` — Add components

> **IMPORTANT:** To compare local components against upstream or to preview changes, ALWAYS use `npx shadcn@latest add <component> --dry-run`, `--diff`, or `--view`. NEVER fetch raw files manually. The CLI handles registry resolution, file paths, and CSS diffing automatically.

```bash
npx shadcn@latest add [components...] [options]
```

Examples:

```bash
# Install a fulldev ui component.
npx shadcn@latest add @fulldev/button

# Preview all changes.
npx shadcn@latest add @fulldev/button --dry-run

# Show diffs for all files (top 5).
npx shadcn@latest add @fulldev/button --diff

# Show the diff for a specific file.
npx shadcn@latest add @fulldev/button --diff button.astro

# Show contents for all files (top 5).
npx shadcn@latest add @fulldev/button --view
```

Use `--dry-run` when the user asks what files will be added or changed. Use `--diff` before overwriting existing components. Use `--view` when the user wants to inspect component source without installing.

### `search` — Search registries

```bash
npx shadcn@latest search <registries...> [options]
```

Search `@fulldev` first:

```bash
npx shadcn@latest search @fulldev -q "button"
```

The built-in `@shadcn` registry still exists, so it is valid to fall back when fulldev ui does not provide the needed item:

```bash
npx shadcn@latest search @shadcn -q "button"
```

### `view` — View item details

```bash
npx shadcn@latest view <items...> [options]
```

Example:

```bash
npx shadcn@latest view @fulldev/button
```

### `docs` — Get component documentation URLs

```bash
npx shadcn@latest docs <components...> [options]
```

Use this for shared shadcn primitives whose APIs still apply in fulldev ui:

```bash
npx shadcn@latest docs input button
```

### `info` — Project information

```bash
npx shadcn@latest info [options]
```

Run this first to discover the project's framework, aliases, Tailwind version, icon library, and resolved paths.

Pay attention to:

- `framework`
- `tailwindVersion`
- `tailwindCssFile`
- `style`
- `iconLibrary`
- `resolvedPaths`
- `registries`

### `build` — Build a custom registry

```bash
npx shadcn@latest build [registry] [options]
```

This is relevant when working on the fulldev ui registry itself.

## fulldev Setup Checklist

Before installing `@fulldev/*` items, verify:

1. `components.json` exists.
2. `components.json` includes:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

3. `tsconfig.json` maps `@/*` to `./src/*`.
4. The project includes the fulldev base stylesheet.
5. The root shell is container-aware with `@container` when using fulldev responsive patterns.

## Updating Components

When the user wants upstream changes while keeping local edits:

```bash
npx shadcn@latest add @fulldev/button --dry-run
npx shadcn@latest add @fulldev/button --diff
npx shadcn@latest add @fulldev/button --diff button.astro
```

Rules:

- Preview first with `--dry-run` or `--diff`.
- Merge local modifications manually when needed.
- Only use `--overwrite` with explicit approval.
- Do not fetch raw files manually from GitHub or registry endpoints.
