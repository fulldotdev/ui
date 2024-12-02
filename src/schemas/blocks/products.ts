import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { headingSchema } from 'fulldev-ui/schemas/components/heading'
import pathSchema from '../utils/pathSchema'

export const productsSchema = z
  .object({
    heading: headingSchema.shape.text,
    button: buttonSchema.optional(),
    products: pathSchema('products').array().optional(),
  })
  .strict()

export type ProductsSchema = z.infer<typeof productsSchema>
