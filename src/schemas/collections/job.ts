import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'

export const jobSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type JobSchema = z.infer<typeof jobSchema>
