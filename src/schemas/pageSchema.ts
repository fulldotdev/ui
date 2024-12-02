import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/components/block.ts'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const pageSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    href: z.string().optional(),
    head: headSchema.optional(),
    blocks: blockSchema.array().optional(),
  })
  .strict()
  .nullable()

export type PageSchema = z.infer<typeof pageSchema>
