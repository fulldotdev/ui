import { z } from 'astro:content'

export const reviewsSchema = z
  .object({
    writeup: z.string().nullish(),
    reviews: z
      .object({
        rating: z.number().nullish(),
        title: z.string().nullish(),
        description: z.string().nullish(),
      })
      .strict()
      .array()
      .nullish(),
  })
  .strict()

export type ReviewsSchema = z.infer<typeof reviewsSchema>
