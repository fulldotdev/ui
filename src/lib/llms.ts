// Docs only: the llms.txt indexes of the Astro library (/llms.txt) and the
// React extension (/react/llms.txt).
import { getCollection } from "astro:content"

import { getPageMarkdown } from "@/lib/markdown"
import {
  getFramework,
  getMarkdownHref,
  getPageHref,
  shadcnComponentsHref,
  type Framework,
} from "@/lib/pages"

const getPages = async (framework: Framework) =>
  (await getCollection("pages")).filter(
    (page) => getFramework(page.id) === framework
  )

export async function getLlms(origin: string, framework: Framework) {
  const pages = await getPages(framework)
  const groups = new Map<string, typeof pages>()
  for (const page of pages) {
    const parts = page.id.replace(/^react\/?/, "").split("/")
    const key = parts.length > 1 ? parts[0] : "Overview"
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

  if (framework === "react")
    return `# Fulldev UI React extension

> Fulldev extras and blocks for an official shadcn/ui React project. Standard components come from shadcn/ui itself.

Set up the project with the official \`npx shadcn@latest init\`, then add the \`@fulldev\` registry (\`${origin}/r/react/styles/{style}/{name}.json\`) to \`components.json\` and install items with \`npx shadcn@latest add @fulldev/<name>\`. Standard components that an item needs install from the official shadcn/ui registry. Every documentation page has a Markdown version: add \`.md\` to the page URL.

- [Installation](${origin}/react/docs/installation.md)
- [Full documentation in one file](${origin}/react/llms-full.txt)
- [Standard shadcn/ui components](${shadcnComponentsHref})

${sections.join("\n\n")}
`

  return `# Fulldev UI

> Open-source Astro components and blocks for content-driven websites, distributed as a shadcn-compatible registry.

Install items with \`npx shadcn@latest add @fulldev/<name>\` after adding the \`@fulldev\` registry (\`${origin}/r/{name}.json\`) to \`components.json\`. Every documentation page has a Markdown version: add \`.md\` to the page URL.

- [Agent entry point](${origin}/index.md)
- [Full documentation in one file](${origin}/llms-full.txt)
- [Registry index](${origin}/r/registry.json)
- [React extension](${origin}/react/llms.txt): Fulldev extras and blocks for shadcn/ui React projects

${sections.join("\n\n")}
`
}

export async function getLlmsFull(origin: string, framework: Framework) {
  const pages = (await getPages(framework)).sort((a, b) =>
    a.id.localeCompare(b.id)
  )
  const documents = await Promise.all(
    pages.map(
      async (page) =>
        `<!-- ${origin}${getPageHref(page)} -->\n\n${(await getPageMarkdown(page)).trimEnd()}`
    )
  )
  const title =
    framework === "react" ? "Fulldev UI React extension" : "Fulldev UI"
  return `# ${title}\n\nFull documentation source for every page${framework === "react" ? " of the React extension" : ""} on ${origin}. Each section starts with a comment containing the page URL.\n\n${documents.join("\n\n---\n\n")}\n`
}
