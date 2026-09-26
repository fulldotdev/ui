import type { APIRoute } from "astro"

import { getPages, getPageUrl, isIndexable } from "@/lib/pages"

export const prerender = true

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// Use the same URLs and SEO fields as the HTML head.
export const GET: APIRoute = async () => {
  const pages = (await getPages()).filter(isIndexable)
  const urls = pages.map((page) => {
    const lastmod = page.data.updatedAt
      ? `<lastmod>${page.data.updatedAt.toISOString()}</lastmod>`
      : ""
    return `<url><loc>${escape(getPageUrl(page))}</loc>${lastmod}</url>`
  })
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  )
}
