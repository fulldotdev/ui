# Install Fulldev UI

Use the shadcn CLI with the project's package runner, such as `pnpm dlx shadcn@latest`.
There is no separate Fulldev CLI. Initialize with `shadcn init` only if
`components.json` is missing. Client projects use this registry entry:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

Install `@fulldev/init` once before components. It supplies `cn`, the CSS token
layer and shared dependencies. Inspect existing setup first: the command below
replaces `src/styles/global.css`, so preserve custom styles when applying it to
an existing project.

```bash
pnpm dlx shadcn@latest add @fulldev/init -y --overwrite
pnpm dlx shadcn@latest add @fulldev/button
```

For a new content-driven site, `@fulldev/beta-repo-setup` scaffolds the content,
schema, layout and route structure. `@fulldev/components` and `@fulldev/blocks`
are bulk installs, for requests that need the full sets.

Use shadcn's existing inspection and install tooling. `components.json` owns
registry URLs and aliases; adjust hardcoded imports from registry items to the
project's actual aliases.
