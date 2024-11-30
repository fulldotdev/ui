import { z } from 'astro:content'
import image from 'fulldev-ui/schemas/components/image'
import description from 'fulldev-ui/schemas/fields/description'
import title from 'fulldev-ui/schemas/fields/title'

export default z
  .object({
    title: title.optional(),
    description,
    image,
  })
  .optional()
