# Contributing

We're excited by your interest in contributing to fulldev-ui,
Here lay a few resources we wrote to help you do it!

## Repo Structure

This repository is a monorepo.

- We use pnpm and workspaces

```md
.
├── docs/
│   └── src/
│       └── content/
│           └── [categories]/
│               └── [documentation].mdx
├── package/
│   └── src/
│       └── components/
│           └── [categories]/
│               └── [components].astro
```

### /docs

Here lays the documentation of fulldev-ui deployed to [ui.full.dev](https://ui.full.dev).

### /package

The actual component library with it's components and styling.

## Development

### Setup

1. Clone the Github repository in your designated folder:

```bash
git clone https://github.com/fulldotdev/ui.git
```

2. Enter the folder using `cd ui`.

3. Create a new branch:

```bash
git checkout -b my-new-branch
```

1. Install the packages using pnpm:

```bash
pnpm install
```

Make sure to do this in root to make sure you're using the local version of the component package.

1. Run the entire repository (optional)

```bash
pnpm dev
```

### Run a workspace

You can use the `pnpm --filter [WORKSPACE] dev` command to start the development process for a workspace.

#### Workspace Examples

To run the ui.full.dev website:
`pnpm --filter docs dev`

or run it by going to the folder using `cd docs` and running `pnpm dev` there.

## Commit & Pull Requests

### Commit Conduct

For a faster and easier review we advise you to use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

## Community / Contact

Looking to share your work using fulldev-ui, regular talks about it or support join our [discord server](https://discord.gg/tdmUyH2YE4).

## License

MIT License

Copyright (c) 2024 Sil Veltman

For the entire license [read this](https://github.com/fulldotdev/ui/blob/main/LICENCE).
