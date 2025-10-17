import { z } from "astro:schema"

import image from "@/schemas/ui/image"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
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
