import { z } from 'astro:content'
import { categorySingleSchema } from 'fulldev-ui/schemas/blocks/categorySingle'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta'
import { sectionSchema } from 'fulldev-ui/schemas/fields/section'

export const categorySchema = categorySingleSchema.extend({
  meta: metaSchema.optional(),
  sections: sectionSchema.array().optional(),
})

export type CategorySchema = z.infer<typeof categorySchema>
