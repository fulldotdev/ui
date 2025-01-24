import { z } from 'astro:content'
import { metaSchema } from 'fulldev-ui/schemas/fields/meta.ts'

export const docSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    meta: metaSchema.optional(),
  })
  .strict()

export type DocSchema = z.infer<typeof docSchema>
