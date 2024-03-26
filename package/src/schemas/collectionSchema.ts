import type { CollectionKey } from 'astro:content'
import { z } from 'zod'

export type Collection = z.infer<typeof collectionSchema>

export const collectionSchema = z
  .string()
  .refine((val) => val.includes('/'), {
    message: "Should be a collection name, like 'pages', not a path",
  })
  .nullish() as z.ZodType<CollectionKey | null | undefined>
