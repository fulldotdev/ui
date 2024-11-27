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

export const formatEntry = ({
  data,
  slug,
  ...rest
}: CollectionEntry<ContentCollectionKey>) => {
  let href
  if (slug !== 'index') href = `/${routes[rest.collection]}/${slug}/`

  href?.replace('//', '/')

  return {
    href,
    slug,
    ...rest,
    ...data,
  }
}
