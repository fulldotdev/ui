import { buttonSchema } from "@/schemas/components/button"
import { z } from "zod"

import { priceSchema } from "../components/price"

export const pricingsSchema = z
  .object({
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
