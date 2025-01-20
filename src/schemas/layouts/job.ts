import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const jobSchema = z
  .object({
    _schema: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    sections: blockSchema.array().optional(),
  })
  .strict()

export type JobSchema = z.infer<typeof jobSchema>
