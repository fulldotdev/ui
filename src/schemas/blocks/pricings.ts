import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

import { priceSchema } from "../components/price"

export const pricingsSchema = z
  .object({
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    pricings: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        price: priceSchema.optional(),
        price_unit: z.string().optional(),
        list: z.string().array().optional(),
        button: buttonSchema.optional(),
      })
      .strict()
      .array()
      .optional(),
  })
  .strict()
