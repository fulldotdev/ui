import { z } from 'astro:content'
import categories from 'fulldev-ui/schemas/fields/categories'
import description from 'fulldev-ui/schemas/fields/description'
import image from 'fulldev-ui/schemas/fields/image'
import title from 'fulldev-ui/schemas/fields/title'

export default z
  .object({
    _layout: z.literal('category'),
    title,
    description,
    image,
    categories,
  })
  .strict()
