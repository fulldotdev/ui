# Fulldev CLI Reference

Fulldev UI uses the shadcn CLI and registry protocol. There is no assumed `fulldev` binary. Say "install the Fulldev component", but run shadcn-compatible commands against the `@fulldev` registry.

## Project Setup

Configuration is read from `components.json`.

Initialize shadcn-compatible component installation when the project does not have `components.json`:

```bash
npx shadcn@latest init
```

Add the Fulldev registry:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

Use the package runner already used by the project when possible. If the repo uses pnpm, prefer:

```bash
pnpm dlx shadcn@latest add @fulldev/button
```

Otherwise use:

```bash
npx shadcn@latest add @fulldev/button
```

## Common Commands

Inspect project configuration:

```bash
npx shadcn@latest info
```

Install Fulldev components:

```bash
npx shadcn@latest add @fulldev/button
npx shadcn@latest add @fulldev/card @fulldev/section
```

Preview what an install would change:

```bash
npx shadcn@latest add @fulldev/button --dry-run
npx shadcn@latest add @fulldev/button --diff
npx shadcn@latest add @fulldev/button --view
```

Search or inspect registry items:

```bash
npx shadcn@latest search @fulldev -q "button"
npx shadcn@latest view @fulldev/button
```

## Rules

- Do not invent Fulldev CLI flags or commands.
- Do not fetch registry files manually when the shadcn CLI can preview, diff, view, or install them.
- Before creating local UI, check whether an `@fulldev` component already exists.
- After installing a component, read the added files when behavior, imports, or API details matter.
- If a third-party registry item hardcodes aliases, adjust imports to the project's actual aliases.
