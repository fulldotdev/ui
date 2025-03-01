import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const contentSchema = z
  .object({
    content: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()
