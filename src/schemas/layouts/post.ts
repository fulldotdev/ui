import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const postSchema = z
  .object({
    _schema: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: blockSchema.array().optional(),
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>
