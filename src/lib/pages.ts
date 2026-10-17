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
export const frameworks = ["astro", "react", "liquid"] as const
export type Framework = (typeof frameworks)[number]
export const frameworkLabels: Record<Framework, string> = {
  astro: "Astro",
  react: "React",
  liquid: "Liquid",
}

const platformPattern = /^(react|liquid)(?:\/|$)/

export const getFramework = (id: string): Framework =>
  (id.match(platformPattern)?.[1] as Framework) ?? "astro"

// The title and description of a page in search results, unique across the
// site: a component or block page says what it is, and every page of one
// framework names it, such as "Hero blocks for React - Fulldev UI". The
// homepage and Create belong to all frameworks.
const pageKinds: Record<string, string> = {
  components: "component",
  blocks: "blocks",
}

export const getPageSeo = (
  id: string,
  { title, description }: { title: string; description: string }
) => {
  const name = "Fulldev UI"
  const withName = (value: string) =>
    value.includes(name) ? value : `${value} - ${name}`
  if (id === "index" || id === "create")
    return { title: withName(title), description }
  const label = frameworkLabels[getFramework(id)]
  const [section, slug] = id.replace(platformPattern, "").split("/")
  const kind = slug ? pageKinds[section] : undefined
  const subject =
    kind && !title.toLowerCase().includes(kind.replace(/s$/, ""))
      ? `${title} ${kind}`
      : title
  return {
    title: withName(
      title === label ? `${name} for ${label}` : `${subject} for ${label}`
    ),
    description: new RegExp(`\\b${label}\\b`).test(description)
      ? description
      : `${/[.!?]$/.test(description) ? description : `${description}.`} ${name} for ${label}.`,
  }
}

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

// Keep the same component when switching platforms. Unsupported items fall
// back to the target platform's catalog rather than showing another API.
export const getCounterpartHref = async (id: string, framework: Framework) => {
  const pages = await getCollection("pages")
  const exists = (target: string) => pages.some((page) => page.id === target)
  const path = id.replace(platformPattern, "").replace(/^index$/, "")
  const target =
    framework === "astro" ? path : `${framework}/${path}`.replace(/\/$/, "")
  if (exists(target)) return target ? `/${target}/` : "/"
  if (!path) return framework === "astro" ? "/" : `/${framework}/`
  const [section, slug] = path.split("/")
  if (framework === "react" && section === "components" && slug)
    return getShadcnHref(slug)
  const fallback = framework === "astro" ? section : `${framework}/${section}`
  return exists(fallback)
    ? `/${fallback}/`
    : framework === "astro"
      ? "/"
      : `/${framework}/`
}

export const getLiquidNavigation = async () => {
  const pages = await getCollection("pages")
  return [
    { path: "docs", label: "Get started" },
    { path: "components", label: "Components" },
  ].map(({ path, label }) => ({
    label,
    href: `/liquid/${path}/`,
    links: pages
      .filter((page) => page.id.startsWith(`liquid/${path}/`))
      .sort(
        path === "docs"
          ? (a, b) =>
              ["introduction", "installation", "theming"].indexOf(
                a.id.split("/").at(-1)!
              ) -
              ["introduction", "installation", "theming"].indexOf(
                b.id.split("/").at(-1)!
              )
          : byTitle
      )
      .map(toLink),
  }))
}

export const getLiquidReadingOrder = async () =>
  (await getLiquidNavigation()).flatMap((group) =>
    group.links.map((link) => ({ href: link.href, title: link.label }))
  )

// Search stays inside the library of the current page.
export const getPageSearchItems = async (
  framework: Framework
): Promise<PageSearchItem[]> => {
  const pages = await getCollection("pages")

  return pages
    .filter((page) => getFramework(page.id) === framework)
    .map((page) => {
      const [section] = page.id.replace(platformPattern, "").split("/")
      return {
        label: page.data.title,
        href: getPageHref(page),
        title: page.data.title,
        path: getPageHref(page),
        description: page.data.description,
        group:
          page.id === "index" ||
          page.id === "react" ||
          page.id === "liquid" ||
          !section
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
