import { z } from "astro:schema"

import { articlesSchema } from "@/schemas/blocks/articles"
import { blocksSchema } from "@/schemas/blocks/blocks"
import { collectionsSchema } from "@/schemas/blocks/collections"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featureSchema } from "@/schemas/blocks/feature"
import { featuresSchema } from "@/schemas/blocks/features"
import { jobsSchema } from "@/schemas/blocks/jobs"
import { mapSchema } from "@/schemas/blocks/map"
import { pagesSchema } from "@/schemas/blocks/pages"
import { personsSchema } from "@/schemas/blocks/persons"
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productsSchema } from "@/schemas/blocks/products"
import { quoteSchema } from "@/schemas/blocks/quote"
import { reviewSchema } from "@/schemas/blocks/review"
import { reviewsSchema } from "@/schemas/blocks/reviews"

export const sectionSchema = z.discriminatedUnion("type", [
  articlesSchema.extend({
    type: z.literal("articles"),
  }),
  blocksSchema.extend({
    type: z.literal("blocks"),
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
  jobsSchema.extend({
    type: z.literal("jobs"),
  }),
  mapSchema.extend({
    type: z.literal("map"),
  }),
  personsSchema.extend({
    type: z.literal("persons"),
  }),
  pricingsSchema.extend({
    type: z.literal("pricings"),
  }),
  productsSchema.extend({
    type: z.literal("products"),
  }),
  quoteSchema.extend({
    type: z.literal("quote"),
  }),
  reviewSchema.extend({
    type: z.literal("review"),
  }),
  reviewsSchema.extend({
    type: z.literal("reviews"),
  }),
  pagesSchema.extend({
    type: z.literal("pages"),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
