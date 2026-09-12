---
name: fulldev
description: Apply Fulldev's content, schema, layout, component and block conventions in Astro client projects, and install UI from the @fulldev registry.
---

# Fulldev

Follow the project's existing architecture and repository workflow. These are
Fulldev client conventions, not a request to migrate a project or change the
Fulldev UI library. Mention useful library improvements at handoff when relevant.

Content owns copy and semantic configuration; schemas validate it; layouts map
it into component and block props. Components and blocks own rendering,
behavior and styles. Routes stay generic and the base layout stays a shared shell.

Use existing `@fulldev` components and blocks before creating equivalents.
Install through shadcn using the project's `components.json`; see
[installation](cli.md) for shared setup and registry details. Read installed
source for the actual API. Local components are application code unless the
repository says otherwise.

Read the relevant rules when changing:

- [Content and schemas](rules/source-ownership.md): authored data, globals and icons.
- [Layouts and routes](rules/layouts.md): page orchestration and new page types.
- [Components](rules/components.md): Astro props, class forwarding and customization.
- [Blocks](rules/blocks.md): portable sections, semantic props and content mapping.

Use the repository's own development and validation instructions.
