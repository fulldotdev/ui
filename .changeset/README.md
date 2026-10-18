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

Merging a PR with a changeset into `main` lets the release workflow open or
update the Changesets release PR, which versions the package and refreshes the
lockfile. Merging that release PR publishes to npm and creates the GitHub
Release.
