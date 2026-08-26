---
name: ui-upstream-sync
description: Audit and update the existing Fulldev Astro UI registry against current data-slot and shadcn/ui Base UI Vega. Use for periodic whole-library upstream parity passes, not ordinary single-component edits.
---

# Fulldev UI upstream sync

Use this skill only in the Fulldev UI registry source. The goal is a deliberate upstream parity pass across components that already exist in this repo.

## Invariants

- Audit data-slot first, then shadcn/ui. Finish each pass sequentially so the source of every change stays clear.
- Do not add upstream components or subcomponents that this library does not already have unless the user asks.
- Treat Base UI with the Vega style as the shadcn comparison baseline. Do not accept the current CLI default if it differs.
- Preserve Astro APIs, data-slot behavior, forwarded props, state attributes, keyboard behavior, and accessibility.
- Port useful HTML, classes, variants, and public defaults. Do not port React-only state, refs, hooks, or composition that conflicts with data-slot.
- Do not copy theme-dependent classes unless this repo defines the required token. For example, `font-heading` is a no-op without a heading-font mapping.
- Treat `registry.json` as source and `public/r` as generated output. Never hand-edit generated registry files.

## Prepare the audit

1. Read `AGENTS.md`, inspect `git status`, and preserve unrelated work.
2. Inventory existing component families from `src/components/ui`, their docs pages, and their `registry.json` items.
3. Record package and lockfile versions, every `@data-slot/*` import, and the pre-audit generated-file diff.
4. Maintain a component matrix with `data-slot`, `shadcn`, `source`, `registry`, `browser`, and `notes` columns. Mark every existing family, including unchanged ones.
5. If the pass is large enough to delegate, assign disjoint component ranges and state file ownership before work starts. Keep one owner for shared registry files.

## Pass 1: data-slot

1. Resolve the installed data-slot versions from the manifest and lockfile.
2. Check current official package metadata, upstream source, releases, docs, and repository Markdown. A matching package version does not prove local wrappers are current.
3. Audit every existing family that uses data-slot. Compare primitive APIs, wrapper defaults, forwarded props, event and dismissal behavior, state attributes, selectors, orientation and disabled data, and docs usage.
4. Distinguish these outcomes in the matrix:
   - package update required
   - wrapper update required with no package bump
   - docs or example mismatch
   - reviewed and current
5. Apply the smallest source changes that restore current behavior. Verify unusual Tailwind data selectors compile instead of assuming they work.

## Pass 2: shadcn/ui

1. Create a throwaway project outside the repo with `mktemp -d`.
2. Inspect current CLI help, then create a Vite project using Base UI and the Vega preset. The last known form is:

   ```bash
   pnpm dlx shadcn@latest create --template vite --base base --preset vega
   pnpm dlx shadcn@latest add --all
   ```

3. Use `pnpm dlx shadcn@latest docs <component>` for current official component docs.
4. Intersect the scratch project's components with this repo's existing families. Do not expand the audit to missing components.
5. Compare each matching family sequentially. Check markup order, class names, variants, sizes, default props, data attributes, focus and validation states, icon treatment, RTL behavior, and accessibility.
6. Adapt relevant differences to Astro and data-slot. Record intentional differences instead of forcing literal parity.

## Registry and generated output

1. Update `registry.json` when installable source, npm dependencies, registry dependencies, file paths, or metadata changed.
2. Check source imports against both dependency lists. Do not rely on the old manifest being complete.
3. Before regeneration, capture which source and registry items changed. After `pnpm registry:build`, separate:
   - outputs caused by this audit
   - previously stale generated outputs refreshed by the build
4. Report that distinction. A large JSON diff must never obscure a small source diff.
5. If the full registry build references missing source files, do not invent files or hand-edit output. Report or resolve the source-of-truth problem before calling the release ready.

## Validation and handoff

1. Format settled source and manifest changes.
2. Follow the release validation order in `AGENTS.md`.
3. Run the dev server and inspect every changed component page in a real browser. Exercise relevant keyboard, pointer, open and close, selection, disabled, and RTL behavior. Check the browser console and server logs.
4. Use the Otis sharing instruction in `AGENTS.md` when the user needs tailnet access.
5. Give a concise per-family report. For each changed family, name the source change, whether it came from data-slot, shadcn, registry metadata, or more than one, and include its preview URL.
6. Also list reviewed unchanged families, validation results, intentional differences, generated-only drift, and release blockers.
