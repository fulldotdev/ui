import { layoutSchema } from "@/schemas/content/layout"
import { pageSchema } from "@/schemas/content/page"
import { reviewSchema } from "@/schemas/content/review"
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
  reviews: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{json,yml,yaml}",
      base: `./src/content/reviews`,
    }),
    schema: reviewSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{json,yml,yaml}",
      base: `./src/content/layouts`,
    }),
    schema: layoutSchema,
  }),
}
