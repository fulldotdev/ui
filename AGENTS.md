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
- Import another component through its index (`@/components/ui/<name>`) and a file of the same component with `./`. ESLint enforces it, so a site's knip sees every part of a component it uses.
- Preserve shadcn parity where a component is intentionally shadcn-compatible.
- Fix docs/API mismatches at the implementation source, not by hiding the mismatch in examples.
- Visual classes in installable UI components are `cn-*` placeholders that each shadcn/ui style fills in. Follow `registry/styles/README.md` when adding or changing component styling.

## Registry Workflow

- `registry.json` is the source of truth for installable items.
- Update `registry.json` when adding/removing installable items, changing file paths, changing registry dependencies, changing npm dependencies, changing metadata, or changing installable source files.
- During normal development, do not rebuild the registry after every edit. Use the dev server and inspect logs first.
- For release prep or when registry output is needed, run `pnpm registry:build`.
- Commit regenerated `public/r/*.json` and `public/r/registry.json` when registry inputs change.
- Treat `public/r` as generated registry output. Do not hand-edit it except when intentionally debugging generated output.
- Treat `dist/` as build output. Do not edit it by hand.
- Docs pages document registry items, but they do not make something installable.

## Updating Client Sites

- `scripts/update-site.mjs` brings the Fulldev UI items installed in a client site up to date and keeps the site's edits. Its header comment explains each step.
- Run it inside a worktree of the site on a fresh branch from `main`, after installing the site's dependencies, with this checkout on an up-to-date `main`: `node ~/projects/ui/scripts/update-site.mjs`. It formats with the site's Prettier to compare; without it, files that differ only in formatting count as custom.
- Without `--write` it is a dry run: it only reports which installed files are current, an unmodified older release (`old`), or edited (`custom`). It compares against the built history in `public/r` for the site's style, so keep committing `public/r`.
- `--write` needs a clean git worktree. It reinstalls through the shadcn CLI from the live registry, three-way merges edited files, and on a conflict, or for any other file the install changed apart from package files and `components.json`, keeps the local file and writes the new version next to it as `<file>.upstream`.
- Before committing, review every file in `merged` and `conflicts`, fold in upstream fixes by hand, and delete the `.upstream` files. `--report <file>` also saves the report.

## Local Validation

- Use `pnpm`.
- Node `>=22.12.0` is required by `package.json`.
- This project owns `http://localhost:4321` for local development and preview.
- During development, run or reuse `pnpm dev` and read logs occasionally.
- `pnpm dev` must stop any existing listener on port `4321` before starting Astro on `127.0.0.1:4321`.
- For tailnet review from Otis, run `pnpm stop && pnpm exec astro dev --host 0.0.0.0 --port 4321`, then `tailscale serve --bg http://127.0.0.1:4321`; share `https://otis.tailb5cb80.ts.net/` and stop with `tailscale serve --https=443 off`.
- Use `pnpm stop` to close this project's local dev or preview server.
- Use `pnpm preview` for the build-and-preview flow; it also clears port `4321` before starting Astro preview.
- Do not run `pnpm check`, `pnpm build`, or `pnpm registry:build` after every small edit.
- Format touched files when a change is settled.
- For release prep, run `pnpm check` (which also regenerates and compares the registry) and `pnpm build` (which validates the HTML). `pnpm fix` formats and applies lint fixes.
