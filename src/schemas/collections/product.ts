import { productSingleSchema } from '@/schemas/blocks/productSingle'
import { metaSchema } from '@/schemas/fields/meta'
import { sectionSchema } from '@/schemas/fields/section'
import { z } from 'astro:content'

export const productSchema = productSingleSchema.extend({
  meta: metaSchema.optional(),
  sections: sectionSchema.array().optional(),
})

export type ProductSchema = z.infer<typeof productSchema>
