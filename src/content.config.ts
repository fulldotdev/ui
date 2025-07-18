import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"
import { pageSchema } from "src/lib/schemas"

export const collections = {
  collections: defineCollection({
    loader: file("src/data/collections.json"),
    schema: pageSchema,
  }),
  content: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx,yml,yaml}",
      base: `src/content`,
    }),
    schema: pageSchema,
  }),
}
