import { z } from "zod"

export const priceSchema = z
  .object({
    amount: z.number().optional(),
    compare: z.number().optional(),
    unit: z.string().optional(),
    currency: z.string().optional(),
  })
  .strict()
export type PriceSchema = z.infer<typeof priceSchema>
