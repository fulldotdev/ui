import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/fields/block.ts'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'

export const categorySchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type CategorySchema = z.infer<typeof categorySchema>
