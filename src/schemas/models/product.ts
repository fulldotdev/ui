import { buttonSchema } from '@/schemas/fields/button'
import { imageSchema } from '@/schemas/fields/image'
import { pathSchema } from '@/schemas/fields/path'
import { z } from 'astro:content'

export const productSchema = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    list: z.string().array().nullish(),
    images: imageSchema.array().nullish(),
    price: z.number().nullish(),
    compare_price: z.number().nullish(),
    collections: pathSchema('collections').array().nullish(),
    button: buttonSchema.nullish(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
