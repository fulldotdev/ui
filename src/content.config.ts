import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { dataSchema } from "src/lib/schemas"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: dataSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: dataSchema,
  }),
}
