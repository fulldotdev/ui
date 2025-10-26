import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { layout, page } from "@/lib/schemas"

export const collections = {
  // All pages live within the /src/content/pages directory, optionally with subfolders.
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: page,
  }),
  // All layouts live within the /src/content/layouts directory. Pages can reference a layout by name.
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: layout,
  }),
  // Only add more collections when content comes from other sources than local markdown/mdx files.
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
}
