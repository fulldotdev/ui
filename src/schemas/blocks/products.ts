import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import pathSchema from '../utils/pathSchema'

export const productsSchema = z
  .object({
    _block: z.string(),
    heading: z.string().optional(),
    button: buttonSchema.optional(),
    products: pathSchema('products').array().optional(),
  })
  .strict()

export type ProductsSchema = z.infer<typeof productsSchema>
