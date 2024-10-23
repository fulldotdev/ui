import { defineCollection } from 'astro:content'
import imageLoader from 'fulldev-ui/loaders/imageLoader.ts'
import imageSchema from 'fulldev-ui/schemas/imageSchema.ts'
import pageSchema from 'fulldev-ui/schemas/pageSchema.ts'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  presets: defineCollection({
    type: 'data',
    schema: pageSchema,
  }),
  images: defineCollection({
    loader: imageLoader,
    schema: imageSchema,
  }),
}
