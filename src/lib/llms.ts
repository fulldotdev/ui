// Docs only: the llms.txt indexes, for the whole site or one edition.
import { getCollection } from "astro:content"

import { getPageMarkdown } from "@/lib/markdown"
import {
  frameworkLabels,
  frameworks,
  getFramework,
  getMarkdownHref,
  getPageHref,
  type Framework,
} from "@/lib/pages"

const registries: Record<Framework, string> = {
  astro: "/r/styles/{style}/{name}.json",
  react: "/r/react/styles/{style}/{name}.json",
}

const inEdition = (id: string, framework?: Framework) =>
  !framework ||
  (/^(astro|react)(\/|$)/.test(id) && getFramework(id) === framework)

const setup = (origin: string, framework: Framework) =>
  `${frameworkLabels[framework]}: set the \`@fulldev\` registry in \`components.json\` to \`${origin}${registries[framework]}\`, then \`npx shadcn@latest add @fulldev/<name>\`; examples install as \`@fulldev/<component>-examples\`. Setup: ${origin}/${framework}/docs/installation.md`

export async function getLlms(origin: string, framework?: Framework) {
  const pages = (await getCollection("pages")).filter((page) =>
    inEdition(page.id, framework)
  )
  const groups = new Map<string, typeof pages>()
  for (const page of pages) {
    const parts = page.id.split("/")
    const key = parts.length > 2 ? `${parts[0]} ${parts[1]}` : "overview"
    groups.set(key, [...(groups.get(key) ?? []), page])
  }
  const sections = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, entries]) => {
      const heading = group.replace(/\b\w/g, (letter) => letter.toUpperCase())
      const links = entries
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(
          (page) =>
            `- [${page.data.title}](${origin}${getMarkdownHref(getPageHref(page))}): ${page.data.description}`
        )
        .join("\n")
      return `## ${heading}\n\n${links}`
    })
  const editions = framework ? [framework] : [...frameworks]
  const title = framework
    ? `Fulldev UI for ${frameworkLabels[framework]}`
    : "Fulldev UI"
  const prefix = framework ? `/${framework}` : ""
  return `# ${title}

> Components, the official shadcn/ui examples and page blocks${framework ? "" : " for Astro and React"}, installed as source through a shadcn registry in every shadcn/ui style.

${editions.map((edition) => `- ${setup(origin, edition)}`).join("\n")}
- Every page has a Markdown version: add \`.md\` to the page URL.
- [Full documentation in one file](${origin}${prefix}/llms-full.txt)
${framework ? "" : `- Per edition: ${frameworks.map((edition) => `[${frameworkLabels[edition]}](${origin}/${edition}/llms.txt)`).join(", ")}\n`}
${sections.join("\n\n")}
`
}

export async function getLlmsFull(origin: string, framework?: Framework) {
  const pages = (await getCollection("pages"))
    .filter((page) => inEdition(page.id, framework))
    .sort((a, b) => a.id.localeCompare(b.id))
  const documents = await Promise.all(
    pages.map(
      async (page) =>
        `<!-- ${origin}${getPageHref(page)} -->\n\n${(await getPageMarkdown(page)).trimEnd()}`
    )
  )
  const title = framework
    ? `Fulldev UI for ${frameworkLabels[framework]}`
    : "Fulldev UI"
  return `# ${title}\n\nFull documentation for every page${framework ? " of this edition" : ""} on ${origin}. Each section starts with a comment containing the page URL.\n\n${documents.join("\n\n---\n\n")}\n`
}
