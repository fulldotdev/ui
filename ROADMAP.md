# Roadmap

## Overall focus

- **Developer experience**: Help developers build content-driven Astro websites faster with clean, predictable APIs that are easy for AI agents to understand.
- **Content editor experience**: Keep architecture modular so content editors can manage pages and blocks independently.

## v0.8 release strategy (single release)

This version is focused on reliability, stability, minimalism, and simplicity.

### Non-negotiable rules

- ShadCN API coherence comes first (props, variants, naming, styling semantics).
- Interactive components must use `data-slot`.
- New components in this version must be supported by `data-slot`.
- Keep code surface small: prefer replacing/removing custom interaction code over adding wrappers.
- No net-new primitives are required for v0.8 release hardening.

### Reference inputs

- `data-slot`: https://github.com/bejamas/data-slot
- `bejamas/ui`: https://github.com/bejamas/ui
- `shadcn/ui`: https://github.com/shadcn-ui/ui
- `bearnie`: https://github.com/michael-andreuzza/bearnie

### Quality infrastructure requirements

- Add CI workflow with:
  - `bun run check`
  - `bun run lint`
  - `bun run test` (Vitest only)
  - `bun run build`
  - `bun run registry:build`
  - registry drift check
- Add linting with bug-risk-focused rules (avoid style-only friction).
- Add Vitest coverage for:
  - core utility logic
  - baseline accessibility checks using `vitest-axe`
- Optionally add Lighthouse CI in non-blocking mode for trend visibility.

### Definitive PR queue (no fixed dates)

1. `PR-01` Scope lock and docs alignment for v0.8 policy.
2. `PR-02` Quality infrastructure (CI + lint + Vitest + registry drift checks).
3. `PR-03` Deterministic build hardening (external fetch/font fallbacks).
4. `PR-04` ShadCN API coherence pass (before migration).
5. `PR-05` `data-slot` migration: `accordion`, `collapsible`.
6. `PR-06` `data-slot` migration: `tabs`.
7. `PR-07` Cleanup and packaging integrity (remove dead/empty artifacts, align docs/config).
8. `PR-08` Release candidate + final stabilization + v0.8 release notes.

### Branching model for v0.8

- Integration branch: `codex/0.8`.
- Working branches: short-lived branches from `codex/0.8` per PR.
- Merge target for all v0.8 PRs: `codex/0.8`.
- After release hardening, merge `codex/0.8` back to the default branch.

## Post-v0.8 direction

- Resume broader component and block expansion after the reliability baseline is stable.
- Expand interaction coverage for migrated primitives (`dialog`, `sheet`, `navigation-menu`) and deeper accessibility test scenarios.
- Revisit `data-slot` migration for `dialog` and `sheet`.
- Add `tooltip` and `popover` (+ docs + registry entries) in the next planned release phase.
- Revisit additional features (e-commerce, expanded primitives, theme presets) in a later release.
