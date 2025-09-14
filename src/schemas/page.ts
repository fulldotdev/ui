import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { articleSchema } from "@/schemas/blocks/article"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionSchema } from "@/schemas/blocks/collection"
import { contentSchema } from "@/schemas/blocks/content"
import { personSchema } from "@/schemas/blocks/person"
import { productSchema } from "@/schemas/blocks/product"
import { reviewSchema } from "@/schemas/blocks/review"
import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"
import { seoSchema } from "@/schemas/fields/seo"

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: imageSchema.optional(),
  sections: blockSchema.array().optional(),
  seo: seoSchema.optional(),
})

export const pageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("page"),
  }),
  contentSchema.merge(baseSchema).extend({
    type: z.literal("content"),
  }),
  collectionSchema.merge(baseSchema).extend({
    type: z.literal("collection"),
  }),
  productSchema.merge(baseSchema).extend({
    type: z.literal("product"),
    collections: pathSchema.array().optional(),
  }),
  articleSchema.merge(baseSchema).extend({
    type: z.literal("article"),
    blog: pathSchema.optional(),
    person: pathSchema.optional(),
  }),
  blogSchema.merge(baseSchema).extend({
    type: z.literal("blog"),
  }),
  personSchema.merge(baseSchema).extend({
    type: z.literal("person"),
  }),
  reviewSchema.merge(baseSchema).extend({
    type: z.literal("review"),
  }),
])
