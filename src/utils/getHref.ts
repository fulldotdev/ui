import type { CollectionEntry, ContentCollectionKey } from 'astro:content'

export default (
  entry?: CollectionEntry<ContentCollectionKey> | false
): `/${string}/${string}` | undefined => {
  if (!entry) return
  const body = 'body' in entry ? entry.body : ''
  const hasBody = body?.trim().length > 0
  const blocks = 'sections' in entry.data ? entry.data.sections : []
  const hasBlocks = blocks.length > 0
  if (hasBody || hasBlocks) return `/${entry.collection}/${entry.slug}`
  return
}
