import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"

export const productSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    images: imageSchema.array(),
    category: z.string(),
    offers: z
      .object({
        price: z.union([z.number(), z.string()]),
        priceCurrency: z.string(),
      })
      .partial()
      .strict(),
    variants: z.any(),
    collections: pathSchema("collections").array(),
  })
  .partial()
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
