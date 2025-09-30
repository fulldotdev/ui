import { z } from "astro:schema"

import { articlesProps, articlesSchema } from "@/schemas/blocks/articles"
import { blocksProps, blocksSchema } from "@/schemas/blocks/blocks"
import { contactProps, contactSchema } from "@/schemas/blocks/contact"
import { contentProps, contentSchema } from "@/schemas/blocks/content"
import { ctaProps, ctaSchema } from "@/schemas/blocks/cta"
import { faqsProps, faqsSchema } from "@/schemas/blocks/faqs"
import { featureProps, featureSchema } from "@/schemas/blocks/feature"
import { featuresProps, featuresSchema } from "@/schemas/blocks/features"
import { jobsProps, jobsSchema } from "@/schemas/blocks/jobs"
import { mapProps, mapSchema } from "@/schemas/blocks/map"
import { pagesProps, pagesSchema } from "@/schemas/blocks/pages"
import { personsProps, personsSchema } from "@/schemas/blocks/persons"
import { pricingsProps, pricingsSchema } from "@/schemas/blocks/pricings"
import { productsProps, productsSchema } from "@/schemas/blocks/products"
import { quoteProps, quoteSchema } from "@/schemas/blocks/quote"
import { reviewsProps, reviewsSchema } from "@/schemas/blocks/reviews"

export const sectionSchema = z.discriminatedUnion("type", [
  articlesSchema.extend({
    type: z.literal("articles"),
  }),
  blocksSchema.extend({
    type: z.literal("blocks"),
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
  reviewsSchema.extend({
    type: z.literal("reviews"),
  }),
  pagesSchema.extend({
    type: z.literal("pages"),
  }),
])

export const sectionProps = z.discriminatedUnion("type", [
  articlesProps.extend({
    type: z.literal("articles"),
  }),
  blocksProps.extend({
    type: z.literal("blocks"),
  }),
  contactProps.extend({
    type: z.literal("contact"),
  }),
  contentProps.extend({
    type: z.literal("content"),
  }),
  ctaProps.extend({
    type: z.literal("cta"),
  }),
  faqsProps.extend({
    type: z.literal("faqs"),
  }),
  featureProps.extend({
    type: z.literal("feature"),
  }),
  featuresProps.extend({
    type: z.literal("features"),
  }),
  jobsProps.extend({
    type: z.literal("jobs"),
  }),
  mapProps.extend({
    type: z.literal("map"),
  }),
  personsProps.extend({
    type: z.literal("persons"),
  }),
  pricingsProps.extend({
    type: z.literal("pricings"),
  }),
  productsProps.extend({
    type: z.literal("products"),
  }),
  quoteProps.extend({
    type: z.literal("quote"),
  }),
  reviewsProps.extend({
    type: z.literal("reviews"),
  }),
  pagesProps.extend({
    type: z.literal("pages"),
  }),
])

export type SectionSchema = z.infer<typeof sectionSchema>
export type SectionProps = z.infer<typeof sectionProps>
