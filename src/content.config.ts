import { shopifyCollectionsLoader } from '@/loaders/shopify-collections-loader'
import { shopifyProductsLoader } from '@/loaders/shopify-products-loader'
import { articleSchema } from '@/schemas/content/article'
import { pageSchema } from '@/schemas/content/page'
import { personSchema } from '@/schemas/content/person'
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
    loader: shopifyProductsLoader(),
  }),
  collections: defineCollection({
    loader: shopifyCollectionsLoader(),
  }),
  reviews: defineCollection({
    loader: file('src/content/reviews.json', {
      parser: (text) => JSON.parse(text).map((item: any, index: number) => ({ ...item, id: index })),
    }),
    schema: reviewSchema,
  }),
}
