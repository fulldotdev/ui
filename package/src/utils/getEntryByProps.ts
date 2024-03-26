// import {
//   getCollection,
//   getEntry,
//   type CollectionEntry,
//   type CollectionKey,
//   type ContentCollectionKey,
// } from 'astro:content'
// import { z } from 'zod'

// export const zCollectionKey = z
//   .string()
//   .refine(
//     async (string) => (await getCollection(string as CollectionKey)).length > 0
//   )

// export const zGetEntryByProps = z.object({
//   collection: zCollectionKey,
//   slug: z.string(),
// })

// type GetEntryByProps = z.infer<typeof zGetEntryByProps>

// export const getEntryByProps = async (collection: any, slug: any) => {
//   const parsed = await zGetEntryByProps.safeParseAsync({ collection, slug })
//   if (!parsed.success) return undefined
//   return getEntry(
//     parsed.data.collection as ContentCollectionKey,
//     parsed.data.slug as CollectionEntry<ContentCollectionKey>['slug']
//   )
// }
