import { z } from 'astro:content'

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
