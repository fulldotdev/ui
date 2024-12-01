import { z } from 'astro:content'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'

export const docSchema = z
  .object({
    title: z.string().optional(),
    head: headSchema.optional(),
  })
  .strict()
  .nullable()

export type DocSchema = z.infer<typeof docSchema>
