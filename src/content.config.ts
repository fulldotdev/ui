import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { pageSchema } from 'fulldev-ui/schemas/collections/page'
import { blockSchema } from './schemas/collections/block'

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
    schema: blockSchema,
  }),
}
