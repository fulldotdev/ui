export function getHref(slug: string | undefined) {
  if (slug === undefined) return '/'
  if (slug === 'index') return '/'
  else return `/${slug}/`
}
