import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { sectionSchema } from "@/schemas/components/section"
import { seoSchema } from "@/schemas/misc/seo"
import { reference } from "astro:content"
import { z } from "zod"

export const productSchema = z
  .object({
    type: z.literal("product").default("product"),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    images: imageSchema.array(),
    price: priceSchema,
    collections: reference("collections").array(),
    options: z
      .object({
        name: z.string(),
        values: z.string().array(),
      })
      .array(),
    sections: sectionSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()
