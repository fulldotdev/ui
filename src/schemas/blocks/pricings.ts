import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

import { priceSchema } from "../components/price"

export const pricingsSchema = z
  .object({
    variant: z.number().optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    content: z.string(),
    pricings: z
      .object({
        title: z.string(),
        description: z.string(),
        price: priceSchema,
        price_unit: z.string(),
        list: z.string().array(),
        button: buttonSchema,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
