import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { collectionSchema } from "@/schemas/blocks/collection"
import { pageSchema } from "@/schemas/page"

export function collectionLoader(): Loader {
  return {
    name: "collection-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/collections",
      }).load(context)
    },
    schema: collectionSchema.merge(pageSchema),
  }
}
