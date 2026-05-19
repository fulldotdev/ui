# Fulldev MCP

Fulldev registry work can use the shadcn MCP server when it is configured. Treat it as shadcn-compatible registry tooling for `@fulldev` items, not as a separate Fulldev MCP.

## Use MCP For

- Listing configured registries.
- Searching the `@fulldev` registry.
- Viewing item metadata and files.
- Getting install commands for Fulldev components.
- Finding examples when the registry exposes them.

## Use CLI For

Use the shadcn CLI when you need local project context:

```bash
npx shadcn@latest info
```

The CLI is the source for project aliases, Tailwind version, framework, resolved paths, and installed component state.

## Rules

- If MCP and CLI disagree about local project configuration, trust the CLI.
- If MCP is unavailable, use the CLI workflow in `cli.md`.
- Do not assume an MCP server is configured in every client project.
- Do not use MCP as a reason to skip reading installed source files when making edits.
