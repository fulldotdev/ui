import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const reviewsSchema = z
  .object({
    variant: z.number().default(1),
    content: z.string(),
    reviews: pathSchema('projects').array(),
  })
  .partial()
  .strict()
