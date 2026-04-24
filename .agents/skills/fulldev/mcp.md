# shadcn MCP Server

The CLI includes an MCP server that lets AI assistants search, browse, view, and install components from registries. fulldev ui uses that same MCP server through the `@fulldev` registry.

---

## Setup

```bash
shadcn mcp        # start the MCP server (stdio)
shadcn mcp init   # write config for your editor
```

Editor config files:

| Editor | Config file |
|--------|------------|
| Claude Code | `.mcp.json` |
| Cursor | `.cursor/mcp.json` |
| VS Code | `.vscode/mcp.json` |
| OpenCode | `opencode.json` |
| Codex | `~/.codex/config.toml` (manual) |

---

## Tools

> **Tip:** MCP tools handle registry operations (search, view, install). For project configuration such as aliases, framework, Tailwind version, icon library, and resolved paths, use `npx shadcn@latest info` — there is no MCP equivalent.

### `shadcn:get_project_registries`

Returns registry names from `components.json`. Errors if no `components.json` exists.

Use this to confirm the project exposes `@fulldev`.

### `shadcn:list_items_in_registries`

Lists all items from one or more registries.

Example:

```text
registries: ["@fulldev"]
```

### `shadcn:search_items_in_registries`

Fuzzy search across registries.

Search `@fulldev` first:

```text
registries: ["@fulldev"]
query: "button"
```

### `shadcn:view_items_in_registries`

View item details including full file contents.

Example:

```text
items: ["@fulldev/button", "@fulldev/card"]
```

### `shadcn:get_item_examples_from_registries`

Find usage examples and demos with source code.

### `shadcn:get_add_command_for_items`

Returns the CLI install command.

Example:

```text
items: ["@fulldev/button"]
```

### `shadcn:get_audit_checklist`

Returns a checklist for verifying components (imports, deps, lint, TypeScript).

---

## Configuring Registries

Registries are set in `components.json`. The `@shadcn` registry is always built-in. fulldev ui is added as a custom registry:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

- Names must start with `@`.
- URLs must contain `{name}`.
- `${VAR}` references are resolved from environment variables.

Community registry index: `https://ui.shadcn.com/r/registries.json`
