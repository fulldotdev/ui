import { z } from "astro:schema"

import { description } from "@/schemas/fields/description"
import { image } from "@/schemas/fields/image"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const product = z
  .object({
    variant,
    title,
    description,
    images: image.array(),
    category: z.string(),
    offers: z
      .object({
        price: z.union([z.number(), z.string()]),
        priceCurrency: z.string(),
      })
      .partial()
      .strict(),
    variants: z.any(),
  })
  .partial()
  .strict()
