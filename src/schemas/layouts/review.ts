import { z } from 'astro:content'

export const reviewSchema = z
  .object({
    type: z.literal('Review').default('Review'),
    title: z.string().nullish(),
    description: z.string().nullish(),
    rating: z.number().nullish(),
  })
  .strict()
