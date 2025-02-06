import { blockSchema } from '@/schemas/fields/block.ts'
import { imageSchema } from '@/schemas/fields/image.ts'
import { metaSchema } from '@/schemas/fields/meta.ts'
import { z } from 'astro:content'

export const pageSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
