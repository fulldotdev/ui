import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { collectionSchema } from 'fulldev-ui/schemas/collections/collection.ts'
import { docSchema } from 'fulldev-ui/schemas/collections/doc.ts'
import { globalSchema } from 'fulldev-ui/schemas/collections/global.ts'
import { jobSchema } from 'fulldev-ui/schemas/collections/job.ts'
import { pageSchema } from 'fulldev-ui/schemas/collections/page.ts'
import { postSchema } from 'fulldev-ui/schemas/collections/post.ts'
import { productSchema } from 'fulldev-ui/schemas/collections/product.ts'

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
    schema: pageSchema,
  }),
  products: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/products',
    }),
    schema: productSchema,
  }),
  posts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/posts',
    }),
    schema: postSchema,
  }),
  docs: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/docs',
    }),
    schema: docSchema,
  }),
  jobs: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/jobs',
    }),
    schema: jobSchema,
  }),
  overviews: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/content/overviews',
    }),
    schema: collectionSchema,
  }),
  globals: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/content/globals',
    }),
    schema: globalSchema,
  }),
}
