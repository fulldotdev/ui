# Fulldev UI Agent Instructions

Use [CONTRIBUTING.md](./CONTRIBUTING.md) as the canonical repository workflow
for contributors and AI agents. Use the local `fulldev` skill for reusable
Fulldev architecture doctrine: content/schema/layout separation, layout-owned
page orchestration, component and block boundaries, shadcn-compatible installs,
and theming patterns.

This repo has extra responsibilities: it is the Fulldev UI registry source,
docs site, and reference implementation.

## Agent Guardrails

- Preserve user or agent changes already present in the worktree.
- Keep installable registry items portable outside this docs site.
- Do not import private docs, content, layout, route, global, schema code,
  placeholder media, or other project-owned assets from installable registry
  items.
- Images rendered by installable blocks must come through props.
- Use direct static SVG imports with an `Icon` suffix for fixed code-owned
  icons. Use the `Icon` component only for content/config-owned icon names.
- Preserve shadcn parity where a component is intentionally shadcn-compatible.
- Examples and docs must reflect installable source. When docs and
  implementation disagree, fix the source contract or registry metadata first,
  then update docs.

## Workflow Notes

- Follow [CONTRIBUTING.md](./CONTRIBUTING.md) for registry, validation, CI, and
  release workflow.
- Keep `skills/fulldev` synced with `.agents/skills/fulldev` when changing the
  Fulldev skill.
- During development, run or reuse `pnpm dev` and inspect logs occasionally.
- This project owns `http://localhost:4321` for local development and preview.
- Do not run full validation or rebuild generated registry output after every
  small edit.
- Format touched files when a change is settled.
- Treat `public/r` and `dist/` as generated output.
