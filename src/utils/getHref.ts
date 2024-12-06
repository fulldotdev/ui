import type { CollectionEntry } from 'astro:content'

export function getHref(slug: CollectionEntry<'pages'>['slug']) {
  if (slug === 'index') return '/'
  else return `/${slug}/`
}
