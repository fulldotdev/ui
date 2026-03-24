# Repository Rules

- Any change merged into `main` must include a version bump. Update the project version in `package.json` as part of the same change.
- Any release to `main` must also publish GitHub Release notes for that version. This can be done via the GitHub CLI with `gh release create` or by editing the corresponding GitHub release if the tag already exists.
