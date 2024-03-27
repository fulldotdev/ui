import type { CollectionEntry, ContentCollectionKey } from 'astro:content'

export const getPathname = ({
  slug,
  collection,
  data,
}: CollectionEntry<ContentCollectionKey>): URL['pathname'] | undefined => {
  if (!slug) return
  if (data.draft) return
  if (data.render === false) return
  if (collection === 'pages' && slug === 'index') return '/'
  if (collection === 'pages') return `/${slug}`
  if (slug === 'index') return `/${collection}`
  return `/${collection}/${slug}`
}
