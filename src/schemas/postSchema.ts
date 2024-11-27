import { z } from 'astro:content'
import image from 'fulldev-ui/schemas/components/image'
import sections from 'fulldev-ui/schemas/components/sections'
import description from 'fulldev-ui/schemas/fields/description'
import title from 'fulldev-ui/schemas/fields/title'

export const postSchema = z
  .object({
    title,
    description,
    image,
    sections,
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>
