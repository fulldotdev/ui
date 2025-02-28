import { linkSchema } from '@/schemas/components/link'
import { z } from 'astro:content'

export const menuSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    links: linkSchema.array(),
  })
  .partial()
  .strict()

export type MenuSchema = z.infer<typeof menuSchema>
