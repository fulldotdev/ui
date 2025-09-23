import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { articleSchema } from "@/schemas/blocks/article"
import { pageSchema } from "@/schemas/page"

export function articleLoader(): Loader {
  return {
    name: "article-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/articles",
      }).load(context)
    },
    schema: articleSchema.merge(pageSchema),
  }
}
