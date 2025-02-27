import { imageSchema } from '@/schemas/components/image'
import { sectionSchema } from '@/schemas/components/section'
import { metaSchema } from '@/schemas/misc/meta'
import { z } from 'astro:content'

export const projectSchema = z
  .object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
    sections: sectionSchema.array().nullish(),
    meta: metaSchema.nullish(),
  })
  .strict()

export type ProjectSchema = z.infer<typeof projectSchema>
