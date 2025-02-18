import { buttonSchema } from '@/schemas/fields/button'
import { reference, z } from 'astro:content'

export const productSelectionSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    products: reference('products').array().nullish(),
  })
  .strict()

export type ProductSelectionSchema = z.infer<typeof productSelectionSchema>
