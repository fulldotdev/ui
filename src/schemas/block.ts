import { z } from "astro:schema"

import { articleSchema } from "@/schemas/blocks/article"
import { articlesSchema } from "@/schemas/blocks/articles"
import { bannerSchema } from "@/schemas/blocks/banner"
import { blocksSchema } from "@/schemas/blocks/blocks"
import { blogSchema } from "@/schemas/blocks/blog"
import { collectionSchema } from "@/schemas/blocks/collection"
import { collectionsSchema } from "@/schemas/blocks/collections"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featureSchema } from "@/schemas/blocks/feature"
import { featuresSchema } from "@/schemas/blocks/features"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { jobSchema } from "@/schemas/blocks/job"
import { jobsSchema } from "@/schemas/blocks/jobs"
import { personSchema } from "@/schemas/blocks/person"
import { personsSchema } from "@/schemas/blocks/persons"
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productSchema } from "@/schemas/blocks/product"
import { productsSchema } from "@/schemas/blocks/products"
import { quoteSchema } from "@/schemas/blocks/quote"
import { reviewSchema } from "@/schemas/blocks/review"
import { reviewsSchema } from "@/schemas/blocks/reviews"
import { serviceSchema } from "@/schemas/blocks/service"
import { servicesSchema } from "@/schemas/blocks/services"

export const blockSchema = z.discriminatedUnion("type", [
  articleSchema.extend({
    type: z.literal("article"),
  }),
  articlesSchema.extend({
    type: z.literal("articles"),
  }),
  bannerSchema.extend({
    type: z.literal("banner"),
  }),
  blocksSchema.extend({
    type: z.literal("blocks"),
  }),
  blogSchema.extend({
    type: z.literal("blog"),
  }),
  collectionSchema.extend({
    type: z.literal("collection"),
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
  footerSchema.extend({
    type: z.literal("footer"),
  }),
  headerSchema.extend({
    type: z.literal("header"),
  }),
  jobSchema.extend({
    type: z.literal("job"),
  }),
  jobsSchema.extend({
    type: z.literal("jobs"),
  }),
  personSchema.extend({
    type: z.literal("person"),
  }),
  personsSchema.extend({
    type: z.literal("persons"),
  }),
  pricingsSchema.extend({
    type: z.literal("pricings"),
  }),
  productSchema.extend({
    type: z.literal("product"),
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
  serviceSchema.extend({
    type: z.literal("service"),
  }),
  servicesSchema.extend({
    type: z.literal("services"),
  }),
])

export type BlockSchema = z.infer<typeof blockSchema>
