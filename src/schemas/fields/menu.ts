import { z } from 'astro:content'
import { linkSchema } from 'fulldev-ui/schemas/fields/link.ts'

export const menuSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()
