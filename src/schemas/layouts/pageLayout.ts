import { z } from 'astro:content'
import sections from 'fulldev-ui/schemas/components/sections'
import title from 'fulldev-ui/schemas/fields/title'

export default z
  .object({
    _layout: z.literal('page'),
    title,
    sections,
  })
  .strict()
