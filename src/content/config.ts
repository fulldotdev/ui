import { defineCollection, z } from 'astro:content'

const content = defineCollection({
  type: 'content',
  schema: z.any(),
})

const data = defineCollection({
  type: 'data',
  schema: z.any(),
})

const docs = defineCollection({
  type: 'content',
  schema: z.any(),
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
  blocks: data,
  docs: docs,
}
