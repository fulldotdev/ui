import { reference, z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/fields/block.ts'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'

export const productSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    images: imageSchema.array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: reference('categories').array().optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
