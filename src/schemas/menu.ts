import { z } from 'astro:content'
import { headingSchema } from 'fulldev-ui/schemas/heading.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'

export const menuSchema = z
  .object({
    heading: headingSchema.shape.text,
    href: z.string().optional(),
    links: linkSchema.array().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
  })
  .strict()

export type MenuSchema = z.infer<typeof menuSchema>
