export function getHref(slug?: string) {
  if (!slug) return undefined
  const withoutIndex = slug.replace("index", "")
  const withPrefixSlug = withoutIndex.startsWith("/")
    ? withoutIndex
    : `/${withoutIndex}`
  const withTrailingSlash = withPrefixSlug.endsWith("/")
    ? withPrefixSlug
    : `${withPrefixSlug}/`
  return withTrailingSlash
}
