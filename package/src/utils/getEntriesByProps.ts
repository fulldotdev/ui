// import {
//   getCollection,
//   type CollectionEntry,
//   type ContentCollectionKey,
// } from 'astro:content'

// export type EntriesReference =
//   | {
//       [Key in 'collection' | 'cards']?: ContentCollectionKey
//     }
//   | {
//       [Key in ContentCollectionKey]?: CollectionEntry<ContentCollectionKey>['slug'][]
//     }

// export const getEntriesByProps = async (
//   props: Partial<EntriesReference>
// ): Promise<CollectionEntry<ContentCollectionKey>[] | undefined> => {
//   const collection = 'collection' in props ? props.collection : undefined
//   const cards = 'cards' in props ? props.cards : undefined
//   if (collection) return getCollection(collection)
//   if (cards) return getCollection(cards)

//   const temp = console.warn // HACK
//   console.warn = () => {} // HACK
//   const promises = Object.keys(props).map((key) => {
//     // @ts-ignore
//     return getCollection(key, (entry) => props[key].includes(entry.slug))
//   })
//   const entries = (await Promise.all(promises)).flat()
//   console.warn = temp // HACK

//   return entries as CollectionEntry<ContentCollectionKey>[] | undefined // FIXME
// }
