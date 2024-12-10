import { z } from 'astro:content'

export const ratingSchema = z
  .object({
    score: z.number().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
  })
  .strict()

export type RatingSchema = z.infer<typeof ratingSchema>
