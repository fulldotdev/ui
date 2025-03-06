import { z } from "astro:content"

export const reviewSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().optional(),
  })
  .strict()
