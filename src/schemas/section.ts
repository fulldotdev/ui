import { z } from "astro:schema"

import articles from "@/schemas/blocks/articles"
import contact from "@/schemas/blocks/contact"
import content from "@/schemas/blocks/content"
import cta from "@/schemas/blocks/cta"
import faqs from "@/schemas/blocks/faqs"
import feature from "@/schemas/blocks/feature"
import features from "@/schemas/blocks/features"
import jobs from "@/schemas/blocks/jobs"
import pages from "@/schemas/blocks/pages"
import persons from "@/schemas/blocks/persons"
import pricings from "@/schemas/blocks/pricings"
import products from "@/schemas/blocks/products"
import quote from "@/schemas/blocks/quote"
import reviews from "@/schemas/blocks/reviews"

export default z.discriminatedUnion("type", [
  z.object({
    type: z.literal("articles"),
    ...articles.shape,
  }),
  z.object({
    type: z.literal("contact"),
    ...contact.shape,
  }),
  z.object({
    type: z.literal("content"),
    ...content.shape,
  }),
  z.object({
    type: z.literal("cta"),
    ...cta.shape,
  }),
  z.object({
    type: z.literal("faqs"),
    ...faqs.shape,
  }),
  z.object({
    type: z.literal("feature"),
    ...feature.shape,
  }),
  z.object({
    type: z.literal("features"),
    ...features.shape,
  }),
  z.object({
    type: z.literal("jobs"),
    ...jobs.shape,
  }),
  z.object({
    type: z.literal("pages"),
    ...pages.shape,
  }),
  z.object({
    type: z.literal("persons"),
    ...persons.shape,
  }),
  z.object({
    type: z.literal("pricings"),
    ...pricings.shape,
  }),
  z.object({
    type: z.literal("products"),
    ...products.shape,
  }),
  z.object({
    type: z.literal("quote"),
    ...quote.shape,
  }),
  z.object({
    type: z.literal("reviews"),
    ...reviews.shape,
  }),
])
