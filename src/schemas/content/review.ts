import { z } from "astro:content"

export const reviewSchema = z
  .object({
    type: z.literal("review").default("review"),
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    rating: z.number().optional(),
  })
  .strict()
