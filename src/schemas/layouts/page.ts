import { imageSchema } from '@/schemas/components/image'
import { sectionSchema } from '@/schemas/components/section'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const pageSchema = z
  .object({
    type: z.enum(['page', 'home']).default('page'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
    meta: metaSchema,
  })
  .partial()
  .strict()
