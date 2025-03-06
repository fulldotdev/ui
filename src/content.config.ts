import { shopifyCollectionsLoader } from "@/loaders/shopify-collections-loader"
import { shopifyProductsLoader } from "@/loaders/shopify-products-loader"
import { pageSchema } from "@/schemas/content/page"
import { postSchema } from "@/schemas/content/post"
import { reviewSchema } from "@/schemas/content/review"
import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"

import { collectionSchema } from "./schemas/content/collection"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/pages",
    }),
    schema: pageSchema,
  }),
  posts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/posts",
    }),
    schema: postSchema,
  }),
  projects: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/projects",
    }),
    schema: pageSchema,
  }),
  persons: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/persons",
    }),
    schema: pageSchema,
  }),
  // products: defineCollection({
  //   loader: shopifyProductsLoader(),
  // }),
  // collections: defineCollection({
  //   loader: shopifyCollectionsLoader(),
  // }),
  reviews: defineCollection({
    loader: file("src/content/reviews.json", {
      parser: (text) =>
        JSON.parse(text).map((item: any, index: number) => ({
          ...item,
          id: `review-${index}`,
        })),
    }),
    schema: reviewSchema,
  }),
}
