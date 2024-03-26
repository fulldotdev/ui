import type { CollectionEntry, ContentCollectionKey } from 'astro:content'
import { z } from 'zod'

export const entryReference = z
  .string()
  .refine((val) => !val.includes('/'), {
    message:
      "Should be a path containing a collection and slug, like 'collection/slug'",
  })
  .nullish()

export const collectionReference = z
  .string()
  .refine((val) => val.includes('/'), {
    message: "Should be a collection name, like 'pages', not a path",
  })
  .nullish()

export const entriesReference = z.array(entryReference).nullish()

export const entriesOrCollectionReference = entriesReference
  .or(collectionReference)
  .nullish()

const stringToObject = <R extends EntryReference | CollectionReference>(
  reference: R
) => {
  const string = reference ?? ''
  const end = string.split('content/').pop()
  const collection = end?.split('/').shift() as ContentCollectionKey | undefined
  const slug = end?.split('/').slice(1).join('/') as EntrySlug | undefined
  return { collection, slug }
}

export const getEntryByReference = (reference: EntryReference) =>
  stringToObject(reference)

export const getCollectionByReference = (reference: CollectionReference) =>
  stringToObject(reference).collection

export const getEntriesByReference = (reference: EntriesReference) =>
  reference?.map(stringToObject)

export const getEntriesOrCollectionByReference = (
  reference: EntriesReference | CollectionReference
) =>
  Array.isArray(reference)
    ? getEntriesByReference(reference)
    : getCollectionByReference(reference)

export type EntryReference = z.infer<typeof entryReference>
export type CollectionReference = z.infer<typeof collectionReference>
export type EntriesReference = z.infer<typeof entriesReference>
export type EntriesOrCollectionReference = z.infer<
  typeof entriesOrCollectionReference
>
export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']
