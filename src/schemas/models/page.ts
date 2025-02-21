import { imageSchema } from '@/schemas/fields/image'
import { metaSchema } from '@/schemas/fields/meta'
import { sectionSchema } from '@/schemas/fields/section'
import { z } from 'zod'

export const pageSchema = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
    meta: metaSchema.nullish(),
    sections: sectionSchema.array().nullish(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
