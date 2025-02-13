import { linkSchema } from '@/schemas/fields/link'
import { z } from 'astro:content'

export const menuSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()
