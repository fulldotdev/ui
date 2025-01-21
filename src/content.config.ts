import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { globalSchema } from 'fulldev-ui/schemas/global.ts'
import { pageSchema } from 'fulldev-ui/schemas/page.ts'

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
    schema: pageSchema,
  }),
  globals: defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{yml,yaml}',
      base: './src/content/globals',
    }),
    schema: globalSchema,
  }),
  // blocks: defineCollection({
  //   loader: glob({
  //     pattern: '**/[^_]*.{md,mdx}',
  //     base: './src/content/blocks',
  //   }),
  //   schema: blockSchema.extend({ variants: z.number().optional() }),
  // }),
}
