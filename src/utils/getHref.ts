import type { CollectionEntry } from 'astro:content'

export function getHref({
  collection,
  id,
  data,
}: CollectionEntry<
  'pages' | 'posts' | 'products' | 'categories' | 'docs' | 'jobs'
>) {
  let collectionSlug = ''
  if (collection === 'posts') collectionSlug = 'blog'
  else if (collection === 'products') collectionSlug = 'producten'
  else if (collection === 'categories') collectionSlug = 'categorieen'
  else if (collection === 'docs') collectionSlug = 'docs'
  else if (collection === 'jobs') collectionSlug = 'vacatures'

  const entrySlug = data.meta?.slug ?? (id === 'index' ? '' : id)
  const slug = `/${collectionSlug}/${entrySlug}/`.replace(/\/\/$/, '/')
  return slug
}
