import type { CollectionEntry, ContentCollectionKey } from 'astro:content'

export default ({
  slug,
  collection,
  data,
}: CollectionEntry<ContentCollectionKey>): string | undefined => {
  if (!slug) return
  if (data.draft) return
  if (collection === 'pages' && slug === 'index') return '/'
  if (collection === 'pages') return `/${slug}`
  else return `/${collection}/${slug}`
}
