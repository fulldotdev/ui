import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/fields/block.ts'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'

export const docSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type DocSchema = z.infer<typeof docSchema>
