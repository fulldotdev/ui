import { z } from 'astro:content'

export const reviewsSchema = z
  .object({
    writeup: z.string().optional(),
    reviews: z
      .object({
        rating: z.number(),
        title: z.string(),
        description: z.string(),
      })
      .array(),
  })
  .strict()

export type ReviewsSchema = z.infer<typeof reviewsSchema>
