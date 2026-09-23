import type { APIRoute } from "astro"

import { getMarkdownHref, getPageHref, getPages } from "@/lib/pages"

export const prerender = true

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? ""
  const pages = await getPages()
  const groups = new Map<string, typeof pages>()

  for (const page of pages) {
    const [group] = page.id.split("/")
    const key = page.id.includes("/") ? group : "Overview"
    groups.set(key, [...(groups.get(key) ?? []), page])
  }

  const sections = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, entries]) => {
      const heading = group.charAt(0).toUpperCase() + group.slice(1)
      const links = entries
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(
          (page) =>
            `- [${page.data.title}](${origin}${getMarkdownHref(getPageHref(page))}): ${page.data.description}`
        )
        .join("\n")

      return `## ${heading}\n\n${links}`
    })

  const body = `# Fulldev UI

> Open-source Astro components and blocks for content-driven websites, distributed as a shadcn-compatible registry.

Install items with \`npx shadcn@latest add @fulldev/<name>\` after adding the \`@fulldev\` registry (\`${origin}/r/{name}.json\`) to \`components.json\`. Every documentation page has a Markdown version: add \`.md\` to the page URL.

- [Agent entry point](${origin}/index.md)
- [Full documentation in one file](${origin}/llms-full.txt)
- [Registry index](${origin}/r/registry.json)

${sections.join("\n\n")}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
