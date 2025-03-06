import { collectionsSchema } from "@/schemas/blocks/collections"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featuresSchema } from "@/schemas/blocks/features"
import { heroSchema } from "@/schemas/blocks/hero"
import { pagesSchema } from "@/schemas/blocks/pages"
import { personsSchema } from "@/schemas/blocks/persons"
import { postsSchema } from "@/schemas/blocks/posts"
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productsSchema } from "@/schemas/blocks/products"
import { reviewsSchema } from "@/schemas/blocks/reviews"
import { z } from "astro:content"

export const sectionSchema = z.discriminatedUnion("type", [
  collectionsSchema.extend({
    type: z.literal("collections"),
    variant: z.number().default(1),
  }),
  contactSchema.extend({
    type: z.literal("contact"),
    variant: z.number().default(1),
  }),
  contentSchema.extend({
    type: z.literal("content"),
    variant: z.number().default(1),
  }),
  ctaSchema.extend({
    type: z.literal("cta"),
    variant: z.number().default(1),
  }),
  faqsSchema.extend({
    type: z.literal("faqs"),
    variant: z.number().default(1),
  }),
  featuresSchema.extend({
    type: z.literal("features"),
    variant: z.number().default(1),
  }),
  heroSchema.extend({
    type: z.literal("hero"),
    variant: z.number().default(1),
  }),
  personsSchema.extend({
    type: z.literal("persons"),
    variant: z.number().default(1),
  }),
  postsSchema.extend({
    type: z.literal("posts"),
    variant: z.number().default(1),
  }),
  pricingsSchema.extend({
    type: z.literal("pricings"),
    variant: z.number().default(1),
  }),
  productsSchema.extend({
    type: z.literal("products"),
    variant: z.number().default(1),
  }),
  reviewsSchema.extend({
    type: z.literal("reviews"),
    variant: z.number().default(1),
  }),
])
