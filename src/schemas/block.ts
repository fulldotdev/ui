import { z } from "astro:schema"

import { articlesSchema } from "@/schemas/blocks/articles"
import { bannerSchema } from "@/schemas/blocks/banner"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionsSchema } from "@/schemas/blocks/collections"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featureSchema } from "@/schemas/blocks/feature"
import { featuresSchema } from "@/schemas/blocks/features"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { personsSchema } from "@/schemas/blocks/persons"
import { productsSchema } from "@/schemas/blocks/products"
import { quoteSchema } from "@/schemas/blocks/quote"
import { reviewsSchema } from "@/schemas/blocks/reviews"
import { pathSchema } from "@/schemas/fields/path"

export const blockSchema = z.discriminatedUnion("type", [
  articlesSchema.extend({
    type: z.literal("articles"),
    variant: z.enum(["1", "2"]),
    articles: pathSchema("articles").array().optional(),
    blog: pathSchema("blogs").optional(),
  }),
  bannerSchema.extend({
    type: z.literal("banner"),
    variant: z.enum(["1", "2"]),
  }),
  blogSchema.extend({
    type: z.literal("blog"),
    variant: z.enum(["1", "2"]),
  }),
  collectionsSchema.extend({
    type: z.literal("collections"),
    variant: z.enum(["1", "2"]),
    collections: pathSchema("collections").array().optional(),
  }),
  contactSchema.extend({
    type: z.literal("contact"),
    variant: z.enum(["1", "2"]),
  }),
  contentSchema.extend({
    type: z.literal("content"),
    variant: z.enum(["1", "2"]),
  }),
  ctaSchema.extend({
    type: z.literal("cta"),
    variant: z.enum(["1", "2"]),
  }),
  faqsSchema.extend({
    type: z.literal("faqs"),
    variant: z.enum(["1", "2"]),
  }),
  featureSchema.extend({
    type: z.literal("feature"),
    variant: z.enum(["1", "2"]),
  }),
  featuresSchema.extend({
    type: z.literal("features"),
    variant: z.enum(["1", "2"]),
  }),
  footerSchema.extend({
    type: z.literal("footer"),
    variant: z.enum(["1", "2"]),
  }),
  headerSchema.extend({
    type: z.literal("header"),
    variant: z.enum(["1", "2"]),
  }),
  personsSchema.extend({
    type: z.literal("persons"),
    variant: z.enum(["1", "2"]),
    persons: pathSchema("persons").array().optional(),
  }),
  productsSchema.extend({
    type: z.literal("products"),
    variant: z.enum(["1", "2"]),
    products: pathSchema("products").array().optional(),
    collection: pathSchema("collections").optional(),
  }),
  quoteSchema.extend({
    type: z.literal("quote"),
    variant: z.enum(["1", "2"]),
  }),
  reviewsSchema.extend({
    type: z.literal("reviews"),
    variant: z.enum(["1", "2"]),
    reviews: pathSchema("reviews").array().optional(),
  }),
])

export type BlockSchema = z.infer<typeof blockSchema>
