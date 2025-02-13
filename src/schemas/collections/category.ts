import { categorySingleSchema } from '@/schemas/blocks/categorySingle'
import { metaSchema } from '@/schemas/fields/meta'
import { sectionSchema } from '@/schemas/fields/section'
import { z } from 'astro:content'

export const categorySchema = categorySingleSchema.extend({
  meta: metaSchema.optional(),
  sections: sectionSchema.array().optional(),
})

export type CategorySchema = z.infer<typeof categorySchema>
