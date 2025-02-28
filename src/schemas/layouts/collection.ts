import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const collectionSchema = z
  .object({
    type: z.literal('Collection').default('Collection'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    meta: metaSchema,
  })
  .partial()
  .strict()
