import { defineCollection, z } from 'astro:content'
import { blockSchema, pageSchema, path } from 'fulldev-ui'

export const references = {
  pages: path('pages').array(),
  page: path('pages'),
  services: path('services').array(),
  service: path('services'),
  products: path('products').array(),
  product: path('products'),
  reviews: path('reviews').array(),
  review: path('reviews'),
  categories: path('categories').array(),
  category: path('categories'),
  events: path('events').array(),
  event: path('events'),
  posts: path('posts').array(),
  post: path('posts'),
  colleagues: path('colleagues').array(),
  colleague: path('colleagues'),
  lessons: path('lessons').array(),
  lesson: path('lessons'),
  policies: path('policies').array(),
  policy: path('policies'),
  projects: path('projects').array(),
  project: path('projects'),
  jobs: path('jobs').array(),
  job: path('jobs'),
}

export const pageWithReferencesSchema = pageSchema.extend(references)
export const blockWithReferencesSchema = blockSchema.extend(references)
export const blocksWithReferencesSchema = z.union([
  blockWithReferencesSchema.array(),
  z.object({}).catchall(blockWithReferencesSchema),
])

export const contentCollection = defineCollection({
  type: 'content',
  schema: pageWithReferencesSchema
    .extend({
      blocks: blocksWithReferencesSchema,
    })
    .partial(),
})

export const collections = {
  pages: contentCollection,
  products: contentCollection,
  reviews: contentCollection,
  categories: contentCollection,
  events: contentCollection,
  posts: contentCollection,
  colleagues: contentCollection,
  lessons: contentCollection,
  policies: contentCollection,
  projects: contentCollection,
  jobs: contentCollection,
}
