import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'

export const ctaSchema = z
  .object({
    type: z.literal('Cta').default('Cta'),
    content: z.string(),
    buttons: buttonSchema.array(),
  })
  .partial()
  .strict()
