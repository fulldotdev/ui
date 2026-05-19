# Validation Rules

Use the package manager configured by the project. Prefer `pnpm` when the project uses pnpm.

Honor the Node version required by the project's `package.json`.

## Development Loop

Keep development feedback fast:

- Start or reuse the dev server.
- Read dev server logs occasionally, especially after content, routing, layout, or component changes.
- Use browser/manual inspection when UI presentation changed.
- Do not run full checks or builds after every small edit.
- Do not repeatedly restart the dev server unless logs show it is stale or broken.

## Formatting

Format touched files when the change is settled, not after every micro-edit:

```bash
pnpm exec prettier --write <touched-files>
```

Avoid repo-wide formatting unless the user asks for it or the task is explicitly cleanup-oriented.

## Validation

Each project owns its exact validation commands. Inspect `package.json`, project docs, and local agent instructions before choosing commands.

For local validation, run the smallest relevant subset:

1. If formatting changed, run `pnpm exec prettier --write <touched-files>`.
2. If the project has a typecheck or check command and the change affects contracts, run that command.
3. If final validation is requested or warranted, run the project's documented build/check sequence.

For risky structural changes, run the smallest relevant subset instead of the whole validation suite.

## Change Workflow

1. Identify the area touched: content/schema/layout architecture, UI components, blocks, docs/content, styling, or tooling.
2. Keep content, schema, layout, component, block, and registry responsibilities separate.
3. For content/page/layout changes, update content, schema, and layout together.
4. Keep routes thin and `base.astro` shell-only.
5. Prefer existing patterns. If you must diverge, keep the exception local and explain why the normal architecture does not fit.
