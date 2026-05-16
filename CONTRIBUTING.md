# Contributing to Fulldev UI

Fulldev UI is the registry source, docs site, and reference implementation for
the `@fulldev` Astro registry. This guide is the shared workflow for human
contributors and AI agents working in this repository.

For product scope, installation, and user-facing positioning, see
[README.md](./README.md).

## Repository Model

- Installable UI components live in `src/components/ui/<component-name>/`.
- Installable blocks live in `src/components/blocks`.
- Registry metadata lives in `registry.json`.
- Generated registry output lives in `public/r`.
- Docs pages live in `src/content/pages` and document installable source; they
  do not make something installable.
- The Fulldev agent skill lives in `.agents/skills/fulldev` and describes
  reusable client-project architecture, not this repo's release process.
- The public `skills` CLI entry lives in `skills/fulldev`. Keep it synced with
  `.agents/skills/fulldev`.

Registry items must be portable outside this docs site. Do not import private
docs, content, layout, route, global, schema code, placeholder media, or other
project-owned assets from installable registry items. Images rendered by
installable blocks must come through props.

Examples and docs must reflect installable source. When docs and implementation
disagree, fix the source contract or registry metadata first, then update docs.

## Local Workflow

Use the package manager, Node settings, and scripts declared by the repo. During
normal development, prefer the dev server and focused inspection over full local
validation after every edit.

Common flow:

```bash
pnpm install
pnpm dev
```

This project owns `http://localhost:4321` for local development and preview.
Use `pnpm stop` to close this project's local dev or preview server.

Format touched files when a change is settled:

```bash
pnpm exec prettier --write <touched-files>
```

Avoid repo-wide formatting unless the change is explicitly formatting-focused.

## Component and Block Changes

Preserve shadcn parity where a component is intentionally shadcn-compatible.

Use direct static SVG imports with an `Icon` suffix for fixed code-owned icons.
Use the `Icon` component only for content/config-owned icon names.

For source examples, prefer existing installable items over synthetic snippets:

- UI component source: `src/components/ui`
- Block source: `src/components/blocks`
- Component docs: `src/content/pages/components`
- Block docs: `src/content/pages/blocks`
- Registry metadata: `registry.json`

## Registry Workflow

`registry.json` is the source of truth for installable items. Update it when
adding or removing installable items, changing file paths, registry
dependencies, npm dependencies, metadata, or installable source files.

During normal development, do not rebuild the registry after every edit. Run
`pnpm registry:build` when preparing a PR or release that changed registry
inputs, when generated registry output is explicitly needed, or when validating
registry drift.

Commit regenerated `public/r/*.json` and `public/r/registry.json` when registry
inputs change. Treat `public/r` as generated output and do not hand-edit it
except when intentionally debugging generated output. Treat `dist/` as build
output.

## Validation and CI

CI runs formatting, type checking, registry drift checks, and the production
build for pull requests.

For local validation, run the smallest relevant subset:

- Formatting-only changes: `pnpm exec prettier --write <touched-files>`.
- Registry input changes: `pnpm registry:build`, then review and commit the
  generated `public/r` output.
- Final local validation when requested or risky: run the same categories CI
  covers.

## Releases

Fulldev UI is versioned with Changesets and published to npm. Add a changeset
for user-facing registry, component, block, install, or documentation API
changes:

```bash
pnpm changeset
```

Select `fulldev-ui` when prompted. Each version represents the npm package and
the registry hosted at `https://ui.full.dev/r/registry.json`.

Release PRs are created by the GitHub release workflow. It runs the release
script, which versions the package with Changesets and refreshes the lockfile.
After that release PR is merged, Changesets publishes the package and creates
the GitHub Release.

## Community

- Read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.
- Join our [Discord server](https://discord.gg/tdmUyH2YE4)
- Reach out via [email](mailto:contact@full.dev)

By contributing to Fulldev UI, you agree that your contributions will be
licensed under the MIT License.
