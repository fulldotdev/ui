import { buttonSchema } from '@/schemas/fields/button'
import { z } from 'astro:content'

export const pricingsSchema = z
  .object({
    writeup: z.string().nullish(),
    pricings: z
      .object({
        title: z.string().nullish(),
        description: z.string().nullish(),
        price: z.number().nullish(),
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
