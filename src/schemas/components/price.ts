import { z } from 'astro:content'

export const priceSchema = z
  .object({
    amount: z.number().nullish(),
    compare: z.number().nullish(),
    unit: z.string().nullish(),
    currency: z.string().nullish(),
  })
  .strict()

export type PriceSchema = z.infer<typeof priceSchema>
