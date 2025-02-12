import { z } from 'astro:content'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta'
import { sectionSchema } from 'fulldev-ui/schemas/fields/section'

export const pageSchema = z
  .object({
    title: z.string().optional(),
    meta: metaSchema.optional(),
    sections: sectionSchema.array().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
