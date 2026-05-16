import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

export const prerender = true

const agentPreamble = `# Fulldev UI Agent Entry Point

Navigation: [/sitemap.md](/sitemap.md)

If you are an AI agent, treat this page as the entry point for Fulldev UI. Install the Fulldev skill first if your environment supports skills, then read the relevant Markdown pages before editing a project.

\`\`\`bash
npx -y skills add fulldotdev/ui --skill fulldev -y
\`\`\`

Start here:

- Install Fulldev UI: [/docs/installation.md](/docs/installation.md)
- Understand the project model: [/docs/introduction.md](/docs/introduction.md)
- Customize theme tokens: [/docs/theming.md](/docs/theming.md)
- Browse documentation sections: [/docs.md](/docs.md)
- Browse installable components: [/components.md](/components.md)
- Browse installable blocks: [/blocks.md](/blocks.md)
- Discover all pages: [/sitemap.md](/sitemap.md)
- Read registry metadata: [/r/registry.json](/r/registry.json)

Every documentation page has a Markdown version. Add \`.md\` to a page URL, for example \`/components/button.md\` or \`/blocks/hero.md\`.

Recommended agent flow:

1. Read \`/docs/installation.md\`.
2. Install the Fulldev skill if your agent supports skills.
3. Read the component or block page that matches the user's request.
4. Install registry items with \`npx shadcn@latest add @fulldev/<name>\`.
5. Use block and component examples as source references, not as hidden sidebar context.

---

## Homepage source

`

export const GET: APIRoute = async () => {
  const page = await getEntry("pages", "index")

  if (!page?.filePath) {
    throw new Error("Expected index content page entry to include a file path.")
  }

  return new Response(
    `${agentPreamble}${await readFile(page.filePath, "utf-8")}`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  )
}
