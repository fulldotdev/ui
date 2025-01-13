import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { cardSchema } from 'fulldev-ui/schemas/card.ts'
import { pageSchema } from 'fulldev-ui/schemas/page.ts'

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
    schema: pageSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/content/layouts',
    }),
    schema: pageSchema,
  }),
  records: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/content/records',
    }),
    schema: cardSchema,
  }),
}
