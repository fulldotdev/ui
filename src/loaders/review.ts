import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { reviewSchema } from "@/schemas/blocks/review"
import { pageSchema } from "@/schemas/page"

export function reviewLoader(): Loader {
  return {
    name: "review-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/reviews",
      }).load(context)
    },
    schema: reviewSchema.merge(pageSchema),
  }
}
