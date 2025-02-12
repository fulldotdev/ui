import { z } from 'astro:content'
import { postSingleSchema } from 'fulldev-ui/schemas/blocks/postSingle'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta'
import { sectionSchema } from 'fulldev-ui/schemas/fields/section'

export const postSchema = postSingleSchema.extend({
  meta: metaSchema.optional(),
  sections: sectionSchema.array().optional(),
})

export type PostSchema = z.infer<typeof postSchema>
