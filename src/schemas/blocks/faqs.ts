import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'

export const faqsSchema = z
  .object({
    type: z.literal('Faqs').default('Faqs'),
    writeup: z.string().nullish(),
    buttons: buttonSchema.array().nullish(),
    faqs: z
      .object({
        title: z.string().nullish(),
        description: z.string().nullish(),
      })
      .strict()
      .array()
      .nullish(),
  })
  .strict()
