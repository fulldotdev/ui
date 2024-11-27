import { z } from 'astro:content'
import title from 'fulldev-ui/schemas/fields/title'

export const docSchema = z
  .object({
    title,
  })
  .strict()

export type DocSchema = z.infer<typeof docSchema>
