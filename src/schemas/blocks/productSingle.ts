import { imageSchema } from '@/schemas/fields/image.ts'
import { reference, z } from 'astro:content'

export const productSingleSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    images: imageSchema.array().optional(),
    price: z.number().optional(),
    category: reference('categories').optional(),
  })
  .strict()

export type ProductSingleSchema = z.infer<typeof productSingleSchema>
