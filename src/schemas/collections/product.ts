import { z } from 'astro:content'
import { productSingleSchema } from 'fulldev-ui/schemas/blocks/productSingle'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta'
import { sectionSchema } from 'fulldev-ui/schemas/fields/section'

export const productSchema = productSingleSchema.extend({
  meta: metaSchema.optional(),
  sections: sectionSchema.array().optional(),
})

export type ProductSchema = z.infer<typeof productSchema>
