import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const postSchema = z
  .object({
    type: z.literal('Post').default('Post'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    meta: metaSchema,
  })
  .partial()
  .strict()
