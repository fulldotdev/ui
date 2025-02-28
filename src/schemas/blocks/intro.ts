import { z } from 'astro:content'

export const introSchema = z
  .object({
    type: z.literal('Intro').default('Intro'),
    content: z.string(),
  })
  .partial()
  .strict()
