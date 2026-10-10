// Docs only: the Markdown version of a page, for .md URLs, llms-full.txt and
// the Copy Markdown button. Examples become their source, and each React
// extension page says how its @fulldev registry is set up.
import { readFile } from "node:fs/promises"
import { getCollection, type CollectionEntry } from "astro:content"

import { inlineExamples } from "@/lib/examples"
import {
  getFramework,
  getInstallCommand,
  getMarkdownHref,
  getPageHref,
} from "@/lib/pages"

type Page = CollectionEntry<"pages">

const setup = (page: Page) =>
  getFramework(page.id) === "react"
    ? "> Fulldev UI React extension for an official shadcn/ui project. The `@fulldev` registry in `components.json` points at `https://ui.full.dev/r/react/styles/{style}/{name}.json`; see [installation](/react/docs/installation.md).\n\n"
    : ""

export async function getPageMarkdown(page: Page) {
  if (!page.filePath) {
    throw new Error("Expected content page entry to include a file path.")
  }
  const source = await readFile(page.filePath, "utf-8")
  const frontmatter = source.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? ""
  const { text, items } = inlineExamples(
    source.slice(frontmatter.length),
    getFramework(page.id)
  )
  const sections = [`${frontmatter}\n${setup(page)}${text.trim()}`]
  if (page.data.type === "overview") {
    const pages = await getCollection("pages")
    const links = pages.filter((entry) =>
      page.id === "index"
        ? !entry.id.includes("/") && entry.id !== "index"
        : entry.id.startsWith(`${page.id}/`) &&
          !entry.id.slice(page.id.length + 1).includes("/")
    )
    sections.push(
      `## Pages\n\n${links.map((entry) => `- [${entry.data.title}](${getMarkdownHref(getPageHref(entry))}): ${entry.data.description}`).join("\n")}`
    )
  }
  const install = getInstallCommand(source)
  if (install && !source.includes(install))
    sections.push(`## Installation\n\n\`\`\`bash\n${install}\n\`\`\``)
  if (items.length)
    sections.push(
      `## Install what this page shows\n\n\`\`\`bash\nnpx shadcn@latest add ${items.map((item) => `@fulldev/${item}`).join(" ")}\n\`\`\``
    )
  return sections.join("\n\n") + "\n"
}
