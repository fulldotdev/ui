import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/components/block.ts'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const pageSchema = z
  .object({
    href: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    head: headSchema.optional(),
    blocks: blockSchema.array().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
