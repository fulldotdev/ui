import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'

export const ctaSchema = z
  .object({
    type: z.literal('Cta').default('Cta'),
    writeup: z.string().nullish(),
    buttons: buttonSchema.array().nullish(),
  })
  .strict()
