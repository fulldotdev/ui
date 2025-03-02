import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'
import { sectionSchema } from '../components/section'

export const articleSchema = z
  .object({
    type: z.literal('article').default('article'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
    meta: metaSchema,
  })
  .partial()
  .strict()
