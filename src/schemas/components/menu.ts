import { z } from 'astro:content'
import { linkSchema } from 'fulldev-ui/schemas/components/link.ts'

export const menuSchema = z
  .object({
    heading: z.string().optional(),
    href: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()

export type MenuSchema = z.infer<typeof menuSchema>
