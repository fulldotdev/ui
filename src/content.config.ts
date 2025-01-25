import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { footerSchema } from 'fulldev-ui/schemas/globals/footer.ts'
import { headerSchema } from 'fulldev-ui/schemas/globals/header.ts'
import { categorySchema } from 'fulldev-ui/schemas/layouts/category.ts'
import { docSchema } from 'fulldev-ui/schemas/layouts/doc.ts'
import { jobSchema } from 'fulldev-ui/schemas/layouts/job.ts'
import { pageSchema } from 'fulldev-ui/schemas/layouts/page.ts'
import { postSchema } from 'fulldev-ui/schemas/layouts/post.ts'
import { productSchema } from 'fulldev-ui/schemas/layouts/product.ts'

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
    schema: z.union([headerSchema, footerSchema]),
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
