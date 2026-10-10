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
  label: string
  href: string
}

// The docs come in an Astro and a React edition, each under its own path.
// The home and create pages are shared and show the Astro edition's links.
export const frameworks = ["astro", "react"] as const
export type Framework = (typeof frameworks)[number]
export const frameworkLabels: Record<Framework, string> = {
  astro: "Astro",
  react: "React",
}

const editionPattern = /^(astro|react)(?:\/|$)/

export const getFramework = (id: string): Framework =>
  (id.match(editionPattern)?.[1] as Framework | undefined) ?? "astro"

// The path of a page inside its edition, such as components/button.
const getEditionPath = (id: string) => id.replace(editionPattern, "")

const normalizePath = (path: string) => {
  if (path === "/") return path

  return path.replace(/\/$/, "")
}

export const getPageHref = (page: Page) =>
  page.id === "index" ? "/" : `/${page.id}/`

export const getPageId = (pathname: string) =>
  normalizePath(pathname).replace(/^\//, "") || "index"

const formatSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const sections = [
  { path: "docs", label: "Get started" },
  { path: "components", label: "Components" },
  { path: "blocks", label: "Blocks" },
]
const docsOrder = ["introduction", "installation", "theming", "presets"]

const byTitle = (a: Page, b: Page) => a.data.title.localeCompare(b.data.title)

const sectionPages = (pages: Page[], framework: Framework, section: string) => {
  const prefix = `${framework}/${section}/`
  const entries = pages.filter((page) => page.id.startsWith(prefix))
  if (section !== "docs") return entries.sort(byTitle)
  return docsOrder
    .map((slug) => entries.find((page) => page.id === prefix + slug))
    .filter((page): page is Page => Boolean(page))
}

const toLink = (page: Page): PageLink => ({
  label: page.data.title,
  href: getPageHref(page),
})

const createLink = { label: "Create", href: "/create/" }

// Sidebar groups for one edition, from its pages.
export const getNavigation = async (framework: Framework) => {
  const pages = await getCollection("pages")
  return sections.map((section) => {
    const links = sectionPages(pages, framework, section.path).map(toLink)
    return {
      label: section.label,
      href: `/${framework}/${section.path}/`,
      links: section.path === "docs" ? [...links, createLink] : links,
    }
  })
}

// Pages in reading order, for previous and next links.
export const getReadingOrder = async (framework: Framework) => {
  const pages = await getCollection("pages")
  return sections.flatMap((section) =>
    sectionPages(pages, framework, section.path).map((page) => ({
      href: getPageHref(page),
      title: page.data.title,
    }))
  )
}

export const getSectionMenu = (framework: Framework): PageLink[] => [
  ...sections.map((section) => ({
    label: section.path === "docs" ? "Docs" : section.label,
    href: `/${framework}/${section.path}/`,
  })),
  createLink,
]

// The same page in another edition, or that edition's catalog with the
// missing page named, so the reader sees why they did not land on it.
export const getCounterpartHref = async (id: string, framework: Framework) => {
  const pages = await getCollection("pages")
  if (!editionPattern.test(id)) return `/${framework}/docs/introduction/`
  const path = getEditionPath(id)
  const target = path ? `${framework}/${path}` : framework
  if (pages.some((page) => page.id === target)) return `/${target}/`
  const [section, slug] = path.split("/")
  const catalog = `${framework}/${section}`
  return pages.some((page) => page.id === catalog)
    ? `/${catalog}/?missing=${slug}`
    : `/${framework}/`
}

export const getPageSearchItems = async (
  framework: Framework
): Promise<PageSearchItem[]> => {
  const pages = await getCollection("pages")

  return pages
    .filter(
      (page) =>
        !editionPattern.test(page.id) || getFramework(page.id) === framework
    )
    .map((page) => {
      const [section] = getEditionPath(page.id).split("/")
      return {
        label: page.data.title,
        href: getPageHref(page),
        title: page.data.title,
        path: getPageHref(page),
        description: page.data.description,
        group:
          page.id === "index" || !section ? "Overview" : formatSlug(section),
      }
    })
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

export const getMarkdownHref = (href: string) =>
  href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`

export const getInstallCommand = (source: string) => {
  const names = [
    ...source.matchAll(/props=\{\{\s*name:\s*['"]([^'"]+)['"]/g),
  ].map((match) => `@fulldev/${match[1]}`)
  return names.length
    ? `npx shadcn@latest add ${[...new Set(names)].join(" ")}`
    : undefined
}
