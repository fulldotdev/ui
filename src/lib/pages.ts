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

type PageLink = {
  label: string
  href: string
}

// The docs are the Astro library at the root of the site. The React extension
// lives under /react/: Fulldev extras and blocks for an official shadcn/ui
// project, which links to shadcn/ui for the standard components.
export const frameworks = ["astro", "react"] as const
export type Framework = (typeof frameworks)[number]
export const frameworkLabels: Record<Framework, string> = {
  astro: "Astro",
  react: "React",
}

const reactPattern = /^react(?:\/|$)/

export const getFramework = (id: string): Framework =>
  reactPattern.test(id) ? "react" : "astro"

const normalizePath = (path: string) => {
  if (path === "/") return path

  return path.replace(/\/$/, "")
}

export const getPageHref = (page: Page) =>
  page.id === "index" ? "/" : `/${page.id}/`

export const getPageId = (pathname: string) =>
  normalizePath(pathname).replace(/^\//, "") || "index"

// The official docs of a standard shadcn/ui component. Its legacy Form item
// is empty; forms are built with Field now.
export const shadcnComponentsHref = "https://ui.shadcn.com/docs/components"
const getShadcnHref = (slug: string) =>
  `${shadcnComponentsHref}/base/${slug === "form" ? "field" : slug}`

const formatSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const reactSections = [
  { path: "docs", label: "Get started" },
  { path: "components", label: "Components" },
  { path: "blocks", label: "Blocks" },
]
const reactDocsOrder = ["introduction", "installation"]

const byTitle = (a: Page, b: Page) => a.data.title.localeCompare(b.data.title)

const reactSectionPages = (pages: Page[], section: string) => {
  const prefix = `react/${section}/`
  const entries = pages.filter((page) => page.id.startsWith(prefix))
  if (section !== "docs") return entries.sort(byTitle)
  return reactDocsOrder
    .map((slug) => entries.find((page) => page.id === prefix + slug))
    .filter((page): page is Page => Boolean(page))
}

const toLink = (page: Page): PageLink => ({
  label: page.data.title,
  href: getPageHref(page),
})

// The standard components are not part of the extension, so the sidebar
// points to their official docs.
const shadcnLink = {
  label: "shadcn/ui components ↗",
  href: shadcnComponentsHref,
}

// Sidebar groups of the React extension. The Astro docs keep the navigation
// in their global content.
export const getReactNavigation = async () => {
  const pages = await getCollection("pages")
  return reactSections.map((section) => {
    const links = reactSectionPages(pages, section.path).map(toLink)
    return {
      label: section.label,
      href: `/react/${section.path}/`,
      links: section.path === "components" ? [...links, shadcnLink] : links,
    }
  })
}

// React pages in reading order, for previous and next links.
export const getReactReadingOrder = async () => {
  const pages = await getCollection("pages")
  return reactSections.flatMap((section) =>
    reactSectionPages(pages, section.path).map((page) => ({
      href: getPageHref(page),
      title: page.data.title,
    }))
  )
}

// The same page in the other library. A standard component the React
// extension does not ship goes to its official shadcn/ui docs.
export const getCounterpartHref = async (id: string, framework: Framework) => {
  const pages = await getCollection("pages")
  const exists = (target: string) => pages.some((page) => page.id === target)
  if (framework === "react") {
    if (reactPattern.test(id)) return `/${id}/`
    if (exists(`react/${id}`)) return `/react/${id}/`
    const [section, slug] = id.split("/")
    if (section === "components" && slug) return getShadcnHref(slug)
    return exists(`react/${section}`) ? `/react/${section}/` : "/react/"
  }
  if (!reactPattern.test(id)) return id === "index" ? "/" : `/${id}/`
  const path = id.replace(reactPattern, "")
  if (!path) return "/"
  if (exists(path)) return `/${path}/`
  const [section] = path.split("/")
  return exists(section) ? `/${section}/` : "/"
}

// Search stays inside the library of the current page.
export const getPageSearchItems = async (
  framework: Framework
): Promise<PageSearchItem[]> => {
  const pages = await getCollection("pages")

  return pages
    .filter((page) => getFramework(page.id) === framework)
    .map((page) => {
      const [section] = page.id.replace(reactPattern, "").split("/")
      return {
        label: page.data.title,
        href: getPageHref(page),
        title: page.data.title,
        path: getPageHref(page),
        description: page.data.description,
        group:
          page.id === "index" || page.id === "react" || !section
            ? "Overview"
            : formatSlug(section),
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label))
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
