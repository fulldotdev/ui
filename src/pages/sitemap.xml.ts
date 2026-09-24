import type { APIRoute } from "astro"

import {
  getPageAlternates,
  getPages,
  getPageUrl,
  isIndexable,
} from "@/lib/pages"

export const prerender = true

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// Built from the validated pages collection, so noindex, canonical, updatedAt,
// and translated slugs come from the same frontmatter the HTML head uses.
export const GET: APIRoute = async () => {
  const pages = (await getPages()).filter(isIndexable)
  const urls = pages.map((page) => {
    const lastmod = page.data.updatedAt
      ? `<lastmod>${page.data.updatedAt.toISOString()}</lastmod>`
      : ""
    const alternates = getPageAlternates(pages, page)
      .map(
        ({ locale, href }) =>
          `<xhtml:link rel="alternate" hreflang="${locale}" href="${escape(href)}"/>`
      )
      .join("")
    return `<url><loc>${escape(getPageUrl(page))}</loc>${lastmod}${alternates}</url>`
  })
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  )
}
