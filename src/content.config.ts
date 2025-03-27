import { shopifyLoader } from "@/loaders/shopify"
import { blockSchema } from "@/schemas/block"
import { itemSchema } from "@/schemas/item"
import { pageSchema } from "@/schemas/page"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/pages`,
    }),
    schema: pageSchema,
  }),
  items: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml,json}",
      base: `./src/content/items`,
    }),
    schema: itemSchema,
  }),
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/blocks`,
    }),
    schema: blockSchema,
  }),
  shopify: defineCollection({
    loader: shopifyLoader(),
    schema: pageSchema,
  }),
}
