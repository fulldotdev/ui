# Validation Rules

Use the package manager configured by the project. Prefer `pnpm` when the project uses pnpm.

Honor the Node version required by the project's `package.json`.

## Development Loop

Keep development feedback fast:

- Start or reuse the dev server.
- Read dev server logs occasionally, especially after content, routing, layout, or component changes.
- Use browser/manual inspection when UI presentation changed.
- Do not run `check` or `build` after every small edit.
- Do not repeatedly restart the dev server unless logs show it is stale or broken.

## Formatting

Format touched files when the change is settled, not after every micro-edit:

```bash
pnpm prettier <touched-files>
```

## Release Validation

For release prep, run the heavier checks once:

1. Run `pnpm build`.
2. Run `pnpm check`.
3. Run `pnpm prettier <touched-files>` or the project formatting command if formatting has not already been applied.
4. If registry inputs changed, run the repo-specific registry build command from local instructions.

For risky structural changes, run the smallest relevant subset instead of the whole release sequence.

## Change Workflow

1. Identify the area touched: content/schema/layout architecture, UI components, blocks, docs/content, styling, or tooling.
2. Keep content, schema, layout, component, block, and registry responsibilities separate.
3. For content/page/layout changes, update content, schema, and layout together.
4. Keep routes thin and `base.astro` shell-only.
5. Prefer existing patterns. If you must diverge, keep the exception local and explain why the normal architecture does not fit.
