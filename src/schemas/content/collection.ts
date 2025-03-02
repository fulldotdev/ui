import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'
import { sectionSchema } from '../components/section'

export const collectionSchema = z
  .object({
    type: z.literal('collection').default('collection'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
    meta: metaSchema,
  })
  .partial()
  .strict()
