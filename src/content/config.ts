import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection, reference, z } from 'astro:content'

const content = defineCollection({
  type: 'content',
  schema: z.any(),
})

const data = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
})

export const collections = {
  categories: content,
  pages: content,
  policies: content,
  posts: content,
  products: content,
  reviews: content,
  services: content,
  globals: data,
  settings: data,
  docs: defineCollection({ schema: docsSchema() }),
  test: defineCollection({
    schema: z.object({
      products: z.array(reference('products')),
    }),
  }),
}
