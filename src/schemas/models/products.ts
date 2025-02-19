import { buttonSchema } from '@/schemas/fields/button'
import { reference, z } from 'astro:content'

export const productsSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    products: reference('products').array().nullish(),
  })
  .strict()

export type ProductsSchema = z.infer<typeof productsSchema>
