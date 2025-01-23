import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'
import { seoSchema } from 'fulldev-ui/schemas/seo.ts'

export const productSchema = z
  .object({
    _schema: z.string().optional(),
    block: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    images: imageSchema.array().optional(),
    list: z.string().array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: pathSchema('categories').array().optional(),
    sections: blockSchema.array().optional(),
    code: z.string().optional(),
    seo: seoSchema.optional(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
