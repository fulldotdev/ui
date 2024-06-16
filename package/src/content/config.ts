import { defineCollection, z } from 'astro:content'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: z.any(),
  }),
}
