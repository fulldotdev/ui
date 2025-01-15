import { z } from 'astro:content'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'

export const menuSchema = z
  .object({
    heading: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()
