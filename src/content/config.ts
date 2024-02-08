import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection, z } from 'astro:content'

const content = defineCollection({
  type: 'content',
  schema: z.any(),
})

const data = defineCollection({
  type: 'data',
  schema: z.any(),
})

// @dylan maak voor iedere collection een zod schema (zie pages.schema.ts) en gebruik deze hieronder
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
}
