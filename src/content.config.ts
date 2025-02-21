import { collectionSchema } from '@/schemas/models/collection'
import { pageSchema } from '@/schemas/models/page'
import { postSchema } from '@/schemas/models/post'
import { productSchema } from '@/schemas/models/product'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/pages',
    }),
    schema: pageSchema.extend({
      type: z.enum(['Page', 'Home']).default('Page'),
    }),
  }),
  posts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/posts',
    }),
    schema: pageSchema.merge(postSchema).extend({
      type: z.literal('Post').default('Post'),
    }),
  }),
  products: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/products',
    }),
    schema: pageSchema.merge(productSchema).extend({
      type: z.literal('Product').default('Product'),
    }),
  }),
  collections: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/collections',
    }),
    schema: pageSchema.merge(collectionSchema).extend({
      type: z.literal('Collection').default('Collection'),
    }),
  }),
}
