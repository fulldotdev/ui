import { blockSchema } from '@/schemas/fields/block.ts'
import { buttonSchema } from '@/schemas/fields/button.ts'
import { imageSchema } from '@/schemas/fields/image.ts'
import { metaSchema } from '@/schemas/fields/meta.ts'
import { z } from 'astro:content'

export const jobSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    list: z.string().array().optional(),
    buttons: buttonSchema.array().optional(),
    blocks: blockSchema.array().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type JobSchema = z.infer<typeof jobSchema>
