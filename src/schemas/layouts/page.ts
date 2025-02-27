import { imageSchema } from '@/schemas/components/image'
import { metaSchema } from '@/schemas/misc/meta'
import { sectionSchema } from '@/schemas/components/section'
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
