import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"

export const reviewSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    rating: z.number().min(1).max(5),
    image: imageSchema,
  })
  .partial()
  .strict()

export type ReviewSchema = z.infer<typeof reviewSchema>

export type ReviewProps = ReviewSchema
