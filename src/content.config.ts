import { pageSchema } from '@/schemas/collections/page'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/pages',
    }),
    schema: pageSchema,
  }),
  blocks: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: './src/content/blocks',
    }),
    schema: z.any(),
  }),
}
