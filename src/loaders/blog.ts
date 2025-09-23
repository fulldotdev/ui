import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { blogSchema } from "@/schemas/blocks/blog"
import { pageSchema } from "@/schemas/page"

export function blogLoader(): Loader {
  return {
    name: "blog-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/blogs",
      }).load(context)
    },
    schema: blogSchema.merge(pageSchema),
  }
}
