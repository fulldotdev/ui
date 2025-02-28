import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const personSchema = z
  .object({
    type: z.literal('Person').default('Person'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    meta: metaSchema,
  })
  .partial()
  .strict()
