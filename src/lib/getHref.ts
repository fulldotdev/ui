export function getHref(collection: 'pages' | 'posts' | 'products' | 'categories' | 'docs', slugOrId: string) {
  let collectionSlug = ''
  if (collection === 'posts') collectionSlug = 'blog'
  else if (collection === 'products') collectionSlug = 'producten'
  else if (collection === 'categories') collectionSlug = 'categorieen'
  else if (collection === 'docs') collectionSlug = 'docs'

  const entrySlug = slugOrId === 'index' ? '' : slugOrId
  const slug = `/${collectionSlug}/${entrySlug}/`.replace(/\/{2,}/g, '/')
  return slug
}
