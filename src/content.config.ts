import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { blockSchema } from "@/schemas/block"
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
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/blocks",
    }),
    schema: blockSchema as any,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: layoutSchema,
  }),
}
