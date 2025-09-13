import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { layoutSchema } from "@/schemas/layout"
import { pageSchema } from "@/schemas/page"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: pageSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: layoutSchema,
  }),
}
