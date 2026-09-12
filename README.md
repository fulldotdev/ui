# Fulldev UI

Open-source Astro components and blocks for developers and AI agents building
content-driven websites.

Fulldev UI is distributed as a shadcn-compatible registry. Install components
and blocks as source files, then customize, extend, and compose them in your own
Astro project.

## Quick start

Add the `@fulldev` registry to `components.json` in your Astro project:

```json
{
  "registries": {
    "@fulldev": "https://ui.full.dev/r/{name}.json"
  }
}
```

Install the shared setup, then any component or block:

```bash
npx shadcn@latest add @fulldev/init -y --overwrite
npx shadcn@latest add @fulldev/button @fulldev/hero-1
```

The full setup for new and existing projects is in the
[installation guide](https://ui.full.dev/docs/installation/).

## Documentation

For humans: visit [ui.full.dev][docs].

For agents: start at [ui.full.dev/llms.txt](https://ui.full.dev/llms.txt) or
the Markdown entry point:

```text
https://ui.full.dev/index.md
```

You can add `.md` to any documentation URL to get Markdown source:

```text
https://ui.full.dev/components/button.md
https://ui.full.dev/blocks/hero.md
```

Assistants that support MCP can search and install items through the
[shadcn MCP server](https://ui.full.dev/docs/mcp/).

## Contributing

Please read the [contributing guide](./CONTRIBUTING.md).

## License

Licensed under the [MIT license](./LICENCE).

[docs]: https://ui.full.dev/
