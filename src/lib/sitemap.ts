import {
  getPageAlternates,
  getPageHref,
  type LocaleConfig,
  type RoutablePage,
} from "./page-paths"

export const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!
  )

export function renderSitemap(
  pages: RoutablePage[],
  site: string,
  locales: LocaleConfig
) {
  const indexable = pages.filter(
    (page) =>
      !page.data.seo?.noindex &&
      (!page.data.seo?.canonical ||
        page.data.seo.canonical === new URL(getPageHref(page), site).href)
  )
  const entries = indexable
    .map((page) => {
      const url = escapeXml(new URL(getPageHref(page), site).href)
      const alternates = getPageAlternates(indexable, page, locales)
        .map(
          (alternate) =>
            `<xhtml:link rel="alternate" hreflang="${escapeXml(alternate.locale)}" href="${escapeXml(new URL(alternate.href, site).href)}"/>`
        )
        .join("")
      return `<url><loc>${url}</loc>${page.data.updatedAt ? `<lastmod>${page.data.updatedAt.toISOString()}</lastmod>` : ""}${alternates}</url>`
    })
    .join("")
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`
}
