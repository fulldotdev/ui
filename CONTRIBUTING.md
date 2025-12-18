# Contributing to Fulldev UI

Thank you for your interest in contributing to Fulldev UI! We welcome contributions from everyone.

## Code of Conduct

We are here to build great software, learn, grow, and help each other. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended package manager)
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
2. If not, create a new issue using the bug report template
3. Provide clear steps to reproduce the issue
4. Include screenshots or code snippets if applicable

### Requesting Features

1. Check if the feature has already been requested in [Issues](https://github.com/fulldotdev/ui/issues)
2. Create a new issue using the feature request template
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
   - Ensure components follow the shared schema in `src/lib/schemas.ts`

3. **Test your changes**:

```bash
pnpm check    # Type checking
pnpm build    # Build the project
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

1. Place component files in `src/components/ui/[component-name]/`
2. Follow the naming convention: use single-word names when possible
3. Use Astro component syntax (`.astro` files)
4. Include TypeScript types for props
5. Use Tailwind CSS for styling with primary/secondary color variables
6. Avoid modifying existing shadcn components to prevent confusion

### Example Component Structure

```astro
---
interface Props {
  title?: string
  variant?: "default" | "outline"
}

const { title, variant = "default" } = Astro.props

const slot = await Astro.slots.render("default")
---

<div class="component-name">
  {title && <h2>{title}</h2>}
  <Fragment set:html={slot} />
</div>
```

## Development Workflow

### Building

```bash
pnpm build          # Build the project
pnpm build:prod     # Type check + build
pnpm build:test     # Type check + build + preview
```

### Registry

```bash
pnpm registry:build    # Build the component registry
```

## Questions?

- Join our [Discord server](https://discord.gg/tdmUyH2YE4)
- Reach out via [email](mailto:contact@full.dev)

## License

By contributing to fulldev/ui, you agree that your contributions will be licensed under the MIT License.
