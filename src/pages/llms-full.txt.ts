import { readFile } from "node:fs/promises"
import type { APIRoute } from "astro"

import { getInstallCommand } from "@/lib/docs"
import { getPageHref, getPages } from "@/lib/pages"

export const prerender = true

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? ""
  const pages = (await getPages()).sort((a, b) => a.id.localeCompare(b.id))

  const documents = await Promise.all(
    pages.map(async (page) => {
      if (!page.filePath) return ""
      const source = await readFile(page.filePath, "utf-8")
      const installCommand = getInstallCommand(source)
      const install =
        installCommand && !source.includes(installCommand)
          ? `\n\n## Installation\n\n\`\`\`bash\n${installCommand}\n\`\`\``
          : ""

      return `<!-- ${origin}${getPageHref(page)} -->\n\n${source.trimEnd()}${install}`
    })
  )

  const body = `# Fulldev UI\n\nFull documentation source for every page on ${origin}. Each section starts with a comment containing the page URL.\n\n${documents.filter(Boolean).join("\n\n---\n\n")}\n`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
