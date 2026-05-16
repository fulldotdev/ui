import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { getPageHref } from "@/lib/pages"

export const prerender = true

const getMarkdownHref = (href: string) =>
  href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`

export const GET: APIRoute = async () => {
  const pages = await getCollection("pages")
  const pageLinks = pages
    .map((page) => ({
      title: page.data.title,
      href: getPageHref(page),
      markdownHref: getMarkdownHref(getPageHref(page)),
      description: page.data.description,
    }))
    .sort((a, b) => a.href.localeCompare(b.href))

  const body = `# Fulldev UI Sitemap

Use the Markdown URLs when reading pages as an AI agent.

## Core

- [Agent entry point](/index.md)
- [Registry metadata](/r/registry.json)

## Pages

${pageLinks
  .map(
    (page) =>
      `- [${page.title}](${page.href}) | [Markdown](${page.markdownHref})${
        page.description ? ` - ${page.description}` : ""
      }`
  )
  .join("\n")}
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
