import { reference, z } from "astro:content"

import { blockSchema } from "@/schemas/block"
import { pathSchema } from "@/schemas/fields/path"

export const sectionSchema = blockSchema
  .extend({
    type: z.enum([
      "collections",
      "products",
      "contact",
      "content",
      "media",
      "cta",
      "faqs",
      "features",
      "hero",
      "events",
      "locations",
      "pricings",
      "pages",
      "persons",
      "posts",
      "pricing",
      "products",
      "reviews",
      "blogs",
      "posts",
    ]),
    variant: z.number(),
    pages: pathSchema.pipe(reference("pages")).array(),
  })
  .partial()
