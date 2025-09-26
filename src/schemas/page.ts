import { z } from "astro:schema"

import { articleSchema } from "@/schemas/blocks/article"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionSchema } from "@/schemas/blocks/collection"
import { jobSchema } from "@/schemas/blocks/job"
import { personSchema } from "@/schemas/blocks/person"
import { productSchema } from "@/schemas/blocks/product"
import { reviewSchema } from "@/schemas/blocks/review"
import { imageSchema } from "@/schemas/fields/image"
import { sectionSchema } from "@/schemas/section"

const defaultPageSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
  })
  .partial()
  .strict()

export const pageSchema = z.discriminatedUnion("type", [
  defaultPageSchema.extend({
    type: z.undefined(),
  }),
  articleSchema.merge(defaultPageSchema).extend({
    type: z.literal("article"),
  }),
  blogSchema.merge(defaultPageSchema).extend({
    type: z.literal("blog"),
  }),
  productSchema.merge(defaultPageSchema).extend({
    type: z.literal("product"),
  }),
  collectionSchema.merge(defaultPageSchema).extend({
    type: z.literal("collection"),
  }),
  personSchema.merge(defaultPageSchema).extend({
    type: z.literal("person"),
  }),
  reviewSchema.merge(defaultPageSchema).extend({
    type: z.literal("review"),
  }),
  jobSchema.merge(defaultPageSchema).extend({
    type: z.literal("job"),
  }),
])

export type PageSchema = z.infer<typeof pageSchema>
