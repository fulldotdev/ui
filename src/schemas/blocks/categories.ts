import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import pathSchema from '../utils/pathSchema'

export const categoriesSchema = z
  .object({
    _block: z.string(),
    heading: z.string().optional(),
    button: buttonSchema.optional(),
    categories: pathSchema('categories').array().optional(),
  })
  .strict()

export type CategoriesSchema = z.infer<typeof categoriesSchema>
