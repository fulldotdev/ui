import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'

export const faqsSchema = z
  .object({
    type: z.literal('Faqs').default('Faqs'),
    variant: z.number().default(1),
    content: z.string(),
    buttons: buttonSchema.array(),
    faqs: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
