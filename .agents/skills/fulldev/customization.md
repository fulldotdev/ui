# Fulldev Customization

Fulldev UI follows the shadcn-style semantic token model. Prefer changing theme variables and composing installed components before editing component source.

## Theming Order

1. Change semantic CSS variables.
2. Use built-in component props or variants.
3. Compose local wrappers or project components.
4. Edit installed component source only when the desired behavior belongs to the component itself.

## Semantic Tokens

Use semantic utilities and CSS variables such as:

- `bg-background` / `text-foreground`
- `bg-card` / `text-card-foreground`
- `bg-primary` / `text-primary-foreground`
- `bg-secondary` / `text-secondary-foreground`
- `text-muted-foreground`
- `border-border`
- `ring-ring`

Avoid raw project colors in reusable components when a semantic token fits.

## Tailwind and CSS Variables

Use `npx shadcn@latest info` to find the project's Tailwind CSS file and Tailwind version. Edit the existing global CSS file; do not create a second theme entrypoint unless the project already has that convention.

For Tailwind v4, register custom token mappings in `@theme inline` when needed. For Tailwind v3, use the project's Tailwind config.

## Component Customization

Prefer local composition for project-specific behavior:

```astro
---
import { Button } from "@/components/ui/button"

type Props = {
  href: string
  label: string
}

const { href, label } = Astro.props
---

<Button href={href} variant="outline">{label}</Button>
```

Edit installed component source when the change is a reusable behavior or API correction that should apply everywhere in the project.

## Content Boundary

Content may choose semantic values such as `tone`, `icon`, `label`, `href`, and `description`. Content should not choose Tailwind classes, DOM structure, imported icons, or raw SVG/HTML.
