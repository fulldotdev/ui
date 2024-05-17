import type { CollectionEntry, CollectionKey } from 'astro:content'

export const transformPathname = (entry: CollectionEntry<CollectionKey>) => {
  if (!entry.slug) return entry
  const { collection, slug, data } = entry
  let pathname
  if (data.draft) pathname = null
  else if (data.output === false) pathname = null
  else if (collection == 'pages' && slug == 'index') pathname = '/'
  else if (collection == 'pages') pathname = `/${slug}/`
  else if (slug === 'index') pathname = `/${collection}/`
  else pathname = `/${entry.collection}/${entry.slug}/`
  return { pathname, ...entry, data: { pathname, ...data } }
}
