import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection, z } from 'astro:content'
import {
  categoriesSchema,
  formsSchema,
  jobsSchema,
  pagesSchema,
  policiesSchema,
  postsSchema,
  productsSchema,
  reviewsSchema,
  servicesSchema,
} from 'src/blocks'

const data = defineCollection({
  type: 'data',
  schema: z.any(),
})

export const collections = {
  categories: defineCollection({
    type: 'content',
    schema: categoriesSchema,
  }),
  forms: defineCollection({
    type: 'content',
    schema: formsSchema,
  }),
  jobs: defineCollection({
    type: 'content',
    schema: jobsSchema,
  }),
  pages: defineCollection({
    type: 'content',
    schema: pagesSchema,
  }),
  policies: defineCollection({
    type: 'content',
    schema: policiesSchema,
  }),
  posts: defineCollection({
    type: 'content',
    schema: postsSchema,
  }),
  products: defineCollection({
    type: 'content',
    schema: productsSchema,
  }),
  reviews: defineCollection({
    type: 'content',
    schema: reviewsSchema,
  }),
  services: defineCollection({
    type: 'content',
    schema: servicesSchema,
  }),
  globals: data,
  settings: data,
  docs: defineCollection({ schema: docsSchema() }),
}
