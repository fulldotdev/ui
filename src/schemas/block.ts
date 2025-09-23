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
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productsSchema } from "@/schemas/blocks/products"
import { quoteSchema } from "@/schemas/blocks/quote"
import { reviewsSchema } from "@/schemas/blocks/reviews"

export const blockSchema = z.discriminatedUnion("type", [
  articlesSchema.extend({
    type: z.literal("articles"),
  }),
  bannerSchema.extend({
    type: z.literal("banner"),
  }),
  blogSchema.extend({
    type: z.literal("blog"),
  }),
  collectionsSchema.extend({
    type: z.literal("collections"),
  }),
  contactSchema.extend({
    type: z.literal("contact"),
  }),
  contentSchema.extend({
    type: z.literal("content"),
  }),
  ctaSchema.extend({
    type: z.literal("cta"),
  }),
  faqsSchema.extend({
    type: z.literal("faqs"),
  }),
  featureSchema.extend({
    type: z.literal("feature"),
  }),
  featuresSchema.extend({
    type: z.literal("features"),
  }),
  pricingsSchema.extend({
    type: z.literal("pricings"),
  }),
  footerSchema.extend({
    type: z.literal("footer"),
  }),
  headerSchema.extend({
    type: z.literal("header"),
  }),
  personsSchema.extend({
    type: z.literal("persons"),
  }),
  productsSchema.extend({
    type: z.literal("products"),
  }),
  quoteSchema.extend({
    type: z.literal("quote"),
  }),
  reviewsSchema.extend({
    type: z.literal("reviews"),
  }),
])

export type BlockSchema = z.infer<typeof blockSchema>
