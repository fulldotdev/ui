import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'

export const ctaSchema = z
  .object({
    type: z.literal('Cta').default('Cta'),
    variant: z.number().default(1),
    content: z.string(),
    buttons: buttonSchema.array(),
  })
  .partial()
  .strict()
