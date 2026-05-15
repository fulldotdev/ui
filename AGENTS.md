# Fulldev UI Repo Instructions

Use the `fulldev` skill for general Fulldev client-project architecture:

- content/schema/layout separation
- layout-owned page orchestration
- component and block conventions
- Fulldev UI usage through the shadcn CLI
- theming and customization patterns

This repo has extra responsibilities: it is the Fulldev UI registry source, docs site, and reference implementation.

## Maintainer Rules

- Installable UI components live in `src/components/ui/<component-name>/`.
- Installable blocks live in `src/components/blocks`.
- Registry items must be portable outside this docs site.
- Do not import private docs, content, layout, route, global, or schema code from installable registry items.
- Preserve shadcn parity where a component is intentionally shadcn-compatible.
- Fix docs/API mismatches at the implementation source, not by hiding the mismatch in examples.

## Registry Workflow

- `registry.json` is the source of truth for installable items.
- Update `registry.json` when adding/removing installable items, changing file paths, changing registry dependencies, changing npm dependencies, changing metadata, or changing installable source files.
- During normal development, do not rebuild the registry after every edit. Use the dev server and inspect logs first.
- For release prep or when registry output is needed, run `pnpm registry:build`.
- Commit regenerated `public/r/*.json` and `public/r/registry.json` when registry inputs change.
- Treat `public/r` as generated registry output. Do not hand-edit it except when intentionally debugging generated output.
- Treat `dist/` as build output. Do not edit it by hand.
- Docs pages document registry items, but they do not make something installable.

## Local Validation

- Use `pnpm`.
- Node `>=22.12.0` is required by `package.json`.
- This project owns `http://localhost:4321` for local development and preview.
- During development, run or reuse `pnpm dev` and read logs occasionally.
- `pnpm dev` must stop any existing listener on port `4321` before starting Astro on `127.0.0.1:4321`.
- Use `pnpm stop` to close this project's local dev or preview server.
- Use `pnpm preview` for the build-and-preview flow; it also clears port `4321` before starting Astro preview.
- Do not run `pnpm check`, `pnpm build`, or `pnpm registry:build` after every small edit.
- Format touched files when a change is settled.
- For release prep, run `pnpm build`, then `pnpm check`, then formatting/registry generation as needed.
