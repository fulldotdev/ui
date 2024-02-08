import { defineCollection, z } from 'astro:content'

export const policiesSchema = defineCollection({
  type: 'content',
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
    }),
  }),
})
