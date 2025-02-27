import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const reviewsSchema = z
  .object({
    writeup: z.string().nullish(),
    reviews: pathSchema('projects').array().nullish(),
  })
  .strict()

export type ReviewsSchema = z.infer<typeof reviewsSchema>
