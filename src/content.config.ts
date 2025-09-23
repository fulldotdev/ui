import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { articleSchema } from "@/schemas/blocks/article"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionSchema } from "@/schemas/blocks/collection"
import { personSchema } from "@/schemas/blocks/person"
import { productSchema } from "@/schemas/blocks/product"
import { reviewSchema } from "@/schemas/blocks/review"
import { layoutSchema } from "@/schemas/layout"
import { pageSchema } from "@/schemas/page"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: pageSchema,
  }),
  articles: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/articles",
    }),
    schema: articleSchema.merge(pageSchema),
  }),
  blogs: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/blogs",
    }),
    schema: blogSchema.merge(pageSchema),
  }),
  products: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/products",
    }),
    schema: productSchema.merge(pageSchema),
  }),
  collections: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/collections",
    }),
    schema: collectionSchema.merge(pageSchema),
  }),
  persons: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/persons",
    }),
    schema: personSchema.merge(pageSchema),
  }),
  reviews: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/reviews",
    }),
    schema: reviewSchema.merge(pageSchema),
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/layouts",
    }),
    schema: layoutSchema.merge(pageSchema),
  }),
}
