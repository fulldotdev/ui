import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { headingSchema } from '../components/heading'
import pathSchema from '../utils/pathSchema'

export const categoriesSchema = z
  .object({
    heading: headingSchema.shape.text,
    button: buttonSchema.optional(),
    categories: pathSchema('categories').array().optional(),
  })
  .strict()

export type CategoriesSchema = z.infer<typeof categoriesSchema>
