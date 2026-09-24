import { i18n, site } from "astro:config/server"
import { getCollection, type CollectionEntry } from "astro:content"

export type Page = CollectionEntry<"pages">

if (!site) {
  throw new Error(
    "Set `site` in astro.config. Page URLs, canonicals, and the sitemap need it."
  )
}

export const siteUrl = site

// Locale folders come from Astro's own i18n config, so there is nothing to mirror.
const defaultLocale = i18n?.defaultLocale ?? "en"
const locales =
  i18n?.locales.map((locale) =>
    typeof locale === "string" ? locale : locale.path
  ) ?? []
const prefixDefaultLocale =
  typeof i18n?.routing === "object" && i18n.routing.prefixDefaultLocale

export const getPageHref = (page: Pick<Page, "id">) =>
  page.id === "index" ? "/" : `/${page.id}/`

export const getPageUrl = (page: Pick<Page, "id">) =>
  new URL(getPageHref(page), siteUrl).href

export const getMarkdownHref = (href: string) =>
  href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`

export const getPageLocale = (page: Pick<Page, "id">) => {
  const [first] = page.id.split("/")
  return locales.includes(first) ? first : defaultLocale
}

const getHomeId = (locale: string) =>
  locale === defaultLocale && !prefixDefaultLocale ? "index" : locale

// One rule for sitemap inclusion, hreflang alternates, and search. Robots meta
// stays explicit: layouts pass seo.noindex and seo.nofollow to the head as is.
export const isIndexable = (page: Page) =>
  !page.data.seo?.noindex &&
  (page.data.seo?.canonical ?? getPageUrl(page)) === getPageUrl(page)

export const getPages = async () => {
  const pages = await getCollection("pages")
  const byLocaleKey = new Map<string, Page>()
  const byKey = new Map<string, Page>()
  for (const page of pages) {
    const [first] = page.id.split("/")
    if (prefixDefaultLocale && !locales.includes(first))
      throw new Error(
        `Page "${page.id}" must live in a locale folder (${locales.join(", ")}).`
      )
    if (!prefixDefaultLocale && first === defaultLocale)
      throw new Error(
        `Page "${page.id}" must live at the root; the default locale has no folder.`
      )
    const key = page.data.translationKey
    if (!key) continue
    const localeKey = `${getPageLocale(page)}:${key}`
    const twin = byLocaleKey.get(localeKey)
    if (twin)
      throw new Error(
        `Pages "${twin.id}" and "${page.id}" share translationKey "${key}" in one locale.`
      )
    byLocaleKey.set(localeKey, page)
    const other = byKey.get(key)
    if (other && other.data.type !== page.data.type)
      throw new Error(
        `Translations "${other.id}" and "${page.id}" must use the same page type.`
      )
    byKey.set(key, page)
  }
  return pages
}

export const getPageChildren = (pages: Page[], parent: Pick<Page, "id">) => {
  const prefix = parent.id === "index" ? "" : `${parent.id}/`
  const locale = getPageLocale(parent)
  return pages.filter(
    (page) =>
      page.id !== parent.id &&
      page.id.startsWith(prefix) &&
      !page.id.slice(prefix.length).includes("/") &&
      getPageLocale(page) === locale
  )
}

export const getOverviewEntries = (pages: Page[], page: Page) => {
  const locale = getPageLocale(page)
  const entries = page.data.type === "overview" ? page.data.entries : undefined
  if (!entries)
    return getPageChildren(pages, page).sort((a, b) =>
      a.data.title.localeCompare(b.data.title, locale)
    )
  return entries.map(({ id }) => {
    const entry = pages.find((candidate) => candidate.id === id)
    if (!entry)
      throw new Error(`Overview "${page.id}" references unknown page "${id}".`)
    if (getPageLocale(entry) !== locale)
      throw new Error(
        `Overview "${page.id}" references "${id}" from another locale.`
      )
    return entry
  })
}

export const getPageBreadcrumbs = (pages: Page[], page: Page) => {
  const segments = page.id === "index" ? [] : page.id.split("/")
  const ids = new Set([
    getHomeId(getPageLocale(page)),
    ...segments.map((_, index) => segments.slice(0, index + 1).join("/")),
  ])
  return [...ids].flatMap((id) => {
    const entry = pages.find((candidate) => candidate.id === id)
    return entry ? [{ label: entry.data.title, href: getPageHref(entry) }] : []
  })
}

export const getPageAlternates = (pages: Page[], page: Page) => {
  const key = page.data.translationKey
  if (!key) return []
  return pages
    .filter((entry) => entry.data.translationKey === key && isIndexable(entry))
    .map((entry) => ({ locale: getPageLocale(entry), href: getPageUrl(entry) }))
}
