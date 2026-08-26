# Changesets

Fulldev UI uses Changesets to version the public registry and publish the npm
package.

Add a changeset for user-facing changes to registry items, install behavior, generated registry metadata, or documented registry APIs:

```bash
pnpm changeset
```

Use `fulldev-ui` as the changed package. GitHub releases are titled
`Fulldev UI vX.Y.Z`, and each version represents both the npm package and the
registry hosted at `https://ui.full.dev/r/registry.json`.

Merging a feature or release-prep PR into `main` lets the release workflow open
the Changesets release PR. Merging that release PR versions the package,
refreshes the lockfile, publishes to npm, and creates the GitHub Release.
