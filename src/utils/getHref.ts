import type { CollectionEntry } from 'astro:content'

export function getHref(id: CollectionEntry<'pages'>['id']) {
  if (id === 'index') return '/'
  else return `/${id}/`
}
