import { z } from 'astro:content'

export const introSchema = z
  .object({
    type: z.literal('Intro').default('Intro'),
    variant: z.number().default(1),
    content: z.string(),
  })
  .partial()
  .strict()
