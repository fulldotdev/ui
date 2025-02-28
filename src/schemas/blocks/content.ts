import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const contentSchema = z
  .object({
    type: z.literal('Content').default('Content'),
    writeup: z.string().nullish(),
    buttons: buttonSchema.array().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()
