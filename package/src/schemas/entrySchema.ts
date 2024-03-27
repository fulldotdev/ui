import type { CollectionEntry, ContentCollectionKey } from 'astro:content'
import { ZodType, z } from 'zod'

export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']
export type Entry = z.infer<typeof entrySchema>

const collection = z.string() as ZodType<ContentCollectionKey>
const slug = z.string() as ZodType<EntrySlug>

export const entrySchema = z
  .any().nullish()
  .transform((val) => {
    if (typeof val !== 'string') return val
    val = val.split('content/').pop()
    val = val.startsWith('/') ? val.slice(1) : val //shorter
    const collection = val?.split('/').shift()
    const slug = val?.split('/').slice(1).join('/')
    return { collection, slug }
  })
  .pipe(
    z.object({
      collection,
      slug,
    })
  )
