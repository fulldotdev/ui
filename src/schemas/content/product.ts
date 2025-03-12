import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { pathSchema } from "@/schemas/misc/path"
import { sectionSchema } from "@/schemas/misc/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const productSchema = z
  .object({
    type: z.literal("product").default("product"),
    variant: z.number().default(1),
    title: z.string(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    price: priceSchema.optional(),
    collections: pathSchema("collections").array().optional(),
    options: z
      .object({
        name: z.string(),
        values: z.string().array(),
      })
      .array()
      .optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
    id: z.string().optional(),
    variants: z.any(),
  })
  .strict()
