import { z } from "zod"

export const seoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    canonical: z.string(),
    noindex: z.boolean(),
    nofollow: z.boolean(),
  })
  .partial()
  .strict()
