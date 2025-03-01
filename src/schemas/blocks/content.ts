import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const contentSchema = z
  .object({
    type: z.literal('Content').default('Content'),
    variant: z.number().default(1),
    content: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()
