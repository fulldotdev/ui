import { z } from 'astro:content'

export const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .strict()
