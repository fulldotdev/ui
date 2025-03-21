import { collectionSchema } from "@/schemas/blocks/collection"
import { collectionsSchema } from "@/schemas/blocks/collections"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featuresSchema } from "@/schemas/blocks/features"
import { heroSchema } from "@/schemas/blocks/hero"
import { locationsSchema } from "@/schemas/blocks/locations"
import { mediaSchema } from "@/schemas/blocks/media"
import { pagesSchema } from "@/schemas/blocks/pages"
import { personsSchema } from "@/schemas/blocks/persons"
import { postsSchema } from "@/schemas/blocks/posts"
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productSchema } from "@/schemas/blocks/product"
import { productsSchema } from "@/schemas/blocks/products"
import { reviewsSchema } from "@/schemas/blocks/reviews"
import { z } from "zod"

export const pageSchema = contentSchema
  .merge(productSchema)
  .merge(collectionSchema)
  .extend({
    sections: z
      .discriminatedUnion("type", [
        collectionsSchema.extend({
          type: z.literal("collections"),
          variant: z.number().default(1).optional(),
        }),
        contactSchema.extend({
          type: z.literal("contact"),
          variant: z.number().default(1).optional(),
        }),
        contentSchema.extend({
          type: z.literal("content"),
          variant: z.number().default(1).optional(),
        }),
        ctaSchema.extend({
          type: z.literal("cta"),
          variant: z.number().default(1).optional(),
        }),
        faqsSchema.extend({
          type: z.literal("faqs"),
          variant: z.number().default(1).optional(),
        }),
        featuresSchema.extend({
          type: z.literal("features"),
          variant: z.number().default(1).optional(),
        }),
        heroSchema.extend({
          type: z.literal("hero"),
          variant: z.number().default(1).optional(),
        }),
        locationsSchema.extend({
          type: z.literal("locations"),
          variant: z.number().default(1).optional(),
        }),
        mediaSchema.extend({
          type: z.literal("media"),
          variant: z.number().default(1).optional(),
        }),
        pagesSchema.extend({
          type: z.literal("pages"),
          variant: z.number().default(1).optional(),
        }),
        personsSchema.extend({
          type: z.literal("persons"),
          variant: z.number().default(1).optional(),
        }),
        postsSchema.extend({
          type: z.literal("posts"),
          variant: z.number().default(1).optional(),
        }),
        pricingsSchema.extend({
          type: z.literal("pricings"),
          variant: z.number().default(1).optional(),
        }),
        productsSchema.extend({
          type: z.literal("products"),
          variant: z.number().default(1).optional(),
        }),
        reviewsSchema.extend({
          type: z.literal("reviews"),
          variant: z.number().default(1),
        }),
      ])
      .array()
      .optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  })

export type PageSchema = z.infer<typeof pageSchema>
