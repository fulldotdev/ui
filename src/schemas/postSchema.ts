import { z } from 'astro:content'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const postSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    head: headSchema.optional(),
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>
