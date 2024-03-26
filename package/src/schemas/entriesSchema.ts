import type { CollectionEntry, ContentCollectionKey } from 'astro:content'
import { z } from 'zod'
import { entrySchema } from './entrySchema'

export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']
export type Entries = z.infer<typeof entriesSchema>

export const entriesSchema = z
  .array(entrySchema)
  .transform((val) => val.filter(Boolean))
