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
export const reference = entryReference
  .or(entriesReference)
  .or(collectionReference)
  .nullish()

const stringToObject = <R extends EntryReference | CollectionReference>(
  reference: R
) => {
  const string = reference ?? ''
  const end = string.split('content/').pop()
  const collection = end?.split('/').shift() || ''
  const slug = end?.split('/').slice(1).join('/') || ''
  return { collection, slug }
}

export const byReference = <R extends Reference>(reference: R) =>
  Array.isArray(reference)
    ? reference.map(stringToObject)
    : [stringToObject(reference)]

export type EntryReference = z.infer<typeof entryReference>
export type CollectionReference = z.infer<typeof collectionReference>
export type EntriesReference = z.infer<typeof entriesReference>
export type Reference = z.infer<typeof reference>
export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']
