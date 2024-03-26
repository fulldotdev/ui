import type { CollectionEntry, ContentCollectionKey } from 'astro:content'
import { ZodType, z } from 'zod'
import { entrySchema } from './entrySchema'

export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']
export type Entries = z.infer<typeof entriesSchema>

const collection = z.string() as ZodType<ContentCollectionKey>
const slug = z.string() as ZodType<EntrySlug>

export const entriesSchema = z
  .array(entrySchema)
  .transform((val) => {
    return val.filter(Boolean)
  })
  .pipe(
    z.array(
      z.object({
        collection,
        slug,
      })
    )
  )
