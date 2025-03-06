import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { sectionSchema } from "@/schemas/components/section"
import { pathSchema } from "@/schemas/misc/path"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const productSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    price: priceSchema.optional(),
    collections: pathSchema.array().optional(),
    options: z
      .object({
        name: z.string(),
        values: z.string().array(),
      })
      .array()
      .optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
  })
  .strict()
