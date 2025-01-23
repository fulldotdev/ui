import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { seoSchema } from 'fulldev-ui/schemas/seo.ts'

export const docSchema = z
  .object({
    _schema: z.string().optional(),
    block: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: blockSchema.array().optional(),
    code: z.string().optional(),
    seo: seoSchema.optional(),
  })
  .strict()

export type DocSchema = z.infer<typeof docSchema>
