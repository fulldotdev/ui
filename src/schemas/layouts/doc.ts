import { blockSchema } from '@/schemas/fields/block.ts'
import { metaSchema } from '@/schemas/fields/meta.ts'
import { z } from 'astro:content'

export const docSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type DocSchema = z.infer<typeof docSchema>
