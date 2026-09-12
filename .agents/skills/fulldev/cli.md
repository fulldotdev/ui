# Fulldev CLI Reference

Fulldev UI uses the shadcn CLI and registry protocol. There is no assumed `fulldev` binary. Say "install the Fulldev component" or "install the Fulldev block", but run shadcn-compatible commands against the `@fulldev` registry.

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

Install the shared setup once per project, before any component. It adds the
class helper, the Tailwind token layer, and shared dependencies:

```bash
npx shadcn@latest add @fulldev/init -y --overwrite
```

`--overwrite` replaces the generated `src/styles/global.css`. Review that file
first in an existing project with custom styles.

For a brand-new content-driven site, `@fulldev/beta-repo-setup` scaffolds the
content, schema, layout, and route files described in this skill:

```bash
npx shadcn@latest add @fulldev/beta-repo-setup -y
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

Install Fulldev components or blocks:

```bash
npx shadcn@latest add @fulldev/button
npx shadcn@latest add @fulldev/card @fulldev/section
```

Install every component or every block at once:

```bash
npx shadcn@latest add @fulldev/components @fulldev/blocks
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
- Before creating local UI or page sections, check whether an `@fulldev` component or block already exists.
- After installing a component or block, read the added files when behavior, imports, or API details matter.
- If a third-party registry item hardcodes aliases, adjust imports to the project's actual aliases.
