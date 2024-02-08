import { defineCollection, z } from 'astro:content'

export const productsSchema = defineCollection({
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
    title: z.string(),
    summary: z.string(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    ),
    categories: z.array(z.string()),
    price: z.number(),
    options: z.array(
      z.object({
        key: z.string(),
        values: z.array(
          z.object({
            value: z.string(),
            fee: z.number(),
          })
        ),
      })
    ),
  }),
})
