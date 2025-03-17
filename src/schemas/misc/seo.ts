import { z } from "astro:content"

export const seoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    canonical: z.string(),
    noindex: z.boolean(),
    nofollow: z.boolean(),
  })
  .partial()
