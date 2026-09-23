import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

import {
  getInstallCommand,
  getMarkdownHref,
  getOverviewEntries,
  getPageContext,
  getPageHref,
  getPages,
  type Page,
} from "@/lib/pages"

export const prerender = true

export async function getStaticPaths() {
  const pages = await getPages()
  return Promise.all(
    pages.map(async (page) => ({
      params: {
        page: page.id,
      },
      props: {
        source: await readPageSource(
          page.filePath,
          page.id,
          page.data.type === "overview",
          pages
        ),
      },
    }))
  )
}

async function readPageSource(
  filePath: string | undefined,
  id: string,
  overview: boolean,
  pages: Page[]
) {
  if (!filePath) {
    throw new Error("Expected content page entry to include a file path.")
  }

  const source = await readFile(filePath, "utf-8")
  const sections = [source.trimEnd()]
  if (overview) {
    const page = pages.find((entry) => entry.id === id)!
    const links = getOverviewEntries(pages, page)
    const context = await getPageContext(page)
    const global = await getEntry("globals", context.locale)
    sections.push(
      `## ${global?.data.labels.pages ?? "Pages"}\n\n${links.map((page) => `- [${page.data.title}](${getMarkdownHref(getPageHref(page))}): ${page.data.description}`).join("\n")}`
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
