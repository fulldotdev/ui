import { collectionSchema } from '@/schemas/models/collection'
import { pageSchema } from '@/schemas/models/page'
import { postSchema } from '@/schemas/models/post'
import { productSchema } from '@/schemas/models/product'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { collectionFeedSchema } from './schemas/models/collectionFeed'
import { postFeedSchema } from './schemas/models/postFeed'
import { productFeedSchema } from './schemas/models/productFeed'

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/pages',
    }),
    schema: z.discriminatedUnion('type', [
      pageSchema.extend({
        type: z.literal('Page'),
      }),
      pageSchema.extend({
        type: z.literal('Home'),
      }),
      pageSchema.merge(postFeedSchema).extend({
        type: z.literal('PostFeed'),
      }),
      pageSchema.merge(productFeedSchema).extend({
        type: z.literal('ProductFeed'),
      }),
      pageSchema.merge(collectionFeedSchema).extend({
        type: z.literal('CollectionFeed'),
      }),
    ]),
  }),
  posts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/posts',
    }),
    schema: pageSchema.merge(postSchema).extend({
      type: z.literal('Post'),
    }),
  }),
  products: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/products',
    }),
    schema: pageSchema.merge(productSchema).extend({
      type: z.literal('Product'),
    }),
  }),
  collections: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/collections',
    }),
    schema: pageSchema.merge(collectionSchema).extend({
      type: z.literal('Collection'),
    }),
  }),
}
