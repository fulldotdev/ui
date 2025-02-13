import { z } from 'astro:content'
import { productSingleSchema } from './productSingle'

export const productGroupSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    products: productSingleSchema
      .extend({
        href: z.string(),
      })
      .array()
      .optional(),
  })
  .strict()

export type ProductGroupSchema = z.infer<typeof productGroupSchema>
