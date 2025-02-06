import { blockSchema } from '@/schemas/fields/block.ts'
import { imageSchema } from '@/schemas/fields/image.ts'
import { metaSchema } from '@/schemas/fields/meta.ts'
import { reference, z } from 'astro:content'

export const categorySchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    categories: reference('categories').array().optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type CategorySchema = z.infer<typeof categorySchema>
