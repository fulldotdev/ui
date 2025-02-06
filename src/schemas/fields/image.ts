import { z } from 'astro:content'

export const imageSchema = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional(),
  })
  .strict()
