import { buttonSchema } from '@/schemas/components/button'
import { z } from 'astro:content'
import { priceSchema } from '../components/price'

export const pricingsSchema = z
  .object({
    writeup: z.string().nullish(),
    pricings: z
      .object({
        title: z.string().nullish(),
        description: z.string().nullish(),
        price: priceSchema.nullish(),
        price_unit: z.string().nullish(),
        list: z.string().array().nullish(),
        button: buttonSchema.nullish(),
      })
      .strict()
      .array()
      .nullish(),
  })
  .strict()

export type PricingsSchema = z.infer<typeof pricingsSchema>
