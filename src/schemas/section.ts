import { z } from "astro:schema"

import { articles } from "@/schemas/blocks/articles"
import { blocks } from "@/schemas/blocks/blocks"
import { contact } from "@/schemas/blocks/contact"
import { content } from "@/schemas/blocks/content"
import { cta } from "@/schemas/blocks/cta"
import { faqs } from "@/schemas/blocks/faqs"
import { feature } from "@/schemas/blocks/feature"
import { features } from "@/schemas/blocks/features"
import { jobs } from "@/schemas/blocks/jobs"
import { map } from "@/schemas/blocks/map"
import { pages } from "@/schemas/blocks/pages"
import { persons } from "@/schemas/blocks/persons"
import { pricings } from "@/schemas/blocks/pricings"
import { products } from "@/schemas/blocks/products"
import { quote } from "@/schemas/blocks/quote"
import { reviews } from "@/schemas/blocks/reviews"

export const section = z.discriminatedUnion("type", [
  articles.extend({
    type: z.literal("articles"),
  }),
  blocks.extend({
    type: z.literal("blocks"),
  }),
  contact.extend({
    type: z.literal("contact"),
  }),
  content.extend({
    type: z.literal("content"),
  }),
  cta.extend({
    type: z.literal("cta"),
  }),
  faqs.extend({
    type: z.literal("faqs"),
  }),
  feature.extend({
    type: z.literal("feature"),
  }),
  features.extend({
    type: z.literal("features"),
  }),
  jobs.extend({
    type: z.literal("jobs"),
  }),
  map.extend({
    type: z.literal("map"),
  }),
  persons.extend({
    type: z.literal("persons"),
  }),
  pricings.extend({
    type: z.literal("pricings"),
  }),
  products.extend({
    type: z.literal("products"),
  }),
  quote.extend({
    type: z.literal("quote"),
  }),
  reviews.extend({
    type: z.literal("reviews"),
  }),
  pages.extend({
    type: z.literal("pages"),
  }),
])
