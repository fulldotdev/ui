import type { CollectionEntry, ContentCollectionKey } from 'astro:content'
import { ZodType, z } from 'zod'

export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']
export type Entry = z.infer<typeof entrySchema>

const collection = z.string() as ZodType<ContentCollectionKey>
const slug = z.string() as ZodType<EntrySlug>

export const entrySchema = z
  .any()
  .transform((val) => {
    if (typeof val !== 'string') return val
    const end = val.split('content/').pop()
    const collection = end?.split('/').shift()
    const slug = end?.split('/').slice(1).join('/')
    return { collection, slug }
  })
  .pipe(
    z.object({
      collection,
      slug,
    })
  )
