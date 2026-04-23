import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { globalSchema } from "@/schemas/global"
import { pageSchema } from "@/schemas/page"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: pageSchema,
  }),
  globals: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/globals",
    }),
    schema: globalSchema,
  }),
}
