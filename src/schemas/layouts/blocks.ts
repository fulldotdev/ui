import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const pageSchema = z
  .object({
    _schema: z.string().optional(),
    sections: blockSchema.array().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: imageSchema.optional(),
    }),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
