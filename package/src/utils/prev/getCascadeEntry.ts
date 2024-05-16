import { get } from 'radash'
import type { CollectionCascade } from '../getCollectionCascade'

export const getCascadeEntry = (
  collection: string,
  slug: string,
  cascade: CollectionCascade
) => {
  const entry = get(cascade, `${collection}.${slug}`)

  entry = transformReferences(entry, cascade)
  entry = transformLayouts(entry)
  entry = transformCasing(entry)
  entry = transformSelfs(entry)

  return entry
}
