import { postSingleSchema } from '@/schemas/blocks/postSingle'
import { metaSchema } from '@/schemas/fields/meta'
import { sectionSchema } from '@/schemas/fields/section'
import { z } from 'astro:content'

export const postSchema = postSingleSchema.extend({
  meta: metaSchema.optional(),
  sections: sectionSchema.array().optional(),
})

export type PostSchema = z.infer<typeof postSchema>
