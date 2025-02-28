import config from '@/data/config.json'
import { shopifyProductsLoader } from '@/loaders/shopifyProducts'
import { collectionSchema } from '@/schemas/layouts/collection'
import { pageSchema } from '@/schemas/layouts/page'
import { personSchema } from '@/schemas/layouts/person'
import { postSchema } from '@/schemas/layouts/post'
import { productSchema } from '@/schemas/layouts/product'
import { projectSchema } from '@/schemas/layouts/project'
import { reviewSchema } from '@/schemas/layouts/review'
import { file, glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/pages',
    }),
    schema: pageSchema,
  }),
  posts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/posts',
    }),
    schema: postSchema,
  }),
  projects: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/projects',
    }),
    schema: projectSchema,
  }),
  persons: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/persons',
    }),
    schema: personSchema,
  }),
  products: defineCollection({
    loader: shopifyProductsLoader({
      storeDomain: config.shopify.storeDomain,
      publicAccessToken: config.shopify.publicAccessToken,
    }),
    schema: productSchema,
  }),
  collections: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/collections',
    }),
    schema: collectionSchema,
  }),
  reviews: defineCollection({
    loader: file('src/content/reviews.json', {
      parser: (text) => JSON.parse(text).map((item: any, index: number) => ({ ...item, id: index })),
    }),
    schema: reviewSchema,
  }),
}
