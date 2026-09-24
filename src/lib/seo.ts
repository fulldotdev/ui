import { getPageUrl, siteUrl, type Page } from "@/lib/pages"

type Context = {
  name: string
  locale: string
  breadcrumbs: { label: string; href: string }[]
}

// Emits only facts present in the page data: no invented dates or authors.
export const getStructuredData = (
  page: Page,
  { name, locale, breadcrumbs }: Context
) => {
  const url = page.data.seo?.canonical ?? getPageUrl(page)
  const websiteId = new URL("/#website", siteUrl).href
  const dateModified = page.data.updatedAt?.toISOString()
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: new URL("/", siteUrl).href,
      name,
    },
    {
      "@type": page.data.type === "overview" ? "CollectionPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.data.title,
      description: page.data.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      ...(dateModified && { dateModified }),
      ...(breadcrumbs.length > 1 && {
        breadcrumb: { "@id": `${url}#breadcrumb` },
      }),
    },
  ]
  if (breadcrumbs.length > 1)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: new URL(item.href, siteUrl).href,
      })),
    })
  return { "@context": "https://schema.org", "@graph": graph }
}
