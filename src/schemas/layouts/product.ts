import { imageSchema } from '@/schemas/components/image'
import { sectionSchema } from '@/schemas/components/section'
import { metaSchema } from '@/schemas/misc/meta'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'zod'
import { priceSchema } from '../components/price'

export const productSchema = z
  .object({
    type: z.literal('Product').default('Product'),
    title: z.string(),
    description: z.string(),
    sections: sectionSchema.array(),
    meta: metaSchema,
    list: z.string().array(),
    images: imageSchema.array(),
    price: priceSchema,
    collections: pathSchema('collections').array(),
    options: z
      .object({
        name: z.string(),
        values: z.string().array(),
      })
      .array(),
    variants: z
      .object({
        id: z.string(),
        title: z.string(),
        price: priceSchema,
        quantityAvailable: z.number(),
        availableForSale: z.boolean(),
        selectedOptions: z
          .object({
            name: z.string(),
            value: z.string(),
          })
          .partial()
          .strict()
          .array(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
