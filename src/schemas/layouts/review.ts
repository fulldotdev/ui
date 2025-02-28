import { z } from 'astro:content'

export const reviewSchema = z
  .object({
    type: z.literal('Review').default('Review'),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
  })
  .partial()
  .strict()
