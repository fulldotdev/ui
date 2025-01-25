import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/fields/block.ts'
import { buttonSchema } from 'fulldev-ui/schemas/fields/button.ts'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'

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
