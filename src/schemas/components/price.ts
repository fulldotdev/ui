import { z } from 'astro:content'

export const priceSchema = z.preprocess(
  (data: unknown) => (typeof data === 'number' ? { amount: data } : data),
  z
    .object({
      amount: z.number().optional(),
    })
    .strict()
)

export type PriceSchema = z.infer<typeof priceSchema>
