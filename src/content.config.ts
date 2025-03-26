import {
  astroBlockSchema,
  astroItemSchema,
  astroLayoutSchema,
  astroPageSchema,
} from "@/adapters/astro/schemas"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/pages`,
    }),
    schema: astroPageSchema,
  }),
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/blocks`,
    }),
    schema: astroBlockSchema,
  }),
  items: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml,json}",
      base: `./src/content/items`,
    }),
    schema: astroItemSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{json,yml,yaml}",
      base: `./src/content/layouts`,
    }),
    schema: astroLayoutSchema,
  }),
}
