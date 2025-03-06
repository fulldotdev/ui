import { z } from "astro:content"

export const reviewSchema = z
  .object({
    id: z.string().optional(),
    type: z.literal("review").default("review"),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
  })
  .partial()
  .strict()
