# Component Rules

Reusable UI components live in `src/components/ui/<component-name>/`.

- Use kebab-case filenames throughout the repo.
- Keep one folder per component family.
- Expose the public API through an `index.ts` barrel.
- Keep helper files next to the component they support.
- Use the existing `@/*` import alias for `src/*`.
- Preserve nearby naming and composition patterns.

Prefer existing `@fulldev` components before creating local reusable UI. Local components are application code unless repo-specific instructions say otherwise.

## Astro Frontmatter

Astro frontmatter should make the file's contract obvious:

- Use `type Props`, not `interface Props`.
- Define `type Props` before reading `Astro.props`.
- Let Astro infer prop types from `Props`; do not annotate the assignment or destructuring with `: Props`.
- Destructure `Astro.props` once near the top of the frontmatter.
- Derive local values after destructuring.

Use this pattern:

```ts
type Props = {
  title: string
  description?: string
}

const { title, description } = Astro.props
```

Do not use this pattern:

```ts
const props: Props = Astro.props
const { title }: Props = Astro.props
```

## UI Component Files

For UI component files:

- Type native attributes with Astro's `HTMLAttributes` or `Polymorphic` helpers.
- Destructure `class` as `class: className`.
- Name the remaining pass-through prop bag `props`.
- Merge classes with `cn(...)`.
- Spread `props` on the intended root/control element.
- Preserve required `data-slot` structure and behavior.

Example:

```ts
import type { HTMLAttributes } from "astro/types"

import { cn } from "@/lib/utils"

type Props = HTMLAttributes<"div"> & {
  size?: "default" | "sm"
}

const { class: className, size = "default", ...props } = Astro.props
```

## Fulldev Components

Fulldev UI components are installed with shadcn-compatible tooling from the `@fulldev` registry. Use the `shadcn` skill or `cli.md` for CLI details when needed.

- Install components before recreating them.
- Read installed source when behavior or API is unclear.
- Prefer built-in component props and composition before editing installed component source.
- Use local wrappers when project-specific behavior is needed.
- Keep content-specific data out of generic UI primitives.

## Local Components

When creating local project components:

- Optimize for reusable, content-first Astro composition.
- Keep the public API small, portable, accessible, and consistent with nearby Fulldev components.
- Do not assume local components are part of any registry.
