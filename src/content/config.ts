import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection, z } from 'astro:content'
import {
  categorySchema,
  formsSchema,
  jobSchema,
  pageSchema,
  policySchema,
  postSchema,
  productSchema,
  reviewSchema,
  serviceSchema,
} from '../blocks'

const data = defineCollection({
  type: 'data',
  schema: z.any(),
})

export const collections = {
  categories: defineCollection({
    type: 'content',
    schema: categorySchema,
  }),
  forms: defineCollection({
    type: 'content',
    schema: formsSchema,
  }),
  jobs: defineCollection({
    type: 'content',
    schema: jobSchema,
  }),
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  policies: defineCollection({
    type: 'content',
    schema: policySchema,
  }),
  posts: defineCollection({
    type: 'content',
    schema: postSchema,
  }),
  products: defineCollection({
    type: 'content',
    schema: productSchema,
  }),
  reviews: defineCollection({
    type: 'content',
    schema: reviewSchema,
  }),
  services: defineCollection({
    type: 'content',
    schema: serviceSchema,
  }),
  globals: data,
  settings: data,
  docs: defineCollection({ schema: docsSchema() }),
}
