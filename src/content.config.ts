import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { layoutSchema } from "@/schemas/layout"
import { pageSchema } from "@/schemas/page"
import { sectionSchema } from "@/schemas/section"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/pages`,
    }),
    schema: pageSchema,
  }),
  sections: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/sections`,
    }),
    schema: sectionSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{json,yml,yaml}",
      base: `./src/content/layouts`,
    }),
    schema: layoutSchema,
  }),
}
