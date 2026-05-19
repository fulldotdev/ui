import { getCollection, type CollectionEntry } from "astro:content"

type Page = CollectionEntry<"pages">

export type PageSearchItem = {
  label: string
  href: string
  title: string
  path: string
  description: string
  group: string
}

export type PageBreadcrumbItem = {
  label: string
  href: string
}

export const normalizePath = (path: string) => {
  if (path === "/") return path

  return path.replace(/\/$/, "")
}

export const getPageHref = (page: Page) =>
  page.id === "index" ? "/" : `/${page.id}/`

export const formatSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const getPageSearchGroup = (href: string) => {
  const [slug] = href.split("/").filter(Boolean)

  return slug ? formatSlug(slug) : "Overview"
}

export const getPageSearchItems = async (): Promise<PageSearchItem[]> => {
  const pages = await getCollection("pages")

  return pages
    .map((page) => ({
      label: page.data.title,
      href: getPageHref(page),
      title: page.data.title,
      path: getPageHref(page),
      description: page.data.description,
      group: getPageSearchGroup(getPageHref(page)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

export const getPageBreadcrumbItems = async (
  pathname: string
): Promise<PageBreadcrumbItem[]> => {
  const currentPath = normalizePath(pathname)
  const pages = await getCollection("pages")
  const pageTitlesByHref = new Map(
    pages.map((page) => [getPageHref(page), page.data.title])
  )
  const homeLink = {
    label: pageTitlesByHref.get("/") ?? "Home",
    href: "/",
  }

  if (currentPath === "/") return [homeLink]

  return [
    homeLink,
    ...currentPath
      .split("/")
      .filter(Boolean)
      .map((slug, index, slugs) => {
        const href = `/${slugs.slice(0, index + 1).join("/")}/`

        return {
          label: pageTitlesByHref.get(href) ?? formatSlug(slug),
          href,
        }
      }),
  ]
}
