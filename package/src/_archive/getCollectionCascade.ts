// import {
//   getCollection,
//   type CollectionEntry,
//   type CollectionKey,
//   type ContentCollectionKey,
//   type DataCollectionKey,
// } from 'astro:content'
// import { unflatten } from 'flat'
// import { objectify } from 'radash'
// import { mapValues } from 'remeda'

// export type CollectionCascade = {
//   [Key in ContentCollectionKey]: {
//     [Key in CollectionEntry<ContentCollectionKey>['slug']]: any
//   }
// } & {
//   [Key in DataCollectionKey]: {
//     [Key in CollectionEntry<DataCollectionKey>['id']]: any
//   }
// }

// export const getCollectionCascade = async (collectionKeys: CollectionKey[]) => {
//   const promises = collectionKeys.map((key) => getCollection(key))
//   const resolved = await Promise.all(promises)
//   const flattened = resolved.flat()
//   const object = objectify(
//     flattened,
//     ({ collection, slug, id }) => `${collection}.${slug || id}`
//   )
//   const mapped = mapValues(object, (value) => value.data)
//   const unflattened = unflatten(mapped)
//   return unflattened as CollectionCascade
// }
