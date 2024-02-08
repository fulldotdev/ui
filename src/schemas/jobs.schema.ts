import { defineCollection, z } from 'astro:content'

export const jobsSchema = defineCollection({
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
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
})
