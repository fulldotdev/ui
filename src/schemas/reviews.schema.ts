import { defineCollection, z } from 'astro:content'

export const reviewsSchema = defineCollection({
  type: 'content',
  schema: z.object({
    rating: z.number(),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    image: z.string(),
  }),
})
