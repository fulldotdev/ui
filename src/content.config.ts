import config from "@/data/config.json"
import { shopifyCollectionsLoader } from "@/loaders/shopify-collections-loader"
import { shopifyProductsLoader } from "@/loaders/shopify-products-loader"
import { collectionSchema } from "@/schemas/content/collection"
import { locationSchema } from "@/schemas/content/location"
import { pageSchema } from "@/schemas/content/page"
import { personSchema } from "@/schemas/content/person"
import { postSchema } from "@/schemas/content/post"
import { productSchema } from "@/schemas/content/product"
import { projectSchema } from "@/schemas/content/project"
import { reviewSchema } from "@/schemas/content/review"
import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/pages",
    }),
    schema: pageSchema,
  }),
  locations: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/locations",
    }),
    schema: locationSchema,
  }),
  persons: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/persons",
    }),
    schema: personSchema,
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
    schema: projectSchema,
  }),
  products: defineCollection({
    loader: config.shopify
      ? shopifyProductsLoader()
      : glob({
          pattern: "**/[^_]*.{md,mdx}",
          base: "./src/content/products",
        }),
    schema: productSchema,
  }),
  collections: defineCollection({
    loader: config.shopify
      ? shopifyCollectionsLoader()
      : glob({
          pattern: "**/[^_]*.{md,mdx}",
          base: "./src/content/collections",
        }),
    schema: collectionSchema,
  }),
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
