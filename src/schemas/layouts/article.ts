import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const articleSchema = z
  .object({
    type: z.literal('Article').default('Article'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    meta: metaSchema,
  })
  .partial()
  .strict()
