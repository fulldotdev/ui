import { imageSchema } from '@/schemas/components/image'
import { sectionSchema } from '@/schemas/components/section'
import { metaSchema } from '@/schemas/misc/meta'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'zod'
import { priceSchema } from '../components/price'

export const productSchema = z
  .object({
    id: z.string().nullish(),
    title: z.string().nullish(),
    description: z.string().nullish(),
    sections: sectionSchema.array().nullish(),
    meta: metaSchema.nullish(),
    list: z.string().array().nullish(),
    images: imageSchema.array().nullish(),
    price: priceSchema.nullish(),
    collections: pathSchema('collections').array().nullish(),
    options: z
      .object({
        name: z.string(),
        values: z.string().array(),
      })
      .array()
      .nullish(),
    variants: z
      .object({
        id: z.string().nullish(),
        title: z.string().nullish(),
        price: priceSchema.nullish(),
        quantityAvailable: z.number().nullish(),
        availableForSale: z.boolean().nullish(),
        selectedOptions: z
          .object({
            name: z.string(),
            value: z.string(),
          })
          .strict()
          .array()
          .nullish(),
      })
      .strict()
      .array()
      .nullish(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
