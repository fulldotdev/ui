import { z } from 'astro:content'

export const introSchema = z
  .object({
    variant: z.number().default(1),
    content: z.string(),
  })
  .partial()
  .strict()
