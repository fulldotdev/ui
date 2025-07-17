import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import config from "collections.json"
import { mapValues } from "remeda"

import { blockSchema, entrySchema } from "@/lib/schemas"

export const collections = {
  // Collection for re-usable blocks
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml}",
      base: "src/content/blocks",
    }),
    schema: blockSchema,
  }),
  // 🚫 DO NO TOUCH: code for auto-generated collections
  ...mapValues(config, (_, collection) =>
    defineCollection({
      loader: glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: `src/content/${collection}`,
      }),
      schema: entrySchema,
    })
  ),
}
