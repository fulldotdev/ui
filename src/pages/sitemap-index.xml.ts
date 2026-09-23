import { siteConfig } from "@/site.config"

import { escapeXml } from "@/lib/sitemap"

export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${escapeXml(new URL("/sitemap-0.xml", siteConfig.site).href)}</loc></sitemap></sitemapindex>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  )
}
