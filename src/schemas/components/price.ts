import { z } from 'astro:content'

export const priceSchema = z
  .object({
    amount: z.number().optional(),
  })
  .strict()

export type PriceSchema = z.infer<typeof priceSchema>
