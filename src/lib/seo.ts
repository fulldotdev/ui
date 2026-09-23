import { getPageHref, type RoutablePage } from "./page-paths"

type Context = {
  locale: string
  breadcrumbs: { href: string; label: string }[]
}

export function getStructuredData(
  page: RoutablePage,
  context: Context,
  site: { site: string; name: string },
  organization?: { name: string; url: string }
) {
  const url = new URL(page.data.seo?.canonical ?? getPageHref(page), site.site)
    .href
  const websiteId = new URL("/#website", site.site).href
  const organizationId = new URL("/#organization", site.site).href
  const webpageId = `${url}#webpage`
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: new URL("/", site.site).href,
      name: site.name,
      ...(organization && { publisher: { "@id": organizationId } }),
    },
    {
      "@type": page.data.type === "overview" ? "CollectionPage" : "WebPage",
      "@id": webpageId,
      url,
      name: page.data.title,
      description: page.data.description,
      inLanguage: context.locale,
      isPartOf: { "@id": websiteId },
      ...(page.data.updatedAt && {
        dateModified: page.data.updatedAt.toISOString(),
      }),
      ...(context.breadcrumbs.length > 1 && {
        breadcrumb: { "@id": `${url}#breadcrumb` },
      }),
    },
  ]
  if (organization)
    graph.push({
      "@type": "Organization",
      "@id": organizationId,
      ...organization,
    })
  if (page.data.type === "doc")
    graph.push({
      "@type": "TechArticle",
      "@id": `${url}#article`,
      headline: page.data.title,
      description: page.data.description,
      inLanguage: context.locale,
      mainEntityOfPage: { "@id": webpageId },
      ...(page.data.updatedAt && {
        dateModified: page.data.updatedAt.toISOString(),
      }),
    })
  if (context.breadcrumbs.length > 1)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: context.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: new URL(item.href, site.site).href,
      })),
    })
  return { "@context": "https://schema.org", "@graph": graph }
}
