import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

import { banner, footer, header, layout, page, section } from "@/lib/schemas"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: page,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: layout,
  }),

  // Docs site specific collections
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/blocks",
    }),
    schema: z.object({
      ...page.shape,
      ...section.shape,
      ...header.shape,
      ...footer.shape,
      ...banner.shape,
    }),
  }),
}
