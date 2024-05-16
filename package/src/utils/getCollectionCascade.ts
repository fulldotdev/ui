import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
  type DataCollectionKey,
} from 'astro:content'
import { unflatten } from 'flat'
import { objectify } from 'radash'
import { getPathname } from './getPathname'

export type CollectionCascade = {
  [Key in ContentCollectionKey]: {
    [Key in CollectionEntry<ContentCollectionKey>['slug']]: any
  }
} & {
  [Key in DataCollectionKey]: {
    [Key in CollectionEntry<DataCollectionKey>['id']]: any
  }
}

export const getCollectionCascade = async (collectionKeys: CollectionKey[]) => {
  const promises = collectionKeys.map((key) => getCollection(key))
  const resolved = await Promise.all(promises)
  const flattened = resolved.flat()
  const data = flattened.map((entry) => ({
    ...entry.data,
    collection: entry.collection,
    id: entry.id,
    slug: entry.slug,
    pathname: getPathname(entry),
  }))
  const object = objectify(
    data,
    ({ collection, slug, id }) => `${collection}.${slug || id}`
  )
  const unflattened = unflatten(object)
  return unflattened as CollectionCascade
}
