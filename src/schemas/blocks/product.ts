import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import section from "@/schemas/elements/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
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
