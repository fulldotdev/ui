// import { type CollectionEntry, type CollectionKey } from 'astro:content'
// import { merge } from 'merge-anything'
// import { readEntryData } from './readEntryData'

// type Entry = CollectionEntry<CollectionKey>
// type EntryOrCollection = Entry | Entry[]

// export const withDefaults = async <T extends EntryOrCollection>(
//   collectionOrEntry: T
// ): Promise<T> => {
//   const isArray = Array.isArray(collectionOrEntry)
//   const entries = isArray ? collectionOrEntry : [collectionOrEntry]
//   const collection = entries[0].collection
//   const extension = entries[0].id.split('.').pop() as 'md' | 'mdx' | 'yaml' // TODO add JSON

//   const mergedEntries = entries.map(async (entry) => {
//     const _collectionData = await readEntryData(
//       collection,
//       `_${collection}.${extension}`
//     )
//     const _entryData = await readEntryData(collection, `_${entry.id}`)
//     const mergedData = merge(_collectionData, _entryData)
//     return {
//       ...entry,
//       data: merge(mergedData, entry.data),
//     }
//   })

//   const resolvedEntries = await Promise.all(mergedEntries)

//   return isArray ? resolvedEntries : resolvedEntries[0]
// }
