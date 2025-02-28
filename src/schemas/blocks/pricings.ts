import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'
import { priceSchema } from '../components/price'

export const pricingsSchema = z
  .object({
    type: z.literal('Pricings').default('Pricings'),
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
