# Block Rules

Project blocks commonly live in `src/components/blocks` unless the repo has a different established convention.

Blocks are production-leaning compositions for content-driven Astro sites. They receive project-specific data through props and slots, while layouts map schema-backed content into those props.

## Portability

Blocks should:

- Receive project-specific data through props and slots.
- Stay schema-agnostic.
- Not import page schemas or content collection types.
- Not import from `src/content`, `src/layouts`, route files, or private page architecture.
- Not hardcode content-meaningful icons, entries, CTAs, links, labels, or images when they should vary by project, page, block instance, or locale.
- Let layouts map schema-backed content into block props.

It is fine to hardcode code-owned UX/control icons inside a block.

Layouts importing reusable blocks and passing schema-backed content into them is the preferred orchestration pattern. In client projects, local blocks are application code unless repo-specific instructions say otherwise.

## Block File Shape

For block files:

- Always expose `class?: string`.
- Destructure `class` as `class: className`.
- Apply the class to the outermost block/root component.
- Use `cn("", className)` when forwarding the root class, even when there are no base classes yet.
- Keep block prop types plain and inline.
- Do not import UI component prop types into blocks.
- Use semantic prop names that describe visible content.

Example:

```ts
import { cn } from "@/lib/utils"

type Props = {
  class?: string
  title: string
  description?: string
  buttons?: {
    label: string
    href: string
    icon?: string
    variant?: "default" | "outline" | "secondary" | "ghost"
  }[]
  features: {
    title: string
    description: string
    icon?: string
  }[]
}

const { class: className, title, description, buttons, features } = Astro.props
```

## Prop Naming

Use:

- `label` for buttons, links, nav items, tabs, menu items, form controls, and other interactive/control visible names.
- `title` for headings and named content entities.
- `description` for supporting copy.
- `icon` for content-owned icon names.
- `href` for link destinations.
- `buttons` for CTA/action button arrays.
- Domain-specific plural collection names such as `features`, `services`, `reviews`, `links`, `plans`, `articles`, `logos`, or `faqs`.

Avoid generic block collection names like `items`, `entries`, `cards`, or `actions` unless the block is genuinely generic.

Prop/data naming rules apply only to TypeScript props, content data, schema fields, and local variables that represent data. Never rename Tailwind classes, CSS selectors, `data-*` attributes, slot names, component names, file names, or existing style hooks because of a prop naming rule.

Tailwind utility classes must remain valid Tailwind classes. For example, keep `items-center`, `items-start`, `items-end`, and `justify-between`; never rewrite them to domain terms such as `features-center`, `services-start`, or `contactItems-center`.

## Buttons

For block button rendering, let the block own button size and simple design defaults:

```astro
{
  buttons?.length && (
    <div>
      {buttons.map(({ href, label, icon, ...button }, index) => (
        <Button
          href={href}
          size={icon && !label ? "icon-sm" : "sm"}
          variant={index === 0 ? "default" : "outline"}
          {...button}
        >
          {icon && <Icon name={icon} />}
          {label}
        </Button>
      ))}
    </div>
  )
}
```

Button data should not include `size`; size belongs to the block design. If `target` or `rel` behavior is needed, derive it from `href` in the component where that behavior matters.

## Rendering and Mapping

For conditional rendering:

- Optional arrays: `{buttons?.length && (...)}`
- Optional presentational values: `{description && (...)}`
- Required arrays: map directly with `{features.map(...)}`
- Do not use `? (...) : null` when `&&` communicates the intent.

For mapping:

- Map arrays inline when rendering is direct.
- Derive named values in frontmatter when sorting, filtering, combining sources, computing active state, choosing previous/next, assigning meaningful page data, or converting schema content into block props.
- In layouts, deriving named block props is expected.
- In blocks, avoid over-preparing simple prop data.
