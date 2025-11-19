import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { block, layout, page } from "@/lib/schemas"

export const collections = {
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: layout,
  }),
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: page,
  }),
  // Starlight docs
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
}
