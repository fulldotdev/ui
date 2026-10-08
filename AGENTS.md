# Fulldev UI

This repository is the Fulldev UI registry source, docs site and reference implementation. For conventions in client projects, use the `fulldev` skill in `.agents/skills`.

## Components

- Installable UI components live in `src/components/ui/<component-name>/` and blocks in `src/components/blocks`.
- Registry items must be portable outside this docs site. Do not import private docs, content, layout, route, global, or schema code from them.
- Import another component through its index (`@/components/ui/<name>`) and a file of the same component with `./`. ESLint enforces it, so a site's knip sees every part of a component it uses.
- Preserve shadcn parity where a component is intentionally shadcn-compatible.
- Fix docs/API mismatches at the implementation source, not by hiding the mismatch in examples.
- Visual classes in installable UI components are `cn-*` placeholders that each shadcn/ui style fills in. Follow `registry/styles/README.md` when adding or changing component styling.

## Registry

- `registry.json` is the source of truth for installable items. Update it when you add or remove an item or change its files or dependencies. `pnpm registry:meta`, part of `pnpm registry:build`, syncs titles, descriptions, categories and docs links from the docs page frontmatter.
- Docs pages document registry items, but they do not make something installable.
- `public/r` is generated registry output; do not hand-edit it. Run `pnpm registry:build` when registry inputs change and commit the result: `pnpm check` rebuilds the registry and fails on a difference.

## Updating client sites

`scripts/update-site.mjs` brings the Fulldev UI items installed in a client site up to date and keeps the site's edits; its header comment has the usage and steps. It compares against the built history in `public/r` for the site's style, so keep committing `public/r`. It formats with the site's Prettier to compare; without it, files that differ only in formatting count as custom.
