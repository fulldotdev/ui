import config from '@/data/config.json'
import { shopifyCollectionsLoader } from '@/loaders/shopify-collections'
import { shopifyProductsLoader } from '@/loaders/shopify-products'
import { articleSchema } from '@/schemas/content/article'
import { collectionSchema } from '@/schemas/content/collection'
import { pageSchema } from '@/schemas/content/page'
import { personSchema } from '@/schemas/content/person'
import { productSchema } from '@/schemas/content/product'
import { projectSchema } from '@/schemas/content/project'
import { reviewSchema } from '@/schemas/content/review'
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
  articles: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/articles',
    }),
    schema: articleSchema,
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
    loader: shopifyCollectionsLoader({
      storeDomain: config.shopify.storeDomain,
      publicAccessToken: config.shopify.publicAccessToken,
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
