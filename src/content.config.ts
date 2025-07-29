import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { pageSchema } from "src/lib/schemas"

export const collections = {
  content: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `src/content`,
    }),
    schema: pageSchema,
  }),
}
