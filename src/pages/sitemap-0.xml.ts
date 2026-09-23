import { siteConfig } from "@/site.config"

import { getPages } from "@/lib/pages"
import { renderSitemap } from "@/lib/sitemap"

export async function GET() {
  return new Response(
    renderSitemap(await getPages(), siteConfig.site, siteConfig.i18n),
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  )
}
