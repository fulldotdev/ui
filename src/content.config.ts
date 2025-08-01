import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { pageSchema } from "src/lib/schemas"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `src/content/pages`,
    }),
    schema: pageSchema,
  }),
  content: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx,yaml,yml,json}",
      base: `src/content`,
    }),
    schema: pageSchema,
  }),
}
