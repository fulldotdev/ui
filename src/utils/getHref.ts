import type { CollectionEntry, ContentCollectionKey } from 'astro:content'

const routes: {
  [key in ContentCollectionKey]: string
} = {
  categories: 'categorieen',
  docs: 'docs',
  pages: '',
  posts: 'blog',
  products: 'producten',
}

export function getHref(
  collection: ContentCollectionKey,
  slug: CollectionEntry<ContentCollectionKey>['slug']
) {
  let href
  if (collection === 'pages' && slug === 'index') href = `/`
  else if (slug === 'index') href = `/${routes[collection]}/`
  else href = `/${routes[collection]}/${slug}/`
  href = href?.replace('//', '/')
  return href
}
