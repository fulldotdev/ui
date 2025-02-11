import { z } from 'astro:content'
import { buttonSchema } from '../fields/button'

export const faqsSchema = z
  .object({
    writeup: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    faqs: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .array(),
  })
  .strict()

export type FaqsSchema = z.infer<typeof faqsSchema>
