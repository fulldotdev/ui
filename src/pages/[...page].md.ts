import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { getInstallCommand, getMarkdownHref, getPageHref } from "@/lib/pages"

export const prerender = true

export async function getStaticPaths() {
  const pages = await getCollection("pages")
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
  pages: Awaited<ReturnType<typeof getCollection<"pages">>>
) {
  if (!filePath) {
    throw new Error("Expected content page entry to include a file path.")
  }

  const source = await readFile(filePath, "utf-8")
  const sections = [source.trimEnd()]
  if (overview) {
    const links = pages.filter((page) =>
      id === "index"
        ? !page.id.includes("/") && page.id !== "index"
        : page.id.startsWith(`${id}/`)
    )
    sections.push(
      `## Pages\n\n${links.map((page) => `- [${page.data.title}](${getMarkdownHref(getPageHref(page))}): ${page.data.description}`).join("\n")}`
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
