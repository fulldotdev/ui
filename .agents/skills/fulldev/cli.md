# Install Fulldev UI

Use the shadcn CLI with the project's package runner, such as `pnpm dlx shadcn@latest`.
There is no separate Fulldev CLI. When `components.json` is missing, initialize
from the Fulldev UI base in the project's style. It writes `components.json`
with the `@fulldev` registry, adds the theme tokens to the stylesheet in
`components.json`, and installs `cn` and the shared dependencies:

```bash
pnpm dlx shadcn@latest init https://ui.full.dev/r/styles/base-vega/base.json
pnpm dlx shadcn@latest add @fulldev/button
```

When `components.json` exists, do not run `init`, because it replaces the theme
tokens. Set `style` to a `base-` style if it is a legacy or `radix-` style, add
the registry entry, then `add @fulldev/init`, which adds the helpers and base
styles and leaves the theme tokens alone:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/styles/{style}/{name}.json"
  }
}
```

`@fulldev/components` and `@fulldev/blocks` are bulk installs, for requests that
need the full sets.

Use shadcn's existing inspection and install tooling. `components.json` owns
registry URLs and aliases; adjust hardcoded imports from registry items to the
project's actual aliases.
