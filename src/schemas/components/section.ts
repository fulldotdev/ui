import { articlesSchema } from "@/schemas/blocks/articles"
import { collectionsSchema } from "@/schemas/blocks/collections"
import { contactSchema } from "@/schemas/blocks/contact"
import { contentSchema } from "@/schemas/blocks/content"
import { ctaSchema } from "@/schemas/blocks/cta"
import { faqsSchema } from "@/schemas/blocks/faqs"
import { featuresSchema } from "@/schemas/blocks/features"
import { heroSchema } from "@/schemas/blocks/hero"
import { introSchema } from "@/schemas/blocks/intro"
import { pagesSchema } from "@/schemas/blocks/pages"
import { personsSchema } from "@/schemas/blocks/persons"
import { pricingsSchema } from "@/schemas/blocks/pricings"
import { productsSchema } from "@/schemas/blocks/products"
import { projectsSchema } from "@/schemas/blocks/projects"
import { reviewsSchema } from "@/schemas/blocks/reviews"
import { z } from "astro:content"

import { pathSchema } from "../misc/path"
import { buttonSchema } from "./button"
import { channelsSchema } from "./channels"
import { formSchema } from "./form"
import { imageSchema } from "./image"
import { priceSchema } from "./price"

const itemSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    button: buttonSchema,
    list: z.string().array(),
    price: priceSchema,
  })
  .partial()

export const sectionSchema = z.object({
  type: z.enum([
    "articles",
    "collections",
    "contact",
    "content",
    "cta",
    "faqs",
    "features",
    "hero",
    "intro",
    "pages",
    "persons",
    "pricings",
    "products",
    "projects",
    "locations",
    "reviews",
  ]),
  variant: z.number().default(1),
  align: z.enum(["start", "center", "end"]).optional(),
  size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
  content: z.string().optional(),
  buttons: buttonSchema.array().optional(),
  channels: channelsSchema.optional(),
  socials: z.string().array().optional(),
  form: formSchema.optional(),
  faqs: itemSchema.array().optional(),
  image: imageSchema.optional(),
  features: itemSchema.array().optional(),
  pages: pathSchema("pages").array().optional(),
  persons: pathSchema("persons").array().optional(),
  projects: pathSchema("projects").array().optional(),
  products: pathSchema("products").array().optional(),
  reviews: pathSchema("reviews").array().optional(),
  articles: pathSchema("articles").array().optional(),
  collections: pathSchema("collections").array().optional(),
})

export type SectionSchema = z.infer<typeof sectionSchema>
