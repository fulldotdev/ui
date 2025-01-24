import { z } from 'astro:content'

export const metaSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    noindex: z.boolean().optional(),
    nofollow: z.boolean().optional(),
    slug: z.string().optional(),
    canonical: z.string().optional(),
    css: z.string().array().optional(),
    head: z.string().optional(),
    body: z.string().optional(),
  })
  .strict()
