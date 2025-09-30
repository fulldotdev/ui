import { z } from "astro:schema"

import { articleProps, articleSchema } from "@/schemas/blocks/article"
import { jobProps, jobSchema } from "@/schemas/blocks/job"
import { personProps, personSchema } from "@/schemas/blocks/person"
import { productProps, productSchema } from "@/schemas/blocks/product"
import { reviewProps, reviewSchema } from "@/schemas/blocks/review"
import { imageSchema } from "@/schemas/fields/image"
import { sectionProps, sectionSchema } from "@/schemas/section"

const baseSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
  })
  .partial()
  .strict()

export const pageSchema = z.discriminatedUnion("type", [
  baseSchema.extend({
    type: z.undefined(),
  }),
  articleSchema.merge(baseSchema).extend({
    type: z.literal("article"),
  }),
  productSchema.merge(baseSchema).extend({
    type: z.literal("product"),
  }),
  personSchema.merge(baseSchema).extend({
    type: z.literal("person"),
  }),
  reviewSchema.merge(baseSchema).extend({
    type: z.literal("review"),
  }),
  jobSchema.merge(baseSchema).extend({
    type: z.literal("job"),
  }),
])

const baseProps = baseSchema
  .extend({
    sections: sectionProps.array(),
  })
  .partial()
  .strict()

export const pageProps = z.discriminatedUnion("type", [
  baseProps.extend({
    type: z.undefined(),
  }),
  articleProps.merge(baseProps).extend({
    type: z.literal("article"),
  }),
  productProps.merge(baseProps).extend({
    type: z.literal("product"),
  }),
  personProps.merge(baseProps).extend({
    type: z.literal("person"),
  }),
  reviewProps.merge(baseProps).extend({
    type: z.literal("review"),
  }),
  jobProps.merge(baseProps).extend({
    type: z.literal("job"),
  }),
])

export type PageSchema = z.infer<typeof pageSchema>
export type PageProps = z.infer<typeof pageProps>
