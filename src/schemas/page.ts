import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { articleSchema } from "@/schemas/blocks/article"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionSchema } from "@/schemas/blocks/collection"
import { contentSchema } from "@/schemas/blocks/content"
import { personSchema } from "@/schemas/blocks/person"
import { productSchema } from "@/schemas/blocks/product"
import { reviewSchema } from "@/schemas/blocks/review"
import { pathSchema } from "@/schemas/fields/path"
import { seoSchema } from "@/schemas/fields/seo"

export const pageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("page"),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  contentSchema.extend({
    type: z.literal("content"),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  collectionSchema.extend({
    type: z.literal("collection"),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  productSchema.extend({
    type: z.literal("product"),
    collections: pathSchema("collections").array().optional(),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  articleSchema.extend({
    type: z.literal("article"),
    blog: pathSchema("blogs").optional(),
    person: pathSchema("persons").optional(),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  blogSchema.extend({
    type: z.literal("blog"),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  personSchema.extend({
    type: z.literal("person"),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
  }),
  reviewSchema.extend({
    type: z.literal("review"),
  }),
])
