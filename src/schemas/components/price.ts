import { z } from "zod"

export const priceSchema = z
  .object({
    amount: z.number(),
    compare: z.number(),
    unit: z.string(),
    currency: z.string(),
  })
  .partial()
  .strict()

export type PriceSchema = z.infer<typeof priceSchema>
