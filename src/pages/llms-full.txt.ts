import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { getPageMarkdown } from "@/lib/markdown"
import { getPageHref } from "@/lib/pages"

export const prerender = true

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? ""
  const pages = (await getCollection("pages")).sort((a, b) =>
    a.id.localeCompare(b.id)
  )

  const documents = await Promise.all(
    pages.map(
      async (page) =>
        `<!-- ${origin}${getPageHref(page)} -->\n\n${(await getPageMarkdown(page)).trimEnd()}`
    )
  )

  const body = `# Fulldev UI\n\nFull documentation source for every page on ${origin}. Each section starts with a comment containing the page URL.\n\n${documents.filter(Boolean).join("\n\n---\n\n")}\n`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
