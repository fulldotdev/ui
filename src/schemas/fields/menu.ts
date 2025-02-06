import { linkSchema } from '@/schemas/fields/link.ts'
import { z } from 'astro:content'

export const menuSchema = z
  .object({
    heading: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()
