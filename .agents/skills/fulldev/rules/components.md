# Components

Use `src/components/ui/<component-name>/`, kebab-case filenames, an `index.ts`
public API and colocated helpers. Follow the project's actual import aliases.

- Define local `type Props` before destructuring `Astro.props` once. Export it
  from an `.astro` file only if an external TypeScript module imports it.
- Let Astro infer props without `: Props` on the destructuring or `as Props`.
  For a complex type, simplify its shape or use `satisfies Props`.
- Use Astro's `HTMLAttributes` or `Polymorphic` helpers for native attributes.
- Destructure `class` as `class: className`, call the remaining pass-through bag
  `props`, merge classes with `cn(...)`, and spread `props` on the intended root
  or control. Preserve required `data-slot` structure and behavior.
- Keep content-specific data out of generic primitives. Use built-in props and
  composition first; local wrappers can hold project-specific behavior.

Customize global appearance in the existing theme's semantic CSS variables;
use component variants for component choices and layouts for page composition.
Do not introduce a second theme layer for a local customization.
