import { getCollection, type CollectionEntry } from "astro:content"
import { siteConfig } from "@/site.config"

import {
  getPageAlternates,
  getPageBreadcrumbs,
  getPageChildren,
  getPageHref,
  getPageLocale,
  resolvePageReference,
  validatePageLinks,
  validatePageTree,
} from "@/lib/page-paths"

export { getMarkdownHref, getPageHref, normalizePath } from "@/lib/page-paths"
export type Page = CollectionEntry<"pages">
export type PageType = Page["data"]["type"]
export type PageOfType<T extends PageType> = Page & {
  data: Extract<Page["data"], { type: T }>
}

export const getPages = async () => {
  const pages = await getCollection("pages")
  validatePageTree(pages, siteConfig.i18n)
  pages.forEach((page) => validatePageLinks(page.data, pages, page.id))
  return pages
}

export const getPagesByType = async <T extends PageType>(
  type: T,
  locale?: string
) =>
  (await getPages()).filter(
    (page): page is PageOfType<T> =>
      page.data.type === type &&
      (!locale || getPageLocale(page, siteConfig.i18n) === locale)
  )

export const getReferencedPage = async <T extends PageType>(
  id: string,
  type: T
): Promise<PageOfType<T>> =>
  resolvePageReference(await getPages(), id, type) as PageOfType<T>

export const getOverviewEntries = (pages: Page[], page: Page) => {
  const locale = getPageLocale(page, siteConfig.i18n)
  const entries =
    page.data.type === "overview" && page.data.entries
      ? page.data.entries.map((reference) =>
          resolvePageReference(pages, reference.id)
        )
      : getPageChildren(pages, page)
          .filter((entry) => getPageLocale(entry, siteConfig.i18n) === locale)
          .sort((a, b) => a.data.title.localeCompare(b.data.title, locale))
  if (
    entries.some((entry) => getPageLocale(entry, siteConfig.i18n) !== locale)
  ) {
    throw new Error(
      `Overview "${page.id}" links to an entry in another locale.`
    )
  }
  return entries
}

export const getPageContext = async (page: Page) => {
  const pages = await getPages()
  return {
    locale: getPageLocale(page, siteConfig.i18n),
    breadcrumbs: getPageBreadcrumbs(pages, page, siteConfig.i18n),
    alternates: getPageAlternates(pages, page, siteConfig.i18n),
  }
}

export type PageContext = Awaited<ReturnType<typeof getPageContext>>
export type PageSearchItem = {
  label: string
  href: string
  title: string
  path: string
  description: string
  group: string
}

export const getPageSearchItems = async (
  locale: string
): Promise<PageSearchItem[]> => {
  const pages = (await getPages()).filter(
    (page) =>
      getPageLocale(page, siteConfig.i18n) === locale && !page.data.seo?.noindex
  )
  return pages
    .map((page) => {
      const breadcrumbs = getPageBreadcrumbs(pages, page, siteConfig.i18n)
      return {
        label: page.data.title,
        href: getPageHref(page),
        title: page.data.title,
        path: getPageHref(page),
        description: page.data.description,
        group:
          breadcrumbs.length > 2
            ? breadcrumbs[1].label
            : (breadcrumbs[0]?.label ?? page.data.title),
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label, locale))
}

export const getInstallCommand = (source: string) => {
  const names = [
    ...source.matchAll(/props=\{\{\s*name:\s*['"]([^'"]+)['"]/g),
  ].map((match) => `@fulldev/${match[1]}`)
  return names.length
    ? `npx shadcn@latest add ${[...new Set(names)].join(" ")}`
    : undefined
}
