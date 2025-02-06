import { blockSchema } from '@/schemas/fields/block.ts'
import { footerSchema } from '@/schemas/globals/footer.ts'
import { headerSchema } from '@/schemas/globals/header.ts'
import { categorySchema } from '@/schemas/layouts/category.ts'
import { docSchema } from '@/schemas/layouts/doc.ts'
import { pageSchema } from '@/schemas/layouts/page.ts'
import { postSchema } from '@/schemas/layouts/post.ts'
import { productSchema } from '@/schemas/layouts/product.ts'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

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
  blocks: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/collections/blocks',
    }),
    schema: blockSchema,
  }),
}
