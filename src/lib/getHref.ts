import settings from '@/data/settings.json'

export function getHref(
  collection: 'pages' | 'posts' | 'products' | 'collections' | 'projects' | 'persons',
  slugOrId: string
) {
  const collectionSlug = collection === 'pages' ? '' : settings[collection].slug
  const entrySlug = slugOrId === 'index' ? '' : slugOrId
  const slug = `/${collectionSlug}/${entrySlug}/`.replace(/\/{2,}/g, '/')
  return slug
}
