import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"
import { pageSchema } from "src/lib/schemas"

export const collections = {
  layouts: defineCollection({
    loader: file("src/data/layouts.yaml"),
    schema: pageSchema,
  }),
  content: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `src/content`,
    }),
    schema: pageSchema,
  }),
}
