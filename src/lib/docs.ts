// Helpers for this documentation site only. Shared page helpers live in pages.ts.
import type { GlobalSchema } from "@/schemas/global"
import {
  getOverviewEntries,
  getPageBreadcrumbs,
  getPageChildren,
  getPageHref,
  getPageLocale,
  getPages,
  isIndexable,
  type Page,
} from "@/lib/pages"

export const getPageSearchItems = async (locale: string) => {
  const pages = (await getPages()).filter(
    (page) => getPageLocale(page) === locale && isIndexable(page)
  )
  return pages
    .map((page) => {
      const breadcrumbs = getPageBreadcrumbs(pages, page)
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

// Use the visible navigation order, then the parent overview or same-type siblings.
export const getPagePagination = async (
  page: Page,
  navigation: GlobalSchema["sidebar"]["navigation"]
) => {
  const navigationLinks = navigation.find((group) =>
    group.links?.some((link) => link.href === getPageHref(page))
  )?.links
  if (navigationLinks) {
    const links = navigationLinks.map((link) => ({
      href: link.href,
      title: link.label,
    }))
    const index = links.findIndex((link) => link.href === getPageHref(page))
    return {
      previousPage: index > 0 ? links[index - 1] : undefined,
      nextPage: links[index + 1],
    }
  }
  const pages = await getPages()
  const parentId = page.id.includes("/")
    ? page.id.slice(0, page.id.lastIndexOf("/"))
    : "index"
  const parent = pages.find((entry) => entry.id === parentId)
  const siblings =
    parent?.data.type === "overview"
      ? getOverviewEntries(pages, parent)
      : getPageChildren(pages, { id: parentId })
          .filter((entry) => entry.data.type === page.data.type)
          .sort((a, b) => a.data.title.localeCompare(b.data.title))
  const links = siblings.map((entry) => ({
    href: getPageHref(entry),
    title: entry.data.title,
  }))
  const index = siblings.findIndex((entry) => entry.id === page.id)
  return {
    previousPage: index > 0 ? links[index - 1] : undefined,
    nextPage: index >= 0 ? links[index + 1] : undefined,
  }
}

export const getInstallCommand = (source: string) => {
  const names = [
    ...source.matchAll(/props=\{\{\s*name:\s*['"]([^'"]+)['"]/g),
  ].map((match) => `@fulldev/${match[1]}`)
  return names.length
    ? `npx shadcn@latest add ${[...new Set(names)].join(" ")}`
    : undefined
}
