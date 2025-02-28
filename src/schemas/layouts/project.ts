import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const projectSchema = z
  .object({
    type: z.literal('Project').default('Project'),
    title: z.string().nullish(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
    meta: metaSchema.nullish(),
  })
  .strict()
