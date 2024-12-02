import { z } from 'astro:content'
import { linkSchema } from 'fulldev-ui/schemas/components/link.ts'
import { headingSchema } from './heading'

export const menuSchema = z
  .object({
    heading: headingSchema.shape.text,
    href: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict()

export type MenuSchema = z.infer<typeof menuSchema>
