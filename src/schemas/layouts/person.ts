import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const personSchema = z
  .object({
    type: z.literal('Person').default('Person'),
    title: z.string().nullish(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
    meta: metaSchema.nullish(),
  })
  .strict()
