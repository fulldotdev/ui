import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import {
  getInstallCommand,
  getMarkdownHref,
  getOverviewLinks,
  getPageHref,
} from "@/lib/pages"

export const prerender = true

const navigationPreamble = "Navigation: [/sitemap.md](/sitemap.md)\n\n"

export async function getStaticPaths() {
  const pages = await getCollection("pages")
  return Promise.all(
    pages
      .filter((page) => page.id !== "index")
      .map(async (page) => {
        const source = await readPageSource(page.filePath)
        const href = getPageHref(page)
        const sections: string[] = [source.trimEnd()]

        if (page.data.type === "overview") {
          const links = await getOverviewLinks(href)
          sections.push(
            `## Pages\n\n${links
              .map(
                (link) =>
                  `- [${link.title}](${link.href}) | [Markdown](${getMarkdownHref(link.href)})${link.description ? ` - ${link.description}` : ""}`
              )
              .join("\n")}`
          )
        }

        const installCommand = getInstallCommand(source)
        if (installCommand && !source.includes(installCommand)) {
          sections.push(
            `## Installation\n\n\`\`\`bash\n${installCommand}\n\`\`\``
          )
        }

        return {
          params: { page: page.id },
          props: { source: `${sections.join("\n\n")}\n` },
        }
      })
  )
}

async function readPageSource(filePath: string | undefined) {
  if (!filePath) {
    throw new Error("Expected content page entry to include a file path.")
  }

  return readFile(filePath, "utf-8")
}

export const GET: APIRoute = ({ props }) => {
  return new Response(`${navigationPreamble}${props.source}`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
