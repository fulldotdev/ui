export interface LocaleConfig {
  defaultLocale: string
  locales: readonly string[]
  prefixDefaultLocale: boolean
}

export interface RoutablePage {
  id: string
  data: {
    type: string
    title: string
    description: string
    translationKey?: string
    updatedAt?: Date
    seo?: { canonical?: string; noindex?: boolean }
  }
}

export const normalizePath = (path: string) =>
  path === "/" ? path : path.replace(/\/+$/, "")

export const getPageHref = (page: Pick<RoutablePage, "id">) =>
  page.id === "index" ? "/" : `/${page.id}/`

export const getPageLocale = (
  page: Pick<RoutablePage, "id">,
  config: LocaleConfig
) => {
  const first = page.id.split("/")[0]
  return config.locales.includes(first) ? first : config.defaultLocale
}

export const getLocaleHome = (locale: string, config: LocaleConfig) =>
  locale === config.defaultLocale && !config.prefixDefaultLocale
    ? "/"
    : `/${locale}/`

export const getPageChildren = <T extends RoutablePage>(
  pages: T[],
  parent: Pick<RoutablePage, "id">,
  type?: T["data"]["type"]
) => {
  const prefix = parent.id === "index" ? "" : `${parent.id}/`
  return pages.filter((page) => {
    if (page.id === parent.id || !page.id.startsWith(prefix)) return false
    return (
      !page.id.slice(prefix.length).includes("/") &&
      (!type || page.data.type === type)
    )
  })
}

export const resolvePageReference = <T extends RoutablePage>(
  pages: T[],
  id: string,
  expectedType?: T["data"]["type"]
) => {
  const page = pages.find((entry) => entry.id === id)
  if (!page) throw new Error(`Unknown page reference "${id}".`)
  if (expectedType && page.data.type !== expectedType) {
    throw new Error(
      `Page "${id}" must have type "${expectedType}", received "${page.data.type}".`
    )
  }
  return page
}

export const getPageAlternates = <T extends RoutablePage>(
  pages: T[],
  page: T,
  config: LocaleConfig
) => {
  if (!page.data.translationKey) return []
  return pages
    .filter((entry) => entry.data.translationKey === page.data.translationKey)
    .map((entry) => ({
      locale: getPageLocale(entry, config),
      href: getPageHref(entry),
    }))
}

export const validatePageTree = <T extends RoutablePage>(
  pages: T[],
  config: LocaleConfig
) => {
  const urls = new Set<string>()
  const translations = new Map<string, string>()
  for (const page of pages) {
    const href = getPageHref(page)
    if (urls.has(href)) throw new Error(`Duplicate page URL "${href}".`)
    urls.add(href)
    const first = page.id.split("/")[0]
    const locale = getPageLocale(page, config)
    if (config.prefixDefaultLocale && !config.locales.includes(first)) {
      throw new Error(
        `Page "${page.id}" must live in a configured locale folder.`
      )
    }
    if (!config.prefixDefaultLocale && first === config.defaultLocale) {
      throw new Error(
        `Default-locale page "${page.id}" must live outside the locale folder.`
      )
    }
    if (page.data.translationKey) {
      const key = `${locale}:${page.data.translationKey}`
      if (translations.has(key))
        throw new Error(
          `Duplicate translation "${key}" on "${page.id}" and "${translations.get(key)}".`
        )
      translations.set(key, page.id)
      const counterpart = pages.find(
        (entry) =>
          entry.data.translationKey === page.data.translationKey &&
          entry.data.type !== page.data.type
      )
      if (counterpart)
        throw new Error(
          `Translations "${page.id}" and "${counterpart.id}" must use the same page type.`
        )
    }
  }
}

export const validatePageLinks = (
  value: unknown,
  pages: RoutablePage[],
  owner: string
): void => {
  if (!value || typeof value !== "object") return
  if (Array.isArray(value)) {
    value.forEach((entry) => validatePageLinks(entry, pages, owner))
    return
  }
  const record = value as Record<string, unknown>
  if (record.collection === "pages" && typeof record.id === "string") {
    resolvePageReference(
      pages,
      record.id,
      typeof record.expectedType === "string" ? record.expectedType : undefined
    )
  }
  if (
    typeof record.href === "string" &&
    record.href.startsWith("/") &&
    !record.href.startsWith("//")
  ) {
    const path = record.href.split(/[?#]/)[0]
    if (
      !pages.some(
        (page) => normalizePath(getPageHref(page)) === normalizePath(path)
      )
    ) {
      throw new Error(
        `Unknown internal page link "${record.href}" in ${owner}. Use a page URL or an explicit external URL.`
      )
    }
  }
  Object.values(record).forEach((entry) =>
    validatePageLinks(entry, pages, owner)
  )
}

export const getPageBreadcrumbs = <T extends RoutablePage>(
  pages: T[],
  page: T,
  config: LocaleConfig
) => {
  const locale = getPageLocale(page, config)
  const home = getLocaleHome(locale, config)
  const href = getPageHref(page)
  return pages
    .filter((entry) => {
      const candidate = getPageHref(entry)
      return (
        getPageLocale(entry, config) === locale &&
        (candidate === home ||
          candidate === href ||
          (candidate !== "/" && href.startsWith(candidate)))
      )
    })
    .sort((a, b) => getPageHref(a).length - getPageHref(b).length)
    .map((entry) => ({ label: entry.data.title, href: getPageHref(entry) }))
}

export const getMarkdownHref = (href: string) =>
  href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`
