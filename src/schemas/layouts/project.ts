import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const projectSchema = z
  .object({
    type: z.literal('Project').default('Project'),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    meta: metaSchema,
  })
  .partial()
  .strict()
