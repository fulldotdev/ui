import { linkSchema } from '@/schemas/components/link'
import { z } from 'astro:content'

export const menuSchema = z
  .object({
    text: z.string().nullish(),
    href: z.string().nullish(),
    links: linkSchema.array().nullish(),
  })
  .strict()

export type MenuSchema = z.infer<typeof menuSchema>
