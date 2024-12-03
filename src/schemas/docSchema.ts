import { z } from 'astro:content'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from './imageSchema'

export const docSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    head: headSchema.optional(),
  })
  .strict()

export type DocSchema = z.infer<typeof docSchema>
