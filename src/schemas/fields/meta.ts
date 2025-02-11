import { z } from 'astro:content'

export const metaSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().optional(),
    nofollow: z.boolean().optional(),
    css: z.string().optional(),
    head: z.string().optional(),
    body: z.string().optional(),
  })
  .strict()
