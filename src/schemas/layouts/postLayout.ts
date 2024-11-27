import { z } from 'astro:content'
import image from 'fulldev-ui/schemas/components/image'
import sections from 'fulldev-ui/schemas/components/sections'
import description from 'fulldev-ui/schemas/fields/description'
import title from 'fulldev-ui/schemas/fields/title'

export default z
  .object({
    _layout: z.literal('post'),
    title,
    description,
    image,
    sections,
  })
  .strict()
