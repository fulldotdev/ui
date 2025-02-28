import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const reviewsSchema = z
  .object({
    type: z.literal('Reviews').default('Reviews'),
    writeup: z.string().nullish(),
    reviews: pathSchema('projects').array().nullish(),
  })
  .strict()
