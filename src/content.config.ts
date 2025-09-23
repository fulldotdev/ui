import { articleLoader } from "@/loaders/article"
import { blockLoader } from "@/loaders/block"
import { blogLoader } from "@/loaders/blog"
import { collectionLoader } from "@/loaders/collection"
import { jobLoader } from "@/loaders/job"
import { layoutLoader } from "@/loaders/layout"
import { pageLoader } from "@/loaders/page"
import { personLoader } from "@/loaders/person"
import { productLoader } from "@/loaders/product"
import { reviewLoader } from "@/loaders/review"
import { serviceLoader } from "@/loaders/service"
import { defineCollection } from "astro:content"

import { blockSchema } from "@/schemas/block"
import { articleSchema } from "@/schemas/blocks/article"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionSchema } from "@/schemas/blocks/collection"
import { jobSchema } from "@/schemas/blocks/job"
import { personSchema } from "@/schemas/blocks/person"
import { productSchema } from "@/schemas/blocks/product"
import { reviewSchema } from "@/schemas/blocks/review"
import { serviceSchema } from "@/schemas/blocks/service"
import { layoutSchema } from "@/schemas/layout"
import { pageSchema } from "@/schemas/page"

export const collections = {
  pages: defineCollection({
    loader: pageLoader(),
    schema: pageSchema,
  }),
  articles: defineCollection({
    loader: articleLoader(),
    schema: articleSchema,
  }),
  blogs: defineCollection({
    loader: blogLoader(),
    schema: blogSchema,
  }),
  products: defineCollection({
    loader: productLoader(),
    schema: productSchema,
  }),
  collections: defineCollection({
    loader: collectionLoader(),
    schema: collectionSchema,
  }),
  persons: defineCollection({
    loader: personLoader(),
    schema: personSchema,
  }),
  reviews: defineCollection({
    loader: reviewLoader(),
    schema: reviewSchema,
  }),
  jobs: defineCollection({
    loader: jobLoader(),
    schema: jobSchema,
  }),
  services: defineCollection({
    loader: serviceLoader(),
    schema: serviceSchema,
  }),
  blocks: defineCollection({
    loader: blockLoader(),
    schema: blockSchema,
  }),
  layouts: defineCollection({
    loader: layoutLoader(),
    schema: layoutSchema,
  }),
}
