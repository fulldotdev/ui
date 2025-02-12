import { buttonSchema } from '@/schemas/fields/button'
import { z } from 'astro:content'
import { productSingleSchema } from './productSingle'

export const productListSchema = z
  .object({
    writeup: z.string().optional(),
    button: buttonSchema.optional(),
    products: productSingleSchema
      .extend({
        href: z.string(),
      })
      .array()
      .optional(),
  })
  .strict()

export type ProductListSchema = z.infer<typeof productListSchema>
