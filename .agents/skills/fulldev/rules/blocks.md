# Blocks

Blocks live in `src/components/blocks`. Layouts map schema-backed content into
plain block props and slots. Keep reusable blocks independent of page schemas,
collection types, content, layouts, routes and private project assets. Pass
images, labels, links, CTAs and content-owned icons through props when they vary
by project, page, instance or locale. Fixed control icons can be imported in code.

Expose `class?: string`, destructure it as `class: className`, and forward it to
the outermost root through `cn(...)`, including `cn("", className)` without base
classes. Keep prop types plain and inline; do not import UI component prop types.

Use `label` for controls, `title` for headings/entities, `description` for copy,
`icon` for content icon names, `href` for destinations and `buttons` for CTAs.
Name collections by their content, such as `features`, `services` or `reviews`;
use `items` only for genuinely generic data.

These naming rules apply to data. Preserve CSS utilities, selectors, `data-*`
attributes, slots, component/file names and style hooks. `items-center` must
remain `items-center`, never `features-center`.

Button size belongs to the block design, not content data. Derive `target`/`rel`
from `href` in the component when needed. Render direct mappings inline; derive
named values in frontmatter for sorting, filtering, combining sources, active
state and schema-to-block transformations. Guard optional values, and map
required arrays directly.
