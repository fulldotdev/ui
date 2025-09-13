import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { blockSchema } from "@/lib/structured-data"

export const productSchema = z
  .object({
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
  })
  .partial()
  .strict()

export type ProductProps = z.infer<typeof productSchema> & {
  children?: React.ReactNode
}
