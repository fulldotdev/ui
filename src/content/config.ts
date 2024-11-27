import { defineCollection } from 'astro:content'
import imageLoader from 'fulldev-ui/loaders/imageLoader.ts'
import imageSchema from 'fulldev-ui/schemas/imageSchema.ts'
import layoutSchema from 'fulldev-ui/schemas/layoutSchema'
import pageSchema from 'fulldev-ui/schemas/pageSchema'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  presets: defineCollection({
    type: 'data',
    schema: layoutSchema,
  }),
  images: defineCollection({
    loader: imageLoader,
    schema: imageSchema,
  }),
}
