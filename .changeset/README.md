# Changesets

Fulldev UI uses Changesets to version the public registry, not to publish an npm package.

Add a changeset for user-facing changes to registry items, install behavior, generated registry metadata, or documented registry APIs:

```bash
pnpm changeset
```

Use `fulldev-ui` as the changed package. GitHub releases are titled `Fulldev UI vX.Y.Z`, and each version represents the registry hosted at `https://ui.full.dev/r/registry.json`.
