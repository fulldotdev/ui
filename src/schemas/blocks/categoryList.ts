import { buttonSchema } from '@/schemas/fields/button'
import { z } from 'astro:content'
import { categorySingleSchema } from '../blocks/categorySingle'

export const categoryListSchema = z
  .object({
    writeup: z.string().optional(),
    button: buttonSchema.optional(),
    categories: categorySingleSchema
      .extend({
        href: z.string(),
      })
      .array()
      .optional(),
  })
  .strict()

export type CategoryListSchema = z.infer<typeof categoryListSchema>
