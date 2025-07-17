import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"
import { mapValues, omit } from "remeda"
import collectionsJson from "src/data/collections.json"

import { pageSchema } from "@/lib/schemas"

export const collections = {
  // Collection for re-usable blocks
  collections: defineCollection({
    loader: file("src/data/collections.json"),
    schema: pageSchema,
  }),
  // 🚫 DO NO TOUCH: code for auto-generated collections
  ...mapValues(omit(collectionsJson, ["index"]), (_, collection) =>
    defineCollection({
      loader: glob({
        pattern: "**/[^_]*.{md,mdx,yml,yaml}",
        base: `src/content/${collection}`,
      }),
      schema: pageSchema,
    })
  ),
}
