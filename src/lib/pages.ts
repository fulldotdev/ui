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

export type PageLink = {
  href: string
  title: string
  description?: string
}

export const normalizePath = (path: string) => {
  if (path === "/") return path

  return path.replace(/\/$/, "")
}

export const getPageHref = (page: Page) =>
  page.id === "index" ? "/" : `/${page.id}/`

export const getMarkdownHref = (href: string) =>
  href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`

export const getInstallCommand = (source: string) => {
  const match = source.match(/props=\{\{\s*name:\s*['"]([^'"]+)['"]/)

  return match ? `npx shadcn@latest add @fulldev/${match[1]}` : undefined
}

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

const toPageLink = (page: Page): PageLink => ({
  href: getPageHref(page),
  title: page.data.title,
  description: page.data.description,
})

export const docsOrder = [
  "docs/introduction",
  "docs/installation",
  "docs/theming",
  "docs/dark-mode",
  "docs/cli",
  "docs/mcp",
  "docs/skills",
  "components",
  "blocks",
  "docs/layouts",
]

export const getDocLinks = async (): Promise<PageLink[]> => {
  const pages = await getCollection("pages")

  return docsOrder
    .map((id) => pages.find((page) => page.id === id))
    .filter((page): page is Page => Boolean(page))
    .map(toPageLink)
}

export const getComponentLinks = async (): Promise<PageLink[]> => {
  const pages = await getCollection(
    "pages",
    ({ data, id }) =>
      data.type === "doc" &&
      id.startsWith("components/") &&
      !("deprecated" in data && data.deprecated)
  )

  return pages.map(toPageLink).sort((a, b) => a.title.localeCompare(b.title))
}

export const getBlockCategoryLinks = async (): Promise<PageLink[]> => {
  const pages = await getCollection(
    "pages",
    ({ data, id }) =>
      data.type === "block" && !data.category && id.startsWith("blocks/")
  )

  return pages.map(toPageLink).sort((a, b) => a.href.localeCompare(b.href))
}

export const getOverviewLinks = async (href: string): Promise<PageLink[]> => {
  if (href === "/docs/") return getDocLinks()
  if (href === "/components/") return getComponentLinks()
  if (href === "/blocks/") return getBlockCategoryLinks()

  return []
}

export const getPageSearchItems = async (): Promise<PageSearchItem[]> => {
  const pages = await getCollection(
    "pages",
    ({ data }) => !("deprecated" in data && data.deprecated)
  )

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
