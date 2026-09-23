import { siteConfig } from "@/site.config"

import { getPageChildren, getPageHref, getPageLocale } from "@/lib/page-paths"
import { getOverviewEntries, getPages, type Page } from "@/lib/pages"

export async function getPagePagination(page: Page) {
  const pages = await getPages()
  const parentId = page.id.includes("/")
    ? page.id.slice(0, page.id.lastIndexOf("/"))
    : "index"
  const parent = pages.find((entry) => entry.id === parentId)
  const entries =
    parent?.data.type === "overview"
      ? getOverviewEntries(pages, parent)
      : getPageChildren(pages, { id: parentId }, page.data.type)
          .filter(
            (entry) =>
              getPageLocale(entry, siteConfig.i18n) ===
              getPageLocale(page, siteConfig.i18n)
          )
          .sort((a, b) => a.data.title.localeCompare(b.data.title))
  const links = entries.map((entry) => ({
    href: getPageHref(entry),
    title: entry.data.title,
  }))
  const index = entries.findIndex((entry) => entry.id === page.id)
  return {
    previousPage: index > 0 ? links[index - 1] : undefined,
    nextPage: index >= 0 ? links[index + 1] : undefined,
  }
}
