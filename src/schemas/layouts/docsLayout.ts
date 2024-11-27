import { z } from 'astro:content'
import title from 'fulldev-ui/schemas/fields/title'

export default z
  .object({
    _layout: z.literal('docs'),
    title,
  })
  .strict()
