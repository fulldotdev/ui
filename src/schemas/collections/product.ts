import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'
import { pathSchema } from 'fulldev-ui/schemas/fields/path.ts'

export const productSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    images: imageSchema.array().optional(),
    list: z.string().array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: pathSchema('categories').array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
