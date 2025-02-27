import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const collectionSchema = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()

export type CollectionSchema = z.infer<typeof collectionSchema>
