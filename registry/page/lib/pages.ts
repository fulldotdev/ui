import { getCollection, type CollectionEntry } from "astro:content"
import { siteConfig } from "@/site.config"

import {
  getPageChildren,
  getPageLocale,
  resolvePageReference,
  validatePageLinks,
  validatePageTree,
} from "@/lib/page-paths"

export type Page = CollectionEntry<"pages">
export const getPages = async () => {
  const pages = await getCollection("pages")
  validatePageTree(pages, siteConfig.i18n)
  pages.forEach((page) => validatePageLinks(page.data, pages, page.id))
  return pages
}
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
  if (entries.some((entry) => getPageLocale(entry, siteConfig.i18n) !== locale))
    throw new Error(`Overview "${page.id}" references another locale.`)
  return entries
}
export async function getPagesByType<T extends Page["data"]["type"]>(type: T) {
  return (await getPages()).filter(
    (page): page is Page & { data: Extract<Page["data"], { type: T }> } =>
      page.data.type === type
  )
}
