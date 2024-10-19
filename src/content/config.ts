import { defineCollection } from 'astro:content'
import imageLoader from 'fulldev-ui/loaders/imageLoader'
import imageSchema from 'fulldev-ui/schemas/imageSchema'
import pageSchema from 'fulldev-ui/schemas/pageSchema'
import presetSchema from 'fulldev-ui/schemas/presetSchema'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  presets: defineCollection({
    type: 'data',
    schema: presetSchema,
  }),
  images: defineCollection({
    loader: imageLoader,
    schema: imageSchema,
  }),
}
