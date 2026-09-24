import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

import { getInstallCommand } from "@/lib/docs"
import {
  getMarkdownHref,
  getOverviewEntries,
  getPageHref,
  getPageLocale,
  getPages,
  type Page,
} from "@/lib/pages"

export const prerender = true

export async function getStaticPaths() {
  const pages = await getPages()
  return Promise.all(
    pages.map(async (page) => ({
      params: { page: page.id },
      props: { source: await readPageSource(page, pages) },
    }))
  )
}

async function readPageSource(page: Page, pages: Page[]) {
  if (!page.filePath) {
    throw new Error("Expected content page entry to include a file path.")
  }

  const source = await readFile(page.filePath, "utf-8")
  const sections = [source.trimEnd()]
  if (page.data.type === "overview") {
    const global = await getEntry("globals", getPageLocale(page))
    const links = getOverviewEntries(pages, page).map(
      (entry) =>
        `- [${entry.data.title}](${getMarkdownHref(getPageHref(entry))}): ${entry.data.description}`
    )
    sections.push(
      `## ${global?.data.labels.pages ?? "Pages"}\n\n${links.join("\n")}`
    )
  }
  const install = getInstallCommand(source)
  if (install && !source.includes(install))
    sections.push(`## Installation\n\n\`\`\`bash\n${install}\n\`\`\``)
  return sections.join("\n\n") + "\n"
}

export const GET: APIRoute = ({ props }) => {
  return new Response(props.source, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
