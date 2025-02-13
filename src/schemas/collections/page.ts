import { metaSchema } from '@/schemas/fields/meta'
import { sectionSchema } from '@/schemas/fields/section'
import { z } from 'astro:content'

export const pageSchema = z
  .object({
    title: z.string().optional(),
    meta: metaSchema.optional(),
    sections: sectionSchema.array().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
