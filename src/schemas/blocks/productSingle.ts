import { reference, z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { buttonSchema } from '../fields/button'

export const productSingleSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    images: imageSchema.array().optional(),
    price: z.number().optional(),
    category: reference('categories').optional(),
    button: buttonSchema.optional(),
  })
  .strict()

export type ProductSingleSchema = z.infer<typeof productSingleSchema>
