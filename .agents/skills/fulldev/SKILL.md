---
name: fulldev
description: Manages fulldev ui components and projects — adding, searching, fixing, debugging, styling, and composing UI through the shadcn CLI. Provides project context, component docs, and usage examples. Applies when working with fulldev ui, @fulldev registry items, ui.full.dev, Astro component registries, or any project with a components.json file configured for the fulldev registry.
user-invocable: false
allowed-tools: Bash(npx shadcn@latest *), Bash(pnpm dlx shadcn@latest *), Bash(bunx --bun shadcn@latest *)
---

# fulldev ui

fulldev ui is a shadcn-compatible registry built for Astro projects. It keeps the shadcn CLI workflow, but the shipped components are Astro-first and based on `@data-slot/*` primitives.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest` based on the project's `packageManager`. Examples below use `npx shadcn@latest` but substitute the correct runner for the project.

## Current Project Context

```json
!`npx shadcn@latest info --json`
```

The JSON above contains the project config and installed components. Use `npx shadcn@latest docs <component>` to get documentation and example URLs for shared shadcn primitives. Use `npx shadcn@latest view @fulldev/<item>` to inspect fulldev registry items directly.

## Principles

1. **Use existing components first.** Search `@fulldev` before writing custom UI for Astro or content-driven work.
2. **Compose, don't reinvent.** Settings page = Card + form controls. Marketing page = Section + Item/List + Button + media primitives.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.
5. **Stay Astro-first.** Prefer `.astro` components, slots, and server-rendered markup. Do not introduce React client components unless the codebase already uses them or the user explicitly asks for them.

## fulldev Setup

Before adding `@fulldev` components in a project, verify:

- `components.json` includes the `@fulldev` registry:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

- `tsconfig.json` maps `@/*` to `./src/*`.
- The project includes the fulldev base stylesheet derived from `src/styles/global.css`.
- The root layout wrapper is container-aware when using fulldev responsive patterns:

```astro
---
import "@/styles/global.css"
---

<body class="@container">
  <slot />
</body>
```

`@2xl:` and `@max-*:` variants are intentional container-query variants. Do not convert them to viewport breakpoints like `2xl:`.

## Critical Rules

These rules are always enforced. Each links to a file with incorrect/correct code pairs or fulldev-specific guidance.

### Astro & Data Slot → [data-slot.md](./rules/data-slot.md)

- **fulldev ui does not branch between `base` and `radix`.** Use the shipped Astro wrappers and data-slot patterns instead.
- **Do not use `asChild`, `render`, or `nativeButton`.** Those are not fulldev ui patterns.
- **Use `class` in Astro templates** and `className` only in JSX/TSX files.
- **Prefer the provided trigger components** such as `DialogTrigger`, `SheetTrigger`, and `AlertDialogTrigger` instead of wrapping lower-level primitives manually.

### Styling & Tailwind → [styling.md](./rules/styling.md)

- **`class`/`className` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`. For vertical stacks, `flex flex-col gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`, `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal ternaries.
- **No manual `z-index` on overlay components.** Dialog, Sheet, Popover, etc. handle their own stacking.

### Forms & Inputs → [forms.md](./rules/forms.md)

- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*` or `grid gap-*` for form layout.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.** Never raw `Input`/`Textarea` inside `InputGroup`.
- **Buttons inside inputs use `InputGroup` + `InputGroupAddon`.**
- **Use `RadioGroup` for small mutually exclusive option sets.** Don't loop `Button` with manual active state.
- **`FieldSet` + `FieldLegend` for grouping related checkboxes/radios.** Don't use a `div` with a heading.
- **Field validation uses `data-invalid` + `aria-invalid`.** `data-invalid` on `Field`, `aria-invalid` on the control. For disabled: `data-disabled` on `Field`, `disabled` on the control.

### Component Structure → [composition.md](./rules/composition.md)

- **Items always inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`. `CommandItem` → `CommandGroup`.
- **Dialog, Sheet, and AlertDialog always need a Title.** `DialogTitle`, `SheetTitle`, `AlertDialogTitle` are required for accessibility. Use `class="sr-only"` if visually hidden.
- **Use full Card composition.** `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`. Don't dump everything in `CardContent`.
- **Button has no `isPending`/`isLoading`.** Compose with `Spinner`, `data-icon`, and `disabled`.
- **`TabsTrigger` must be inside `TabsList`.** Never render triggers directly in `Tabs`.
- **`Avatar` always needs `AvatarFallback`.** For when the image fails to load.

### Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

- **Use existing components before custom markup.** Check if a component exists before writing a styled `div`.
- **Callouts use `Alert`.** Don't build custom styled divs.
- **Empty states use `Empty`.** Don't build custom empty state markup.
- **Use `Separator`** instead of `<hr>` or `<div class="border-t">`.
- **Use `Skeleton`** for loading placeholders. No custom `animate-pulse` divs.
- **Use `Badge`** instead of custom styled spans.

### Icons → [icons.md](./rules/icons.md)

- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"` or `data-icon="inline-end"` on the icon.
- **No sizing classes on icons inside components.** Components handle icon sizing via CSS. No `size-4` or `w-4 h-4`.
- **Pass icons as objects, not string keys.** `icon={CheckIcon}`, not a string lookup.
- **Use the configured Astro icon package.** For example, `iconLibrary: lucide` means `@lucide/astro`, not `lucide-react`.

### CLI

- **Never decode or fetch preset codes manually.** Pass them directly to `npx shadcn@latest apply --preset <code>` for existing projects, or `npx shadcn@latest init --preset <code>` when initializing.

## Key Patterns

These are the most common patterns that differentiate correct fulldev ui code. For edge cases, see the linked rule files above.

```astro
---
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
---

<FieldGroup>
  <Field>
    <FieldLabel for="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>
```

```astro
---
import { SearchIcon } from "@lucide/astro"
import { Button } from "@/components/ui/button"
---

<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

```astro
<div class="flex flex-col gap-4">
  <Input />
  <Input />
</div>
```

## Component Selection

| Need | Use |
| --- | --- |
| Button/action | `Button` with appropriate variant |
| Form inputs | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `Slider`, `NativeSelect` |
| Data display | `Table`, `Card`, `Badge`, `Avatar`, `Item`, `List` |
| Navigation | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs` |
| Overlays | `Dialog`, `Sheet`, `AlertDialog`, `Popover`, `Tooltip`, `DropdownMenu` |
| Feedback | `Alert`, `Skeleton`, `Spinner` |
| Layout | `Card`, `Separator`, `Accordion`, `Collapsible`, `Section`, `Layout`, `Container` |
| Empty states | `Empty` |
| Media/content | `Image`, `Video`, `Logo`, `Price`, `Rating` |

## Key Fields

The injected project context contains these key fields:

- **`aliases`** → use the actual alias prefix for imports (e.g. `@/`, `~/`), never hardcode.
- **`framework`** → prefer Astro patterns when this is an Astro project.
- **`tailwindVersion`** → `"v4"` uses `@theme inline` blocks; `"v3"` uses `tailwind.config.js`.
- **`tailwindCssFile`** → the global CSS file where custom CSS variables are defined. Always edit this file, never create a new one.
- **`style`** → component visual treatment (for example `base-vega`).
- **`iconLibrary`** → determines icon imports. Use the matching Astro icon package and never assume React icon packages.
- **`resolvedPaths`** → exact file-system destinations for components, utils, hooks, etc.
- **`packageManager`** → use this for any non-shadcn dependency installs.

See [cli.md](./cli.md) for the full field reference.

## Component Docs, Examples, and Usage

Run `npx shadcn@latest docs <component>` to get the URLs for shared component documentation, examples, and API reference. Fetch those URLs to get the actual content.

```bash
npx shadcn@latest docs input button
```

For fulldev registry items, prefer `npx shadcn@latest view @fulldev/<item>` or `npx shadcn@latest add @fulldev/<item> --dry-run` to inspect what would be installed into the current project.

## Workflow

1. **Get project context** — already injected above. Run `npx shadcn@latest info` again if you need to refresh.
2. **Check fulldev setup first** — before running `add`, ensure `components.json` contains `@fulldev`, the alias setup is correct, the fulldev base stylesheet is present, and the app shell is container-aware when needed.
3. **Check installed components first** — before running `add`, always check the `components` list from project context or list the `resolvedPaths.ui` directory. Don't import components that haven't been added, and don't re-add ones already installed.
4. **Find components** — search `@fulldev` first. Fall back to `@shadcn` or another explicit registry only when fulldev does not provide the needed component.
5. **Get docs and examples** — run `npx shadcn@latest docs <component>` for shared primitives, then fetch the URLs. Use `npx shadcn@latest view @fulldev/<item>` to browse fulldev registry items you haven't installed. To preview changes to installed components, use `npx shadcn@latest add --diff`.
6. **Install or update** — `npx shadcn@latest add`. When updating existing components, use `--dry-run` and `--diff` to preview changes first.
7. **Review added components** — after adding a component or block from any registry, always read the added files and verify they are correct. Check for missing sub-components, missing imports, incorrect composition, invalid Astro syntax, or violations of the Critical Rules.
8. **Preserve Astro-first patterns** — use `.astro` components, slots, `class`, and data-slot APIs unless the project clearly uses another pattern.

## Updating Components

When the user asks to update a component from upstream while keeping local changes, use `--dry-run` and `--diff` to intelligently merge. **NEVER fetch raw files from GitHub manually — always use the CLI.**

1. Run `npx shadcn@latest add <component> --dry-run` to see all files that would be affected.
2. For each file, run `npx shadcn@latest add <component> --diff <file>` to see what changed upstream vs local.
3. Decide per file based on the diff:
   - No local changes → safe to overwrite.
   - Has local changes → read the local file, analyze the diff, and apply upstream updates while preserving local modifications.
   - User says "just update everything" → use `--overwrite`, but confirm first.
4. **Never use `--overwrite` without the user's explicit approval.**

## Quick Reference

```bash
# Initialize an existing Astro project.
npx shadcn@latest init

# Add fulldev ui components.
npx shadcn@latest add @fulldev/button
npx shadcn@latest add @fulldev/button @fulldev/item @fulldev/list
npx shadcn@latest add @fulldev/components

# Preview changes before adding or updating.
npx shadcn@latest add @fulldev/button --dry-run
npx shadcn@latest add @fulldev/button --diff button.astro

# Search registries.
npx shadcn@latest search @fulldev -q "button"
npx shadcn@latest search @shadcn -q "button"

# Get shared docs and example URLs.
npx shadcn@latest docs input button

# View registry item details.
npx shadcn@latest view @fulldev/button
```

## Detailed References

- [rules/forms.md](./rules/forms.md) — `FieldGroup`, `Field`, `InputGroup`, validation states
- [rules/composition.md](./rules/composition.md) — Groups, overlays, Card, Tabs, Avatar, Alert, Empty, Separator, Skeleton, Badge, Button loading
- [rules/icons.md](./rules/icons.md) — `data-icon`, icon sizing, passing icons as objects
- [rules/styling.md](./rules/styling.md) — Semantic colors, variants, `class`/`className`, spacing, size, truncate, dark mode, `cn()`, z-index
- [rules/data-slot.md](./rules/data-slot.md) — data-slot APIs, trigger patterns, `Button as`, `Select`, `Combobox`, `Slider`, `Switch`
- [cli.md](./cli.md) — Commands, flags, presets, templates
- [customization.md](./customization.md) — Theming, CSS variables, extending components
