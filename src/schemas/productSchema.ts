import { z } from 'astro:content'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'
import pathSchema from 'fulldev-ui/schemas/utils/pathSchema.ts'
import { priceSchema } from './components/price'

export const productSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    order: z.number().optional(),
    price: priceSchema.shape.amount,
    categories: pathSchema('categories').array().optional(),
    images: imageSchema.array().optional(),
    head: headSchema.optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    soldout: z.boolean().optional(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
