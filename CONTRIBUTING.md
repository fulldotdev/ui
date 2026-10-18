# Contributing to Fulldev UI

Thank you for your interest in contributing to Fulldev UI! We welcome contributions from everyone.

## Code of Conduct

We are here to build great software, learn, grow, and help each other. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

### Prerequisites

- Node.js 24 (`.node-version`)
- pnpm 12 (`packageManager` in `package.json`)
- Git

### Setup

1. **Fork and clone the repository**:

```bash
git clone https://github.com/your-username/ui.git
cd ui
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Start the development server**:

```bash
pnpm dev
```

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/fulldotdev/ui/issues)
2. If not, create a new issue
3. Provide clear steps to reproduce the issue
4. Include screenshots or code snippets if applicable

### Requesting Features

1. Check if the feature has already been requested in [Issues](https://github.com/fulldotdev/ui/issues)
2. If not, create a new issue
3. Clearly describe the feature and its use case

### Submitting Code

1. **Create a new branch**:

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**:
   - Follow existing code style and conventions
   - Use TypeScript for type safety
   - Follow Astro component best practices

3. **Test your changes**:

```bash
vp run check:source  # Format, lint, types and registry
vp run test:unit     # Unit and registry tests
vp run build         # Build the site
vp run check:build   # Validate its HTML and links
```

4. **Commit your changes**:

```bash
git commit -m "feat: add new component"
```

5. **Push and create a Pull Request**:

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with a clear description of your changes.

## Component Guidelines

### Creating New Components

1. Place component files in `src/components/ui/[component-name]/`, exported through its `index.ts`
2. Follow the naming convention: use single-word names when possible
3. Use Astro component syntax (`.astro` files)
4. Include TypeScript types for props
5. Keep structural classes in the component and visual classes in `cn-*` placeholders; see [registry/styles/README.md](registry/styles/README.md)
6. Avoid modifying existing shadcn components to prevent confusion

The React items live in `react/` and the native Liquid items in `liquid/`; see their READMEs. Existing components are the best examples.

## Development Workflow

### Building

```bash
vp run build        # Build the site
vp run check:build  # Validate its HTML and links
vp run fix:source   # Format and apply lint fixes
```

### Registry

```bash
pnpm registry:build    # Build the component registry
```

### Releases

Fulldev UI is versioned with Changesets; a release publishes the registry and the `fulldev-ui` npm package. Add a changeset for user-facing registry, component, block, install, or documentation API changes:

```bash
pnpm changeset
```

Select `fulldev-ui` when prompted. GitHub releases are titled `Fulldev UI vX.Y.Z` and describe the registry hosted at `https://ui.full.dev/r/registry.json`.

## Questions?

- Join our [Discord server](https://discord.gg/tdmUyH2YE4)
- Reach out via [email](mailto:contact@full.dev)

## License

By contributing to Fulldev UI, you agree that your contributions will be licensed under the MIT License.
