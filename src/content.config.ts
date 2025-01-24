import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { categorySchema } from 'fulldev-ui/schemas/collections/category.ts'
import { docSchema } from 'fulldev-ui/schemas/collections/doc.ts'
import { globalSchema } from 'fulldev-ui/schemas/collections/global.ts'
import { jobSchema } from 'fulldev-ui/schemas/collections/job.ts'
import { pageSchema } from 'fulldev-ui/schemas/collections/page.ts'
import { postSchema } from 'fulldev-ui/schemas/collections/post.ts'
import { productSchema } from 'fulldev-ui/schemas/collections/product.ts'

export const collections = {
  categories: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/collections/categories',
    }),
    schema: categorySchema,
  }),
  docs: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/collections/docs',
    }),
    schema: docSchema,
  }),
  globals: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/collections/globals',
    }),
    schema: globalSchema,
  }),
  jobs: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/collections/jobs',
    }),
    schema: jobSchema,
  }),
  pages: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/collections/pages',
    }),
    schema: pageSchema,
  }),
  posts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/collections/posts',
    }),
    schema: postSchema,
  }),
  products: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/collections/products',
    }),
    schema: productSchema,
  }),
}
